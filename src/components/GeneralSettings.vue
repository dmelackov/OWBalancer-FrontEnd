<template>
    <SettingsColumn ColumnName="Settings">
        <slot>
            <div class="checkbox_container">
                <input
                    type="checkbox"
                    class="checkbox_input"
                    v-model="Settings.AutoCustom"
                    @change="sendNewSettings"
                />
                <p class="checkbox_title">Custom Autochoice</p>
            </div>
            <div class="checkbox_container">
                <input
                    type="checkbox"
                    class="checkbox_input"
                    v-model="Settings.ExtendedLobby"
                    @change="sendNewSettings"
                />
                <p class="checkbox_title">Extended Lobby</p>
            </div>
            <div class="checkbox_container">
                <input
                    type="checkbox"
                    class="checkbox_input"
                    v-model="Settings.ExpandedResult"
                    @change="sendNewSettings"
                />
                <p class="checkbox_title">Extended Result</p>
            </div>
            <div class="checkbox_container">
                <input
                    type="checkbox"
                    class="checkbox_input"
                    v-model="Settings.Autoincrement"
                    @change="sendNewSettings"
                />
                <p class="checkbox_title">Autoincrement</p>
            </div>
            <hr />
            <div class="column_title">Role amount settings</div>
            <div class="role_count_settings">
                <div class="role">
                    <img src="/img/T_icon.png" alt="" width="30" />
                    <input
                        type="number"
                        class="custom_input"
                        v-model="Settings.Amount.T"
                        @change="sendNewSettings"
                    />
                </div>
                <div class="role">
                    <img src="/img/D_icon.png" alt="" width="30" />
                    <input
                        type="number"
                        class="custom_input"
                        v-model="Settings.Amount.D"
                        @change="sendNewSettings"
                    />
                </div>
                <div class="role">
                    <img src="/img/H_icon.png" alt="" width="30" />
                    <input
                        type="number"
                        class="custom_input"
                        v-model="Settings.Amount.H"
                        @change="sendNewSettings"
                    />
                </div>
            </div>
            <hr />
            <p class="column_title">Teams</p>
            <div class="team_name_settings">
                <div class="team">
                    <p class="title">Team 1:</p>
                    <input
                        type="text"
                        class="custom_input"
                        v-model="Settings.TeamNames['1']"
                        @change="sendNewSettings"
                    />
                </div>
                <div class="team">
                    <p class="title">Team 1 color:</p>
                    <input
                        type="color"
                        class="custom_input"
                        v-model="Settings.fColor"
                        @change="sendNewSettings"
                    />
                </div>

                <div class="team">
                    <p class="title">Team 2:</p>
                    <input
                        type="text"
                        class="custom_input"
                        v-model="Settings.TeamNames['2']"
                        @change="sendNewSettings"
                    />
                </div>
                <div class="team">
                    <p class="title">Team 2 color:</p>
                    <input
                        type="color"
                        class="custom_input"
                        v-model="Settings.sColor"
                        @change="sendNewSettings"
                    />
                </div>
            </div>
            <hr />
            <p class="column_title">Balance Design</p>
            <select name="theme" v-model="theme" class="custom_input">
                <option value="0">Design 1</option>
                <!--<option value="1">Design 2</option>-->
            </select>
            <img class="balance_preview" :src="themeImgSrc" alt="" />
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
            seti.Amount.T = parseInt(seti.Amount.T);
            seti.Amount.D = parseInt(seti.Amount.D);
            seti.Amount.H = parseInt(seti.Amount.H);
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
@import "../assets/css/global.css";

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
.balance_limit {
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
</style>
