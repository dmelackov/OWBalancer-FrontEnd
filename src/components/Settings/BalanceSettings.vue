<template>
    <SettingsColumn ColumnName="Math">
        <slot>
            <div class="num_input">
                <p class="checkbox_title">Balance Limit</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.BalanceLimit"
                    @change="sendNewSettings"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">alpha</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.alpha"
                    @change="sendNewSettings"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">beta</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.beta"
                    @change="sendNewSettings"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">gamma</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.gamma"
                    @change="sendNewSettings"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">tWeight</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.tWeight"
                    @change="sendNewSettings"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">dWeight</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.dWeight"
                    @change="sendNewSettings"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">hWeight</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.hWeight"
                    @change="sendNewSettings"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">p</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.p"
                    @change="sendNewSettings"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">q</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.q"
                    @change="sendNewSettings"
                />
            </div>
        </slot>
    </SettingsColumn>
</template>

<script>
import SettingsColumn from "./SettingsColumn.vue";
import axios from "axios";

export default {
    components: {
        SettingsColumn,
    },
    data() {
        return {
            Settings: {
                Amount: { D: null, H: null, T: null },
                Math: {
                    alpha: null,
                    beta: null,
                    gamma: null,
                    p: null,
                    q: null,
                    tWeight: null,
                    dWeight: null,
                    hWeight: null,
                },
                AutoCustom: null,
                Autoincrement: null,
                BalanceLimit: null,
                ExtendedLobby: null,
                ExpandedResult: null,
                TeamNames: {
                    1: null,
                    2: null,
                },
                fColor: null,
                sColor: null,
            },
            themeID: 0,
        };
    },
    async created() {
        this.getValuesFromServer();
        this.themeID = this.getTheme();
    },
    methods: {
        async getValuesFromServer() {
            this.Settings = (await axios.get("/api/profile/settings/getSettings")).data;
        },
        async sendNewSettings() {
            let seti = this.Settings;
            seti.BalanceLimit = parseInt(seti.BalanceLimit);
            await axios.post("/api/profile/settings/setSettings", seti);
        },
        getTheme() {
            return localStorage.getItem("theme") != null
                ? parseInt(localStorage.getItem("theme"))
                : 0;
        },
    },
    computed: {
        theme: {
            set(v) {
                localStorage.setItem("theme", v);
                this.themeID = v;
            },
            get() {
                return this.themeID;
            },
        },
        themeImgSrc: {
            get() {
                return "/img/theme" + this.themeID + ".jpg";
            },
        },
    },
};
</script>

<style lang="scss" scoped>


.role {
    margin: auto;
    display: flex;
}
.role_count_settings {
    display: flex;
}
.checkbox_container {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}
.checkbox_title {
    margin: 0;
    margin-left: 2px;
}
.column_title {
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
}

.team,
.num_input {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    height: max-content;
    .title {
        min-width: max-content;
        margin: 0;
        margin-right: 6px;
    }
    input {
        height: 30px;
        margin: 0;
    }
}
.balance_preview {
    margin-top: 12px;
    width: 100%;
}
.checkbox_title {
    min-width: 25%;
}
</style>
