<template>
    <HeaderMenu />
    <notifications position="top right" classes="notification" />
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import HeaderMenu from "../components/HeaderMenu.vue";

export default {
    name: "app",
    components: {
        HeaderMenu,
    },
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.meta.title || "OWBalancer";
            },
        },
    }
};
</script>

<style scoped>
#app {
    width: 100%;
    height: 92%;
}
</style>