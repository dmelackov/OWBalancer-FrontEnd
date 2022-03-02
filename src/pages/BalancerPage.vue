<template>
    <div class="content">
        <PlayerColumn />
        <LobbyColumn />
        <BalanceContainer />
    </div>
    <CustomSelectContainer />
</template>

<script>
import LobbyColumn from "../components/LobbyColumn.vue";
import PlayerColumn from "../components/PlayerColumn.vue";
import CustomSelectContainer from "../components/CustomSelectContainer.vue";
import BalanceContainer from "../components/BalanceContainer.vue";

export default {
    components: {
        LobbyColumn,
        PlayerColumn,
        CustomSelectContainer,
        BalanceContainer,
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
@import "../assets/css/global.css";
.content {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>