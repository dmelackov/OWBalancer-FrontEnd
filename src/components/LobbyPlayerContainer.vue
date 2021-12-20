<template>
    <div
        :class="{
            error: player.warn,
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
            <p class="player_username">{{ player.Username }}</p>
            <div class="sr_lobby" v-if="!active">
                <div class="sr_lobby_icon" v-if="!player.isFlex">
                    <img
                        :src="'/static/img/' + role.role + '_icon.png'"
                        alt=""
                        width="15"
                        :class="{ role_icon: true, innactive: !role.active }"
                        v-for="(role, index) in player.RolesPriority"
                        :key="index"
                    />
                </div>
                <img
                    src="/static/img/flex.svg"
                    alt=""
                    v-if="player.isFlex"
                    width="16"
                />
            </div>
            <p class="author-right">{{ player.Author.username }}</p>
            <p class="X" v-if="active" @click="deleteFromLobby">✖</p>
        </div>
        <div class="lobby_menu" :style="styleObj">
            <hr />
            <div class="sr lobby_sr">
                <template v-for="(role, index) in player.RolesPriority">
                    <div :key="index">
                        <div class="role">
                            <img
                                :src="'/static/img/' + role.role + '_icon.png'"
                                alt=""
                                width="30"
                                :class="{
                                    role_icon: true,
                                    innactive: !role.active,
                                }"
                                @click="toggleRole(role.role)"
                            />
                            <sr-input
                                v-if="player.editable"
                                :role="role"
                                :CustomID="player.CustomID"
                            />
                            <p v-if="!player.editable">{{ role.sr }}</p>
                        </div>
                        <p
                            :class="{
                                switch_button: true,
                                opacity_disable: !isPerm('change_player_roles'),
                            }"
                            v-if="index != 2"
                            @click="swapRoles(index)"
                        >
                            ⇆
                        </p>
                    </div>
                </template>
                <img
                    src="/static/img/flex.svg"
                    alt=""
                    width="30"
                    :class="{
                        role_icon: true,
                        flex: true,
                        innactive: !player.isFlex,
                    }"
                    @click="toggleFlex"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import app from "../pages/index_page/App.vue";
export default {
    props: ["player", "opened"],

    data() {
        return {
            menuOpened: false,
            active: false,
        };
    },
    methods: {
        open(event) {
            if (app.activeLobbyMenu == this) {
                this.close();
                return;
            }
            if (app.activeLobbyMenu) {
                app.activeLobbyMenu.close();
            }
            if (event.target.classList.contains("X")) return;
            app.activeLobbyMenu = this;
            this.menuOpened = true;
            app.activeLobbyId = this.player.CustomID;
        },
        close() {
            this.menuOpened = false;
            app.activeLobbyMenu = null;
            app.activeLobbyId = null;
        },
        async deleteFromLobby() {
            await sendPOST("/api/lobby/deleteFromLobby", {
                id: this.player.CustomID,
            });
            app.updateLobby();
        },
        async toggleRole(ARGrole) {
            let newRoleStr = "";
            let roleIndex;
            for (roleIndex in this.player.RolesPriority) {
                let role = this.player.RolesPriority[roleIndex];
                let tempActive = role.active;
                if (role.role == ARGrole) tempActive = !tempActive;
                if (tempActive) newRoleStr += role.role;
            }
            await sendPOST("/api/players/setRoles", {
                id: this.player.CustomID,
                roles: newRoleStr,
            });
            app.updateLobby();
        },
        async swapRoles(index) {
            let newRoleStr = "";
            let roleIndex;
            for (roleIndex in this.player.RolesPriority) {
                let role = this.player.RolesPriority[roleIndex];
                if (role.active) newRoleStr += role.role;
            }
            let tempMass = newRoleStr.split("");
            let tempChar = tempMass[index];
            tempMass[index] = tempMass[index + 1];
            tempMass[index + 1] = tempChar;
            await sendPOST("/api/players/setRoles", {
                id: this.player.CustomID,
                roles: tempMass.join(""),
            });
            app.updateLobby();
        },
        async toggleFlex() {
            await sendPOST("/api/players/setFlex", {
                id: this.player.CustomID,
                status: !this.player.isFlex,
            });
            app.updateLobby();
        }
    },
    created() {
        this.menuOpened = this.opened;
    },
    computed: {
        styleObj: function () {
            return {
                display: this.menuOpened ? "block" : "none",
            };
        },
    },
};
async function sendPOST(url, params) {
    await axios.post(url, params);
}
</script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/playerContainer.css";

.sr_lobby_icon {
    display: flex;
}

.sr_lobby_icon>.role_icon {
    margin-left: 4px;
}

.lobby_sr {
    padding: 0 20px 0 20px;
}

.role {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: center
}

.role>p {
    text-align: center;
    margin: 0;
}

.player_username {
    font-size: 18px;
    margin-top: 0;
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
</style>