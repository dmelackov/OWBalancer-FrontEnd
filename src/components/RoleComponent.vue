<template>
    <div class="role">
        <img
            :src="'/static/img/' + role.role + '_icon.png'"
            alt=""
            width="30"
            :class="{
                role_icon: true,
                innactive: !role.active,
            }"
            @click="toggleRole(role.role)"
        />
        <input type="number" v-model="role.sr" class="lobby_sr_input" @onFocus="this.select()" @keydown.enter="this.blur()" />
        <p v-if="!custom.editable">{{ role.sr }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["role", "custom"],
    data() {
        return {};
    },
    methods: {
        async toggleRole(ARGrole) {
            let newRoleStr = "";
            let roleIndex;
            for (roleIndex in this.custom.Roles) {
                let role = this.custom.Roles[roleIndex];
                let tempActive = role.active;
                if (role.role == ARGrole) tempActive = !tempActive;
                if (tempActive) newRoleStr += role.role;
            }
            await axios.post("/api/players/setRoles", {
                id: this.custom.ID,
                roles: newRoleStr,
            });
            this.eventBus.$emit("updateLobby");
        },
    },
};
</script>

<style scoped>
@import "../assets/css/global.css";

.role {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: center
}

.role>p {
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

</style>