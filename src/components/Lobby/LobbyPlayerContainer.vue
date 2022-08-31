<template>
    <div
        :class="{
            error: custom.warn,
            lobby_container: true,
            player_container: true,
        }"
    >
        <div
            class="player_inner_container"
            @click="open($event)"
            @mouseenter="active = true"
            @mouseleave="active = false"
        >
            <p class="player_username">{{ custom.Player.Username }}</p>
            <div class="sr_lobby" v-show="!active">
                <div class="sr_lobby_icon" v-show="!custom.isFlex">
                    <img
                        :src="getRoleIco(role.role)"
                        alt=""
                        width="15"
                        :class="{ role_icon: true, innactive: !role.active }"
                        v-for="(role, index) in custom.Roles"
                        :key="index"
                    />
                </div>
                <img
                    src="/img/flex.svg"
                    alt=""
                    v-if="custom.isFlex"
                    width="16"
                />
            </div>
            <p class="author-right">{{ custom.Creator.Profile.username }}</p>
            <p class="X" v-show="active" @click="deleteFromLobby">✖</p>
        </div>
        <div class="lobby_menu" :style="styleObj">
            <hr />
            <div class="sr lobby_sr">
                <template v-for="(role, index) in custom.Roles" :key="role">
                    <RoleComponent :role="role" :custom="custom" />
                    <p
                        :class="{
                            switch_button: true
                        }"
                        v-if="index != 2 && !custom.isFlex && isPerm('change_player_roles')"
                        @click="swapRoles(index)"
                    >
                        ⇆
                    </p>
                </template>
                <img
                    src="/img/flex.svg"
                    alt=""
                    width="30"
                    :class="{
                        role_icon: true,
                        innactive: !custom.isFlex,
                    }"
                    @click="toggleFlex"
                />
            </div>
        </div>
    </div>
</template>

<script>
import api from "/src/api"
import RoleComponent from "./RoleComponent.vue";

export default {
    props: ["custom"],
    components: {
        RoleComponent,
    },
    data() {
        return {
            menuOpened: false,
            active: false,
        };
    },
    created(){
        this.emitter.on("lobbyCustomMenuOpen", this.lobbyCustomMenuOpen)
    },
    unmounted(){
        this.emitter.off("lobbyCustomMenuOpen", this.lobbyCustomMenuOpen)
    },
    
    methods: {
        getRoleIco(role) {
            let iconImages = {
                T: "img/role_icons/tank.svg",
                D: "img/role_icons/dps.svg",
                H: "img/role_icons/support.svg",
                0: "img/role_icons/tank.svg",
                1: "img/role_icons/dps.svg",
                2: "img/role_icons/support.svg",
            };
            return iconImages[role];
        },
        lobbyCustomMenuOpen(e) {
            if(e != this) this.close()
        },
        open(event) {
            if (event.target.classList.contains("X")) return;
            if (this.menuOpened) {this.close(); return}
            this.menuOpened = true;
            this.emitter.emit("lobbyCustomMenuOpen", this)
        },
        close() {
            this.menuOpened = false;
        },
        async deleteFromLobby() {
            await api.lobby_api.deleteFromLobby(this.custom.ID)
            this.emitter.emit("updateLobby");
        },
        async swapRoles(index) {
            if(this.custom.isFlex) return;
            let newRoleStr = "";
            let roleIndex;
            for (roleIndex in this.custom.Roles) {
                let role = this.custom.Roles[roleIndex];
                if (role.active) newRoleStr += role.role;
            }
            let tempMass = newRoleStr.split("");
            let tempChar = tempMass[index];
            tempMass[index] = tempMass[index + 1];
            tempMass[index + 1] = tempChar;
            await api.players_api.setRoles(this.custom.Player.ID, tempMass.join(""))
            this.emitter.emit("updateLobby");
        },
        async toggleFlex() {
            await api.players_api.setRoles(this.custom.Player.ID, !this.custom.isFlex)
            this.emitter.emit("updateLobby");
        },
    },
    computed: {
        styleObj: function () {
            return {
                display: this.menuOpened ? "block" : "none",
            };
        },
    },
};
</script>

<style scoped>

@import "../../assets/css/playerContainer.css";

.error {
    box-shadow: 0 1px 0 #c72727a8;
}
.sr_lobby_icon {
    display: flex;
}

.role_icon {
    margin-left: 4px;
    cursor: pointer;
}

.lobby_sr {
    padding: 0 20px 0 20px;
}

.role {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
}

.role > p {
    text-align: center;
    margin: 0;
}

.innactive {
    filter: brightness(0.3);
}

.X {
    margin-left: auto;
    justify-content: flex-end;
    margin: 0;
    flex-wrap: wrap;
    align-content: center;
    padding: 5px;
}

.author-right {
    position: absolute;
    color: #3b4b5f;
    bottom: 2px;
    right: 12px;
    width: max-content;
    margin: 0;
    font-size: 12px;
}

.sr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.switch_button {
    font-size: 30px;
    margin: 0;
    cursor: pointer;
}

.lobby_sr_input {
    width: 35px;
    background-color: #171e27;
    color: white;
    border: none;
    text-align: center;
    font-size: 16px;
    -moz-appearance: textfield;
    appearance: none;
}
.role_with_swap {
    display: flex;
}
</style>