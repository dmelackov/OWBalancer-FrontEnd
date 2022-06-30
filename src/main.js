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
    status.UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data

    if(status.UserInfo.Auth) status.Settings = (await axios.get("/api/profile/settings/getSettings")).data

    const app = createApp(App)

    app.config.globalProperties.status = status

    router.beforeEach((to, from, next) => {
        if (to.matched.some((route) => route.meta.requiresAuth)) {
            if (!status.UserInfo.Auth) {
                next("/login");
                return
            }
        }
        if (to.matched.some((route) => route.meta.requiresNotAuth)) {
            if (status.UserInfo.Auth) {
                next("/");
                return
            }
        }
        if (to.matched.some((route) => route.meta.requiresWorkspace)) {
            if (status.UserInfo.Workspace == null) {
                next("/workspace");
                return
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
            },
            async updateLoginState(){
                this.UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data
                if(this.UserInfo.Auth) this.Settings = (await axios.get("/api/profile/settings/getSettings")).data
                let res = await axios.get("/api/profile/getPermissions")
                this.perms = res.data
            }
        },
    });

    app.config.globalProperties.emitter = emitter;
    app.mount("#app")
})()