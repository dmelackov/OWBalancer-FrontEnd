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
            component: BalancerPage,
            meta: {
                title: "OWBalancer"
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
            path: "/workspace",
            //component: SettingsPage,
            meta: {
                requiresAuth: true,
                title: "Workspace"
            },

        },
        {
            path: "/statistics", 
            //component: BalancerPage,
            meta: {
                requiresAuth: true,
                title: "Statistics"
            },

        },
    ]
})

export default router