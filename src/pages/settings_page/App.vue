<template>
      <div id="app">
        <HeaderMenu />

    </div>
</template>

<script>
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
        return {
            UserInfo: UserInfo
        };
    },
    methods: {
        isPerm() {
            return perms;
        }
    },
});

Vue.prototype.eventBus = new Vue();

export default {
  components: {
    HeaderMenu
  }
}
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