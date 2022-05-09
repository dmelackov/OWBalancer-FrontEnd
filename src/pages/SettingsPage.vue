<template>
    <div class="content">
        <GeneralSettings />
        <BalanceSettings />
    </div>
</template>

<script>
import GeneralSettings from "../components/GeneralSettings.vue";
import BalanceSettings from "../components/BalanceSettings.vue";
export default {
    components: {
        GeneralSettings,
        BalanceSettings
    }
};
</script>

<style scoped>
@import "../assets/css/global.css";
.content {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>