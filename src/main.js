import App from './pages/App'
import { createApp } from 'vue'
import mitt from 'mitt'
import axios from 'axios'
import router from './router'
import "./assets/css/scroll.css"
import Notifications from '@kyvg/vue3-notification'

(async () => {


    const emitter = mitt();

    let perms = [];
    let res = await axios.get("/api/profile/getPermissions")
    perms = res.data

    let UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data
    emitter.on("UpdateLoginState", async () => {
        UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data
        let res = await axios.get("/api/profile/getPermissions")
    perms = res.data
    })

    const app = createApp(App)


    router.beforeEach((to, from, next) => {
        if (to.matched.some((route) => route.meta.requiresAuth)) {
            if (UserInfo.Auth) {
                next();
            } else {
                next("/login");
            }
        } else if (to.matched.some((route) => route.meta.requiresNotAuth)) {
            if (UserInfo.Auth) {
                next("/");
            } else {
                next();
            }
        }
        else {
            next();
        }
    });

    app.use(router)
    app.use(Notifications)
    app.mixin({
        data() {
            return {
                UserInfo: UserInfo
            };
        },
        methods: {
            isPerm(perm) {
                return perms.includes(perm);
            }
        },
    });

    app.config.globalProperties.emitter = emitter;
    app.mount("#app")
})()