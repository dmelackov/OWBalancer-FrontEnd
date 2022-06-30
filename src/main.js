import App from './pages/App'
import { createApp } from 'vue'
import mitt from 'mitt'
import axios from 'axios'
import router from './router'
import "./assets/css/scroll.css"
import Notifications from '@kyvg/vue3-notification'

(async () => {


    const emitter = mitt();

    const status = {}
    status.perms = (await axios.get("/api/profile/getPermissions")).data
    status.Settings = (await axios.get("/api/profile/settings/getSettings")).data
    status.UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data
    
    emitter.on("updateUserInfo", async () => {
        status.UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data
    })

    emitter.on("UpdateLoginState", async () => {
        status.UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data
        let res = await axios.get("/api/profile/getPermissions")
        status.perms = res.data
    })

    const app = createApp(App)

    app.config.globalProperties.status = status

    router.beforeEach((to, from, next) => {
        if (to.matched.some((route) => route.meta.requiresAuth)) {
            if (!status.UserInfo.Auth) {
                next("/login");
            }
        }
        if (to.matched.some((route) => route.meta.requiresNotAuth)) {
            if (status.UserInfo.Auth) {
                next("/");
            }
        }
        if (to.matched.some((route) => route.meta.requiresWorkspace)) {
            if (status.UserInfo.Workspace == null) {
                next("/workspace");
            }
        }

        next();

    });

    app.use(router)
    app.use(Notifications)
    app.mixin({
        data() {
            return {
                UserInfo: status.UserInfo,
                Settings: status.Settings,
                status: status
            };
        },
        methods: {
            isPerm(perm) {
                return status.perms.includes(perm);
            }
        },
    });

    app.config.globalProperties.emitter = emitter;
    app.mount("#app")
})()