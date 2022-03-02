<template>
    <div class="content">
        <GeneralSettings />
    </div>
</template>

<script>
import GeneralSettings from "../components/GeneralSettings.vue";

export default {
    components: {
        GeneralSettings,
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