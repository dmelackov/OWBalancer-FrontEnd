<template>
    <div id="app">
        <HeaderMenu />
        <div class="content">
            <SettingsColumn>
                <template slot="default">
                    <CheckboxSetting
                        setting="AutoCustom"
                        title="Custom Autochoice"
                    />
                </template>
            </SettingsColumn>
        </div>
    </div>
</template>

<script>
import HeaderMenu from "../../components/HeaderMenu.vue";
import SettingsColumn from "../../components/SettingsColumn.vue";
import CheckboxSetting from "../../components/CheckboxSetting.vue";
import Vue from "vue";
import axios from "axios";

let perms = [];
axios
    .get("/api/profile/getPermissions")
    .then((response) => (perms = response.data));

let UserInfo = {};
axios.get("/api/profile/getCurrentUserInfo").then((response) => {
    console.log(response);
    UserInfo = response.data;
    console.log(UserInfo.Username);
    if (UserInfo.Username == null) {
        window.location.href = "/login";
    }
});

Vue.mixin({
    data() {
        return {
            UserInfo: UserInfo,
        };
    },
    methods: {
        isPerm() {
            return perms;
        },
    },
});

Vue.prototype.eventBus = new Vue();

export default {
    components: {
        HeaderMenu,
        SettingsColumn,
        CheckboxSetting,
    },
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