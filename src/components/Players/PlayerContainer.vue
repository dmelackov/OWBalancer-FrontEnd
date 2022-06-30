<template>
    <div
        :class="{ player_container: true, active: active }"
        @click="openCustomsMenu"
        @contextmenu="openPlayerEdit"
    >
        <nav class="player_inner_container">
            <p class="player_username">
                {{ player.Username }}
            </p>
            <div class="right">
                <p class="cursor">→</p>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
    props: ["player", "index"],
    data() {
        return {
            active: false,
        };
    },
    methods: {
        openCustomsMenu() {
            if (!this.isPerm("add_customs_tolobby")) return;
            this.active = true;
            this.emitter.emit("openCustomMenu", this);
        },
        openPlayerEdit(e) {
            this.emitter.emit("openPlayerEditMenu", this.player)
            e.preventDefault();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/playerContainer.css";

.cursor {
    font-size: 22px;
    color: #445368;
    &::selection {
        background: transparent;
    }
}
</style>
