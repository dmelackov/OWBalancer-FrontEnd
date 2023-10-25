<template>
    <div class="role">
        <img
            :src="getRoleIco(roleInst.role)"
            alt=""
            width="30"
            :class="{
                role_icon: true,
                innactive: !roleInst.active,
            }"
            @click="toggleRole(role.role)"
        />
        <input
            type="number"
            v-model="roleInst.sr"
            v-if="editable"
            class="lobby_sr_input"
            @focus="$event.target.select()"
            @keydown.enter="$event.target.blur()"
            @change="setSR()"
        />
        <p v-if="!editable">{{ roleInst.sr }}</p>
    </div>
</template>

<script>
import api from "@/api"
import useLoginState from "@/store/LoginState";

export default {
    props: ["role", "custom"],
    setup() {
        const { UserInfo, Settings, updateLoginState } = useLoginState();
        return {
            UserInfo,
            Settings
        };
    },
    data() {
        return {
            roleInst: this.role,
        };
    },
    methods: {
        getRoleIco(role) {
            let iconImages = {
                T: "img/role_icons/tank.svg",
                D: "img/role_icons/dps.svg",
                H: "img/role_icons/support.svg",
                0: "img/role_icons/tank.svg",
                1: "img/role_icons/dps.svg",
                2: "img/role_icons/support.svg",
            };
            return iconImages[role];
        },
        async toggleRole(ARGrole) {
            if (this.custom.isFlex) return;
            let newRoleStr = "";
            let roleIndex;
            for (roleIndex in this.custom.Roles) {
                let role = this.custom.Roles[roleIndex];
                let tempActive = role.active;
                if (role.role == ARGrole) tempActive = !tempActive;
                if (tempActive) newRoleStr += role.role;
            }
            await api.players_api.setRoles(this.custom.Player.ID, newRoleStr)
            this.emitter.emit("updateLobby");
        },
        async setSR() {
            if (this.role.sr > 5000) {
                this.roleInst.sr = 5000;
            } else if (this.role.sr < 0) {
                this.roleInst.sr = 0;
            }
            await api.customs_api.changeRoleSr(
                this.custom.ID,
                this.role.role,
                this.role.sr
            )
            this.emitter.emit("updateLobby");
        },
    },
    computed: {
        editable: function () {
            return this.UserInfo.ID == this.custom.Creator.ID && this.isPerm("change_your_custom");
        }
    }
};
</script>

<style scoped>
.role {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
}

.role > p {
    text-align: center;
    margin: 0;
}

.innactive {
    filter: brightness(0.3);
}

.lobby_sr_input {
    width: 35px;
    background-color: #171e27;
    color: white;
    border: none;
    text-align: center;
    font-size: 16px;
    -moz-appearance: textfield;
}

.role_icon {
    display: block;
    margin-bottom: 1px;
    cursor: pointer;
}

p {
    font-size: 16px;
}
</style>
