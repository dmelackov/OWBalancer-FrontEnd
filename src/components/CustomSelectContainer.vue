<template>
    <div id="customSelect" :class="['customSelect']" :style="styleObj">
        <div class="custom_select">
            <div class="customs" v-if="customList.length > 0">
                <div id="CustomTableSelect">
                    <template v-for="custom in customList">
                        <CustomPattern
                            :custom="custom"
                            :key="custom.CustomID"
                        />
                    </template>
                </div>
            </div>
            <button
                :class="{
                    create_container: true,
                    opacity_disable: !isPerm('create_custom'),
                }"
                @click="createCustom"
            >
                + Create custom
            </button>
        </div>
    </div>
</template>

<script>
import CustomPattern from "./CustomPattern.vue";
import axios from "axios"
export default {
    components: {
        CustomPattern,
    },
    data() {
        return {
            customList: [],
            customMenuVisible: false,
            target: null,
        };
    },
    methods: {
        async createCustom() {
            await axios.post("/api/customs/createCustom", { "id": this.target.player.id });
                this.close();
                this.eventBus.$emit("updateLobby")
        },
        async open(target) {
            this.target = target;
            const res = await axios.get(
                "/api/customs/getCustoms/" + target.player.id
            );
            const resData = res.data;
            console.log(resData)
            if (resData.type == "custom") {
                this.close();
                await axios.post("/api/lobby/addToLobby", {
                    id: resData.data.CustomID,
                });
                this.eventBus.$emit("updateLobby")
                return;
            }
            if (resData.data) {
                this.customList = resData.data;
            } else {
                this.customList = [];
            }
            this.customMenuVisible = true;
        },

        close() {
            if (this.target) this.target.active = false;
            this.customMenuVisible = false;
        },
    },
    computed: {
        styleObj: function () {
            if (!this.customMenuVisible || this.target == null)
                return { display: "none" };
            let lineRect = this.target.$el.getBoundingClientRect();
            let totalHeight = lineRect.y;
            if (lineRect.y + 200 > document.documentElement.clientHeight - 20) {
                totalHeight -=
                    lineRect.y +
                    200 -
                    document.documentElement.clientHeight +
                    20;
            }
            return {
                top: totalHeight + "px",
                left: lineRect.x + lineRect.width + 10 + "px",
                display: "block",
            };
        },
    },
    created() {
        this.eventBus.$on("openCustomMenu", (e) => this.open(e));
        this.eventBus.$on("closeCustomMenu", () => this.close());
    },
};
</script>

<style scoped>
@import "../assets/css/global.css";

.customSelect {
    position: fixed;
    background-color: #171e27;
    border-radius: 6px;
    border: solid 1px #444444;
    width: 15%;
    height: max-content;
    padding: 16px 8px;
    padding-bottom: 2px;
}

.customs {
    overflow-y: auto;
    height: 150px;
    margin-bottom: 10px;
}
.create_container {
    margin-bottom: 10px;
}
</style>