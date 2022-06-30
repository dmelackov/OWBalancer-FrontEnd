<template>
    <SettingsColumn ColumnName="Math">
        <slot>
            <div class="num_input">
                <p class="checkbox_title">Balance Limit</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.BalanceLimit"
                    @change="changeBalanceLimit"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">alpha</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.alpha"
                    @change="changeAlpha"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">beta</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.beta"
                    @change="changeBeta"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">gamma</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.gamma"
                    @change="changeGamma"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">tWeight</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.tWeight"
                    @change="changeTWeight"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">dWeight</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.dWeight"
                    @change="changeDWeight"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">hWeight</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.hWeight"
                    @change="changeHWeight"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">p</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.p"
                    @change="changeP"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
            <div class="num_input">
                <p class="checkbox_title">q</p>
                <input
                    type="number"
                    class="custom_input"
                    v-model="Settings.Math.q"
                    @change="changeQ"
                    @keydown.enter="$event.target.blur()"
                />
            </div>
        </slot>
    </SettingsColumn>
</template>

<script>
import SettingsColumn from "./SettingsColumn.vue";
import axios from "axios";

import useLoginState from "/src/store/LoginState"

export default {
    setup() {
        const {Settings} = useLoginState()
        return {
            Settings
        }
    },
    components: {
        SettingsColumn,
    },
    data() {
        return {
            themeID: 0,
        };
    },
    async created() {
        this.themeID = this.getTheme();
    },
    methods: {
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
        changeBalanceLimit() {
            if (this.Settings.BalanceLimit <= 0) {
                this.Settings.BalanceLimit = 0;
            }
            if (this.Settings.BalanceLimit >= 10000) {
                this.Settings.BalanceLimit = 10000;
            }
            this.sendNewSettings();
        },
        changeAlpha() {
            this.sendNewSettings();
        },
        changeBeta() {
            this.sendNewSettings();
        },
        changeGamma() {
            this.sendNewSettings();
        },
        changeTWeight() {
            if (this.Settings.Math.tWeight <= -100) {
                this.Settings.Math.tWeight = -100;
            }
            if (this.Settings.Math.tWeight >= 100) {
                this.Settings.Math.tWeight = 100;
            }
            this.sendNewSettings();
        },
        changeDWeight() {
            if (this.Settings.Math.dWeight <= -100) {
                this.Settings.Math.dWeight = -100;
            }
            if (this.Settings.Math.dWeight >= 100) {
                this.Settings.Math.dWeight = 100;
            }
            this.sendNewSettings();
        },
        changeHWeight() {
            if (this.Settings.Math.hWeight <= -100) {
                this.Settings.Math.hWeight = -100;
            }
            if (this.Settings.Math.hWeight >= 100) {
                this.Settings.Math.hWeight = 100;
            }
            this.sendNewSettings();
        },
        changeP() {
            if (this.Settings.Math.p <= 1) {
                this.Settings.Math.p = 1;
            }
            if (this.Settings.Math.p >= 10) {
                this.Settings.Math.p = 10;
            }
            this.sendNewSettings();
        },
        changeQ() {
            if (this.Settings.Math.q <= 1) {
                this.Settings.Math.q = 1;
            }
            if (this.Settings.Math.q >= 10) {
                this.Settings.Math.q = 10;
            }
            this.sendNewSettings();
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
