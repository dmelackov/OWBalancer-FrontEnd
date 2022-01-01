<template>
    <div class="column_widget lobby">
        <p class="column_title">Lobby</p>
        <div class="players_count">
            <p id="lobby_count">Players in lobby: {{ lobbyPlayerCount }}</p>
            <p
                :class="{
                    opacity_disable: !isPerm('add_customs_tolobby'),
                    clear: true,
                }"
                id="clear_button"
                @click="clearLobby"
            >
                Clear
            </p>
        </div>

        <hr />
        <div class="lobby_list">
            <div id="lobby_list">
                <template v-for="player in lobbyPlayerList" >
                    <LobbyPlayerContainer :player="player" :key="player.ID"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import LobbyPlayerContainer from "./LobbyPlayerContainer.vue";
export default {
    components: {
        LobbyPlayerContainer,
    },

    data() {
        return {
            lobbyPlayerList: []
        };
    },

    methods: {
        updateLobby() {
            axios
                .get("/api/lobby/getLobby")
                .then((response) => (this.lobbyPlayerList = response.data));
        },
        async clearLobby() {
            await sendPOST("/api/lobby/clearLobby", {});
            this.eventBus.$emit("updateLobby");
        },
    },

    computed: {
        lobbyPlayerCount() {
            return this.lobbyPlayerList.length;
        },
    },

    async created() {
        this.updateLobby();
        this.eventBus.$on("updateLobby", () => this.updateLobby());
    },
};

async function sendPOST(url, params) {
    await axios.post(url, params);
}
</script>

<style scoped>
@import "../assets/css/global.css";
.column_widget {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    margin: 8px;
    margin-top: 10px;
    padding: 16px 16px;
    min-width: 15%;
    max-width: 15%;
    background-color: #11161d;
}

.column_title {
    margin: 0;
    margin-bottom: 5px;
    text-align: center;
}
.lobby_list {
    overflow-y: scroll;
    height: 100%;
}

#lobby_list {
    width: 100%;
    table-layout: fixed;
}

#lobby_count {
    margin: 0px;
    text-align: center;
}

.players_count {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 14px;
}

.clear {
    margin: 0;
    margin-right: 3px;
    cursor: pointer;
    color: #dbdbdb;
}

.clear:hover {
    color: #b3b3b3;
}
</style>