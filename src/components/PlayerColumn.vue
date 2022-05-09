<template>
    <div class="column_widget players">
        <div class="column_controlls">
            <p class="column_title">Players</p>
            <div
                v-if="isPerm('create_player')"
                :class="{
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
            <hr v-if="isPerm('create_player')" />
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
        <Scrollbar class="player_list">
            <PlayerContainer
                :player="player"
                v-for="player in filteredPlayerList"
                :key="player.ID"
            />
        </Scrollbar>
    </div>
</template>

<script>
import PlayerContainer from "./PlayerContainer.vue";
import axios from "axios";
import Scrollbar from "vue3-smooth-scrollbar";

export default {
    components: {
        PlayerContainer,
        Scrollbar,
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
            await axios.post("/api/players/createPlayer", {
                Username: this.createPlayerNickname,
            });
            this.createPlayerNickname = "";
            this.emitter.emit("updatePlayers");
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
        this.emitter.on("updatePlayers", () => this.updatePlayers());
        this.updatePlayers();
    },
};
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

.player_list {
    max-height: 100%;
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
