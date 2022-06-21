<template>
    <HeaderMenu />
    <notifications
        position="top right"
        classes="notification"
        duration="3"
        style="top: 70px"
    >
        <template #body="{ item }" @click="close">
            <div class="notification-template">
                <div class="notification-template-content">
                    <div class="notification-template-title">
                        {{ item.title }}
                    </div>
                    <div class="notification-template-content">
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </template>
    </notifications>
    <div id="app_content">
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
<style>
@import "../assets/css/global.css";
</style>
<style lang="scss" scoped>
#app_content {
    width: 100%;
    height: 92%;
}

.notification-template {
    padding: 8px 12px;
    background-color: #1f2936;
    border-radius: 5px;
    margin-bottom: 3px;
    &.info {
        box-shadow: 0 1px 0 #3a4b68;
    }
    &.warn {
        box-shadow: 0 1px 0 #bcc727;
    }
    &.error {
        box-shadow: 0 1px 0 #c72727;
    }
    &.success {
        box-shadow: 0 1px 0 #1abe5e;
    }
}
</style>
