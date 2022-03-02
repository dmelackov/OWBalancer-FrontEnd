import { createRouter, createWebHistory } from 'vue-router'
import BalancerPage from "./pages/BalancerPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import GamesPage from "./pages/GamesPage"
import SettingsPage from "./pages/SettingsPage"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: GamesPage,
            meta: {
                title: "Games"
            }
        },
        {
            path: "/login",
            component: LoginPage,
            meta: {
                title: "Login",
                requiresNotAuth: true
            }

        },
        {
            path: "/register",
            component: RegisterPage,
            meta: {
                title: "Register",
                requiresNotAuth: true
            }

        },
        {
            path: "/settings",
            component: SettingsPage,
            meta: {
                requiresAuth: true,
                title: "Settings"
            },

        },
        {
            path: "/balancer", component: BalancerPage,
            meta: {
                requiresAuth: true,
                title: "OWBalancer"
            },

        },
    ]
})

export default router