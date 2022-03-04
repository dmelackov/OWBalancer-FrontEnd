<template>
    <HeaderMenu />
    <notifications
        position="top right"
        classes="notification"
        duration="100000"
        style="top: 64px"
    >
        <template #body="{ item }">
            <div class="notification-template">
                <div class="notification-template-content">
                    <div class="notification-template-title">
                        {{ item.title }}    
                    </div>
                    <div class="notification-template-content">
                        {{ item.content }}
                    </div>
                </div>
                <p class="notification-template-close" @click="close">✖</p>
            </div>
        </template>
    </notifications>
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
    },
};
</script>

<style scoped>
#app {
    width: 100%;
    height: 92%;
}

.notification-template {
    padding: 6px 12px;
    background-color: #1f2936;
    border-radius: 5px;
    margin-bottom: 3px;
}

.info>.notification-template {
    box-shadow: 0 1px 0 #3a4b68;
}

.warn>.notification-template {
    box-shadow: 0 1px 0 #bcc727;
}

.error>.notification-template {
    box-shadow: 0 1px 0 #c72727;
}

.success>.notification-template {
    box-shadow: 0 1px 0 #1abe5e;
}

</style>