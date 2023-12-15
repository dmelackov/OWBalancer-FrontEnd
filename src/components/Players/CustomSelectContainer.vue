<template>
    <div ref="container" id="customSelect" :class="['customSelect']" :style="{
        display: this.customMenuVisible ? 'block' : 'none',
        left: left + 'px',
        top: top + 'px',
    }">
        <div class="custom_select">
            <div class="customs" v-if="customList.length > 0">
                <div id="CustomTableSelect">
                    <template v-for="custom in customList" :key="custom.ID">
                        <CustomPattern :custom="custom" />
                    </template>
                </div>
            </div>
            <button v-if="isPerm('create_custom') && !hasMyCustom" :class="{
                create_container: true,
            }" @click="createCustom">
                + Create custom
            </button>
        </div>
    </div>
</template>

<script>
import CustomPattern from "@/components/Players/CustomPattern.vue";
import api from "@/api"
import useLoginState from "@/store/LoginState";
import { ref } from "vue"

export default {
    setup() {
        const { Settings, UserInfo } = useLoginState();
        const container = ref(null)
        return {
            Settings,
            UserInfo,
            container
        };
    },
    components: {
        CustomPattern,
    },
    data() {
        return {
            customList: [],
            customMenuVisible: false,
            hasMyCustom: false,
            target: null,
            left: 0,
            top: 0,
        };
    },
    methods: {
        async createCustom() {
            let custom;
            try {
                custom = await api.customs_api.createCustom(this.target.player.ID)
            } catch (error) {
                this.$notify({ title: error.message, type: "error" });
                return;
            }
            try {
                await api.lobby_api.addToLobby(custom.ID)
            } catch (error) {
                this.$notify({ title: error.message, type: "error" });
                return;
            }
            this.close();
            this.emitter.emit("updateLobby");
        },
        async open(target) {
            this.hasMyCustom = false;
            this.target = target;
            const resData = await api.customs_api.getCustoms(target.player.ID);
            let myCustom = null;
            for (const custom of resData) {
                if (custom.Creator.Profile.ID == this.UserInfo.ID) {
                    myCustom = custom;
                    this.hasMyCustom = true;
                    break;
                }
            }
            if (this.Settings.AutoCustom && myCustom) {
                api.lobby_api.addToLobby(myCustom.ID)
                .then(() => {this.emitter.emit("updateLobby")})
                .catch((res) => {
                    let errorMessage = res.message;
                    if (res.message == "lobby_is_overflowing") errorMessage = "Lobby is overflowing"
                    this.$notify({ title: errorMessage, type: "error" });
                })
                this.close()
                return;
            }
            this.customList = resData;
            this.customMenuVisible = true;
        },

        close() {
            if (this.target) this.target.active = false;
            this.customMenuVisible = false;
        },

        resize() {
            let lineRect = this.target.$el.getBoundingClientRect();
            let totalHeight = lineRect.y;
            let thisElementRect = this.container.getBoundingClientRect();
            if (
                lineRect.y + 304 >
                document.documentElement.clientHeight - 20
            ) {
                totalHeight -=
                    lineRect.y +
                    304 -
                    document.documentElement.clientHeight +
                    20;
            }
            this.left = lineRect.x + lineRect.width + 20;
            this.top = totalHeight;
        },
    },
    watch: {
        customMenuVisible(newVisible, oldVisible) {
            if (!newVisible) return;
            this.resize();
        },
    },
    created() {
        this.emitter.on("openCustomMenu", this.open);
        this.emitter.on("closeCustomMenu", this.close);
    },

    unmounted() {
        this.emitter.off("openCustomMenu", this.open);
        this.emitter.off("closeCustomMenu", this.close);
    },
};
</script>

<style scoped>
@import "/src/assets/css/global.css";

.customSelect {
    position: fixed;
    background-color: #151a20;
    border-radius: 6px;
    width: 15%;
    height: max-content;
    padding: 16px 8px;
    padding-bottom: 2px;
    box-shadow: -6px 0 0 0 #283649;
    z-index: 999;
}

.customs {
    overflow-y: auto;
    height: 250px;
    margin-bottom: 10px;
}

.create_container {
    margin-bottom: 10px;
}
</style>
