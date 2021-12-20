<template>
    <div class="column_widget players">
        <div class="column_controlls">
            <p class="column_title">Players</p>
            <div
                :class="{
                    opacity_disable: !isPerm('create_player'),
                    user_create_container: true,
                }"
            >
                <input
                    type="text"
                    id="UserNickname"
                    placeholder="Username"
                    class="custom_input"
                    v-model="createPlayerNickname"
                    @keydown="createPlayerEnter"
                />
                <button
                    class="btn btn-submit custom_input"
                    id="UserCreateButton"
                    @click="createPlayer"
                >
                    Create
                </button>
            </div>
            <hr />
            <input
                type="text"
                id="PlayersSearch"
                autocomplete="off"
                placeholder="Search"
                class="custom_input"
                v-model="playersNicknameFilter"
            />
        </div>

        <hr />
        <div class="player_list">
            <div id="players_list">
                <template v-for="player in filteredPlayerList">
                    <PlayerContainer :player="player" :key="player.id" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import PlayerContainer from "./PlayerContainer.vue";
import axios from "axios";

export default {
    components: {
        PlayerContainer,
    },
    data() {
        return {
            createPlayerNickname: "",
            playersNicknameFilter: "",
            playerList: [],
        };
    },
    methods: {
        async createPlayer() {
            await sendPOST("/api/players/createPlayer", {
                Username: this.createPlayerNickname,
            });
            this.createPlayerNickname = "";
            this.updatePlayers();
        },
        updatePlayers() {
            axios
                .get("/api/players/getPlayers/")
                .then((response) => (this.playerList = response.data));
        },
        createPlayerEnter(e) {
            if (e.code === "Enter") this.createPlayer();
        },
    },
    computed: {
        filteredPlayerList() {
            let player = this.playersNicknameFilter.toLowerCase();
            let players = this.playerList;
            let filteredPlayers = players.filter(function (elem) {
                if (player === "") return true;
                else return elem.Username.toLowerCase().indexOf(player) > -1;
            });
            return filteredPlayers;
        },
    },
    async created() {
        this.updatePlayers();
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
    border: solid 1px #444444;
    margin: 8px;
    margin-top: 10px;
    padding: 16px 16px;
    min-width: 15%;
    max-width: 15%;
    background-color: #11161d;
}

.player_list {
    overflow-y: scroll;
    height: 100%;
}

#players_list {
    width: 100%;
    table-layout: fixed;
}

.user_create_container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: space-between;
}

.column_title {
    margin: 0;
    margin-bottom: 5px;
    text-align: center;
}
</style>