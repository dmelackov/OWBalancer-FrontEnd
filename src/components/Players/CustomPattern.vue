<template>
    <div :class="{
        player_container: true,
        my_custom_warn: isMyCustom,
    }" @click="addToLobby">
        <div class="player_inner_container">
            <p class="player_username">{{ custom.Player.Username }}</p>
            <div class="sr">
                <div class="sr_icon">
                    <div class="roleSr">
                        <img src="/img/role_icons/tank.svg" alt="" width="12" :class="{
                            innactive: !roles.T,
                            role_icon: true,
                        }" />
                        <p>{{ SR.T }}</p>
                    </div>
                    <div class="roleSr">
                        <img src="/img/role_icons/dps.svg" alt="" width="12" :class="{
                            innactive: !roles.D,
                            role_icon: true,
                        }" />
                        <p>{{ SR.D }}</p>
                    </div>
                    <div class="roleSr">
                        <img src="/img/role_icons/support.svg" alt="" width="12" :class="{
                            innactive: !roles.H,
                            role_icon: true,
                        }" />
                        <p>{{ SR.H }}</p>
                    </div>
                </div>
            </div>
            <p class="author-left">by {{ custom.Creator.Profile.Username }}</p>
        </div>
    </div>
</template>

<script>
import api from "@/api"
import useLoginState from "@/store/LoginState"

export default {
    setup() {
        const { UserInfo } = useLoginState()
        return {
            UserInfo
        }
    },
    props: ["custom"],
    data() {
        return {
            roles: {},
            SR: {},
            isMyCustom: false,
        };
    },
    methods: {
        async addToLobby() {
            this.emitter.emit("closeCustomMenu");
            try {
                await api.lobby_api.addToLobby(this.custom.ID)
            } catch (error) {
                this.$notify({ title: error.message, type: "error" });
                return;
            }
            this.emitter.emit("updateLobby");
        },
        getRolesInfo() {
            for (const key in this.custom.Roles) {
                const element = this.custom.Roles[key];
                this.roles[element.role] = element.active;
                this.SR[element.role] = element.sr;
            }
            return false;
        },
    },
    created() {
        this.getRolesInfo();
        if (this.custom.Creator.Profile.ID == this.UserInfo.profile.ID) this.isMyCustom = true;
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/playerContainer.css";

.my_custom_warn {
    box-shadow: 0 1px 0 #1abe5fa8;
}

.sr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.sr_icon {
    margin-left: 2px;
    padding-top: 7px;
}

.role_icon {
    display: block;
    margin-bottom: 1px;
    cursor: pointer;
}

.sr_numbers {
    display: inline-block;
    line-height: 1px;
    font-size: 12px;
}

.roleSr>p {
    font-size: 14px;
}

.roleSr {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.author-left {
    position: absolute;
    color: #3b4b5f;
    bottom: 4px;
    left: 12px;
    width: max-content;
    margin: 0;
    font-size: 12px;
}

.innactive {
    filter: brightness(0.3);
}
</style>
