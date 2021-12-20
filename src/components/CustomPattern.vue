<template>
    <div class="player_container" @click="addToLobby">
        <div class="player_inner_container">
            <p class="player_username">{{ custom.Username }}</p>
            <div class="sr">
                <div class="sr_icon">
                    <img
                        src="/static/img/T_icon.png"
                        alt=""
                        width="12"
                        :class="{
                            innactive: !custom.Roles.Tank,
                            role_icon: true,
                        }"
                    />
                    <img
                        src="/static/img/D_icon.png"
                        alt=""
                        width="12"
                        :class="{
                            innactive: !custom.Roles.Damage,
                            role_icon: true,
                        }"
                    />
                    <img
                        src="/static/img/H_icon.png"
                        alt=""
                        width="12"
                        :class="{
                            innactive: !custom.Roles.Heal,
                            role_icon: true,
                        }"
                    />
                </div>

                <div class="sr_numbers">
                    <p>{{ custom.SR.Tank }}</p>
                    <p>{{ custom.SR.Damage }}</p>
                    <p>{{ custom.SR.Heal }}</p>
                </div>
            </div>
            <p class="author-left">by {{ custom.Author.username }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["custom"],
    methods: {
        async addToLobby() {
            this.eventBus.$emit("closeCustomMenu");
            await axios.post("/api/lobby/addToLobby", {
                id: this.custom.CustomID,
            });
            this.eventBus.$emit("updateLobby");

        },
    },
    created() {
        console.log(this.custom)
    }
};
</script>

<style scoped>
@import "../assets/css/global.css";

.player_inner_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    border-radius: 12px;
    min-height: 50px;
    width: 100%;
    cursor: pointer;
    padding: 6px 12px;
    box-sizing: border-box;
}

.player_container {
    background-color: #171e27;
    border-radius: 12px;
    border: solid 1px #444444;
}

.player_inner_container:hover {
    background-color: #242e3b;
}


.sr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.sr_icon {
    margin-left: 2px;
    padding-top: 7px;
}

.role_icon {
    display: block;
    margin-bottom: 1px;
    cursor: pointer;
}

.sr_numbers {
    display: inline-block;
    line-height: 1px;
    font-size: 12px;
}


.author-left {
    position: absolute;
    color: #3b4b5f;
    bottom: 4px;
    left: 12px;
    width: max-content;
    margin: 0;
    font-size: 12px;
}
</style>