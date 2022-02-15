<template>
    <div class="settings_checkbox">
        <input class="custom_input" :type=type name="input" v-model="value">
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ["setting", "type", "inputName"],
    data(){
        return {
            SettingValue: false
        }
    },
    computed: {
        value: {
            get(){
                return this.SettingValue
            },
            async set(v){
                await axios.post("/api/profile/settings/setSettings", {"setting": this.setting, "value": v})
                this.getValueFromServer()
            }
        }
    },
    methods: {
        async getValueFromServer(){
            let val = (await axios.get('/api/profile/settings/getSettings')).data[this.inputName]
            this.SettingValue = this.type == "number" ? parseInt(val) : val
        }
    },
    created(){
        this.getValueFromServer()
    }
}
</script>

<style scoped>
@import "../assets/css/global.css";

.settings_checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: max-content;
    margin-bottom: 5px;
    margin-top: 5px;
}

.checkbox_title {
    margin: 0;
}
.custom_input {
    text-align: center;
}
</style>