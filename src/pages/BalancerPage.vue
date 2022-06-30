<template>
    <div class="content">
        <PlayerColumn />
        <LobbyColumn />
        <BalanceContainer />
    </div>
    <CustomSelectContainer />
    <PlayerEditMenu />
</template>

<script>
import LobbyColumn from "../components/Lobby/LobbyColumn.vue";
import PlayerColumn from "../components/Players/PlayerColumn.vue";
import CustomSelectContainer from "../components/Players/CustomSelectContainer.vue";
import BalanceContainer from "../components/Balancer/BalanceContainer.vue";
import PlayerEditMenu from "../components/Players/PlayerEditMenu.vue";

export default {
    components: {
        LobbyColumn,
        PlayerColumn,
        CustomSelectContainer,
        BalanceContainer,
        PlayerEditMenu,
    },
    data() {
        return { perms: [] };
    },
    created() {
        document.body.addEventListener("mousedown", (e) => {
            if (!e.target.closest(".customSelect")) {
                this.emitter.emit("closeCustomMenu");
            }
        });
    },
    methods: {},
};
</script>

<style scoped>
.content {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>
