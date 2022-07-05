<template>
    <div class="custom">
        <div class="left">
            <p class="creator">By {{ custom.Creator.Profile.username }}</p>
            <div class="roles">
                <div class="roleSr">
                    <img
                        src="/img/role_icons/tank.svg"
                        alt=""
                        width="24"
                        class="role_icon"
                    />
                    <p>{{ SR.T }}</p>
                </div>
                <div class="roleSr">
                    <img
                        src="/img/role_icons/dps.svg"
                        alt=""
                        width="24"
                        class="role_icon"
                    />
                    <p>{{ SR.D }}</p>
                </div>
                <div class="roleSr">
                    <img
                        src="/img/role_icons/support.svg"
                        alt=""
                        width="24"
                        class="role_icon"
                    />
                    <p>{{ SR.H }}</p>
                </div>
            </div>
        </div>
        <button class="deleteButton btn" v-show="!deleted" v-if="canDelete" @click="del">
            Delete
        </button>
        <button
            class="cancelButton btn"
            v-show="deleted"
            v-if="canDelete"
            @click="cancelDel"
        >
            Cancel delete
        </button>
    </div>
</template>

<script>
import useLoginState from "/src/store/LoginState";

export default {
    setup() {
        const { Settings, UserInfo } = useLoginState();
        return {
            Settings,
            UserInfo,
        };
    },
    props: ["custom"],
    data() {
        return {
            roles: {},
            SR: {},
            isMyCustom: false,
            deleted: false,
        };
    },
    methods: {
        getRolesInfo() {
            for (const key in this.custom.Roles) {
                const element = this.custom.Roles[key];
                this.roles[element.role] = element.active;
                this.SR[element.role] = element.sr;
            }
            return false;
        },
        del() {
            this.deleted = true;
            this.$emit("delete", this.custom.ID)
        },
        cancelDel() {
            this.deleted = false;
            this.$emit("cancel-delete", this.custom.ID)
        },
    },

    computed: {
        canDelete() {
            return this.isMyCustom || this.isPerm("delete_custom");
        },
    },
    created() {
        this.getRolesInfo();
        if (this.custom.Creator.Profile.ID == this.UserInfo.ID) this.isMyCustom = true;
    },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/css/var.scss";
.custom {
    background-color: $back2;
    border-radius: 6px;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 0 #3a4b68a8;
    align-items: center;
    .deleteButton {
        background-color: $errorRed;
        box-shadow: none;
        width: 120px;
        padding: 4px 0 4px 0;

        &:hover {
            background-color: $errorRedHover;
        }
    }
    .cancelButton {
        width: 120px;
        padding: 4px 0 4px 0;
        box-shadow: none;
        background-color: #6b1414;
        &:hover {
            background-color: #921a1a;
        }
    }
    .left {
        display: flex;
        align-items: center;
        .creator {
            width: 200px;
        }
        .roles {
            display: flex;
            flex-direction: row;
            gap: 4px;
            .roleSr {
                display: flex;
                flex-direction: column;
                align-items: center;
                p {
                    width: 40px;
                    text-align: center;
                }
            }
        }
    }
}
</style>
