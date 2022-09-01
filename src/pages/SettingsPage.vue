<template>
    <div class="content">
        <GeneralSettings />
        <BalanceSettings />
    </div>
</template>

<script>
import GeneralSettings from "@/components/Settings/GeneralSettings.vue";
import BalanceSettings from "@/components/Settings/BalanceSettings.vue";
export default {
    components: {
        GeneralSettings,
        BalanceSettings
    }
};
</script>

<style scoped>

.content {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>