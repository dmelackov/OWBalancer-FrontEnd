import App from './pages/App'
import { createApp, unref } from 'vue'
import mitt from 'mitt'
import axios from 'axios'
import router from './router'
import "./assets/css/scroll.css"
import Notifications from '@kyvg/vue3-notification'
import useLoginState from "./store/LoginState"
(async () => {
    

    const emitter = mitt();


    const {updateLoginState } = useLoginState()
    await updateLoginState()
    const {perms} = useLoginState()

    const app = createApp(App)

    router.beforeEach(async (to, from, next) => {
        const {UserInfo} = useLoginState()
        const usrInfo = unref(UserInfo)
        if (to.matched.some((route) => route.meta.requiresAuth)) {
            if (!usrInfo.auth) {
                next("/login");
                return
            }
        }
        if (to.matched.some((route) => route.meta.requiresNotAuth)) {
            if (usrInfo.auth) {
                next("/");
                return
            }
        }
        if (to.matched.some((route) => route.meta.requiresWorkspace)) {
            if (usrInfo.profile.workspace == null) {
                next("/workspace");
                return
            }
        }
        next();
    });

    app.use(router)
    app.use(Notifications)
    app.mixin({
        methods: {
            isPerm(perm) {
                return unref(perms).includes(perm);
            }
        },
    });

    app.config.globalProperties.emitter = emitter;
    app.mount("#app")
})()