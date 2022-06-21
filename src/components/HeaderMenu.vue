<template>
    <div class="header">
        <div class="menu">
            <div class="menu-left">
                <div class="linkContainer">
                    <router-link class="link" to="/">Balancer</router-link>
                </div>
                <div class="linkContainer">
                    <router-link class="link" to="/workspace">Workspace</router-link>
                </div>
                <div class="linkContainer">
                    <router-link class="link" to="/statistics">Statistics</router-link>
                </div>
            </div>
            <div class="menu-right" >
                <div :class="{ usernameMenuOpened: menuOpened }">
                    <p class="username" v-if="Username != null" @click="toggleMenu">
                        {{ Username }}
                    </p>
                    <router-link class="link" to="/login" v-else
                        >Authorization</router-link
                    >
                </div>
            </div>
        </div>
    </div>
    <div class="profileMenu" v-show="menuOpened">
        <p class="workspaceName">WorkspaceName</p>
        <p class="workspaceStatus">WorkspaceStatus</p>
        <hr />
        <div class="linkContainer">
            <router-link class="link" to="/profile">Profile</router-link>
        </div>
        <div class="linkContainer">
            <router-link class="link" to="/settings">Settings</router-link>
        </div>
        <div class="linkContainer">
            <a class="link" href="">Guide</a>
        </div>
        <div class="linkContainer">
            <a class="link exit" @click="exit">Exit</a>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
    data() {
        return {
            Username: "",
            menuOpened: false,
        };
    },
    methods: {
        async getUserData() {
            let info = await axios.get("/api/profile/getCurrentUserInfo");
            let infoContent = info.data;
            this.Username = infoContent.Username;
        },
        toggleMenu() {
            this.menuOpened = !this.menuOpened;
        },
        async exit() {
            this.menuOpened = false;
            let res = await axios.post("/api/profile/auth/logout");
            let ResData = res.data;
            if (ResData.status == 200) {
                this.emitter.emit("UpdateLoginState");
                setTimeout(() => {
                    router.push("/login");
                }, 100);
            } 
        },
    },
    created() {
        this.emitter.on("UpdateLoginState", () => this.getUserData());
        this.getUserData();
        document.body.addEventListener("mousedown", (e) => {
            if (!e.target.closest(".profileMenu") && !e.target.closest(".menu-right")) {
                this.menuOpened = false
            }
        });
    },
};
</script>

<style scoped lang="scss">


.header {
    height: 52px;
    background-color: #161b22;
    display: flex;
    .menu {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        div {
            height: 100%;
        }

        .menu-left {
            display: flex;

            .link {
                height: 100%;
                display: flex;
                align-items: center;
                padding: 0 16px 0 16px;
                &.router-link-active {
                    background: rgba(255, 255, 255, 0.025);
                }
                &:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
            }
        }
        .menu-right {
            height: 100%;
            display: flex;

            div {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .username {
                    color: #ffffff;
                    width: 164px;
                    padding: 0 16px 0 16px;
                    text-overflow: clip;
                    height: 100%;
                    text-align: center;
                    line-height: 52px;
                }
                .link {
                    text-align: center;
                    line-height: 52px;
                    width: 164px;
                    padding: 0 16px 0 16px;
                }
                &.usernameMenuOpened {
                    background: #242d38;
                }

                &:hover {
                    cursor: pointer;
                    background: rgba(255, 255, 255, 0.05);
                }
            }
        }
    }
}
.profileMenu {
    position: absolute;
    right: 0;
    top: 52px;

    background: #1b222b;
    border-radius: 0 0 0 6px;

    height: max-content;
    width: 196px;
    opacity: .9;
    display: flex;
    flex-direction: column;
    align-items: center;
    .workspaceName,
    .workspaceStatus {
        color: rgb(199, 199, 199);
        margin: 0;
    }
    .workspaceName {
        font-size: 16px;
    }
    .workspaceStatus {
        font-size: 12px;
    }
    hr {
        margin-top: 4px;
        margin-bottom: 4px;
    }
    .linkContainer {
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        .link {
            width: 100%;
            height: max-content;
            padding: 4px 0 4px 0;
            &:hover {
                background: rgba(255, 255, 255, 0.05);
            }
            &.exit {
                cursor: pointer;
                color: rgb(253, 191, 191);
                &:hover {
                    border-radius: 0 0 0 6px;
                }
            }
        }
    }
}
</style>
