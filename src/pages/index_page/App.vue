<template>
    <div id="app">
        <HeaderMenu />
        <div class="content">
            <PlayerColumn />
            <LobbyColumn />
            <BalanceContainer />
        </div>
        <CustomSelectContainer />
    </div>
</template>

<script>
import LobbyColumn from "../../components/LobbyColumn.vue";
import PlayerColumn from "../../components/PlayerColumn.vue";
import CustomSelectContainer from "../../components/CustomSelectContainer.vue";
import BalanceContainer from "../../components/BalanceContainer.vue";
import HeaderMenu from "../../components/HeaderMenu.vue";
import Vue from "vue";
import axios from "axios";

let perms = [];
axios
    .get("/api/profile/getPermissions")
    .then((response) => (perms = response.data));

let UserInfo = {};
axios.get("/api/profile/getCurrentUserInfo").then((response) => {
    console.log(response)
    UserInfo = response.data;
    console.log(UserInfo.Username)
    if (UserInfo.Username == null) {
        window.location.href = "/login";
    }
});

Vue.mixin({
    data() {
        return {};
    },
    methods: {
        isPerm() {
            return perms;
        },
        sendPOST() {},
    },
});

Vue.prototype.eventBus = new Vue();

document.body.addEventListener("mousedown", (e) => {
    if (!e.target.closest(".customSelect")) {
        new Vue().eventBus.$emit("closeCustomMenu");
    }
    //if (!e.target.closest(".lobby_container")) {
    //    if (app.activeLobbyMenu) {
    //        app.activeLobbyMenu.close();
    //    }
    //}
});

export default {
    components: {
        LobbyColumn,
        PlayerColumn,
        CustomSelectContainer,
        BalanceContainer,
        HeaderMenu,
    },
    data() {
        return { perms: [] };
    },
    methods: {},
    async created() {
        let token = await axios.get("/api/profile/auth/getCSRF");
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token.data;
    },
};
</script>


<style scoped>
@import "../../assets/css/global.css";
.content {
    height: 92%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>