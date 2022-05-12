<template>
    <div
        :class="{player: true, overDrag: dragCount != 0}"
        draggable="true"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragstart="onDragStart"
        @drop="onDrop"
        @dragover="onDragOver"
    >
        <div class="activeRole" :style="{ background: getColor() }">
            <div class="iconContainer">
                <img
                    :src="getRoleIco(PlayerRole)"
                    alt=""
                    class="selectedRole"
                    draggable="false"
                />
                <div class="roleWithRaiting">
                    <img
                        :src="getRankIco(getRoleSR())"
                        alt=""
                        class="rankIco"
                        draggable="false"
                    />
                    <p class="sr">{{ getRoleSR() }}</p>
                </div>
            </div>
        </div>
        <p class="username">{{ PlayerStatic.Username }}</p>
        <div class="roles">
            <img
                :src="role"
                alt=""
                v-for="(role, index) in getSecondsRoles()"
                :key="index"
                class="secondRole"
                draggable="false"
            />
            <img :src="getMainRole()" alt="" class="mainRole" draggable="false" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["PlayerStatic", "USettings", "PlayerRole", "PlayerTeam", "StaticID"],
    data(){
        return {
            dragCount: 0
        }
    },
    methods: {
        getColor() {
            if (this.PlayerTeam == 1) return this.USettings.fColor;
            return this.USettings.sColor;
        },
        getRankIco(sr) {
            switch (true) {
                case sr < 1500:
                    return "icons/bronse.png";
                case sr < 2000:
                    return "icons/silver.png";
                case sr < 2500:
                    return "icons/gold.png";
                case sr < 3000:
                    return "icons/plat.png";
                case sr < 3500:
                    return "icons/diamond.png";
                case sr < 4000:
                    return "icons/masters.png";
                default:
                    return "icons/gm.png";
            }
        },
        getRoleSR() {
            switch (parseInt(this.PlayerRole)) {
                case 0:
                    return this.PlayerStatic.TSR;
                case 1:
                    return this.PlayerStatic.DSR;
                case 2:
                    return this.PlayerStatic.HSR;
            }
        },
        getRoleIco(role) {
            let iconImages = {
                T: "icons/Tank1.png",
                D: "icons/Dps1.png",
                H: "icons/Heal1.png",
                0: "icons/Tank1.png",
                1: "icons/Dps1.png",
                2: "icons/Heal1.png",
            };
            return iconImages[role];
        },
        getMainRole() {
            if (this.PlayerStatic.Flex) return "icons/flex.png";
            return this.getRoleIco(this.PlayerStatic.Roles[0]);
        },
        getSecondsRoles() {
            let roles = [];
            if (this.PlayerStatic.Flex) return [];
            for (let i = 1; i < this.PlayerStatic.Roles.length; i++) {
                roles.push(this.getRoleIco(this.PlayerStatic.Roles[i]));
            }

            return roles.reverse();
        },
        onDragEnter(ev) {
            this.dragCount += 1
            ev.preventDefault();
        },
        onDragLeave(ev) {
            this.dragCount -= 1
            ev.preventDefault();
        },
        onDragOver(ev) {
            ev.preventDefault();
        },
        onDragStart(ev) {
            ev.dataTransfer.dropEffect = "move";
            ev.dataTransfer.setData("text/plain", this.StaticID);
            ev.dataTransfer.setDragImage(new Image(), 5000, 5000)
        },
        onDrop(ev) {
            this.dragCount = 0
            this.$el.classList.remove("overDrag");
            ev.preventDefault();
            console.log(ev.dataTransfer.getData("text"));
            this.emitter.emit("BalancerDragEnd", [
                parseInt(ev.dataTransfer.getData("text")),
                this.StaticID,
            ]);
            ev.dataTransfer.clearData();
        },
    },
};
</script>

<style>
@font-face {
    font-family: "TeamFont";
    src: url("/TeamFont.ttf");
}

.player {
    background-color: #161b22;
    width: 100%;
    height: 144px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: -2px;
}

.player:hover .username {
    text-decoration: underline #5f636e;
}

.username {
    font-family: TeamFont;
    font-size: 68px;
    flex-grow: 3;
    margin-left: 40px;
}
.activeRole {
    width: 110px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.iconContainer {
    position: relative;
    height: 110px;
    width: 90px;
}
.selectedRole {
    width: 90px;
    opacity: 0.3;
    position: absolute;
    top: 0;
    filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
}
.rankIco {
    width: 80px;
}
.roleWithRaiting {
    position: absolute;
    width: 90px;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.sr {
    font-family: TeamFont;
    font-size: 32px;
    text-shadow: 1px 1px 1px #000;
}
.mainRole {
    height: 60px;
    margin-right: 10px;
    opacity: 0.4;
}
.secondRole {
    height: 40px;
    opacity: 0.4;
}
.roles {
    height: max-content;
    display: flex;
    align-items: flex-end;
    gap: 3px;
}
.overDrag {
    background-color: #222631;
    box-sizing: border-box;
    border: inset 5px #5f636e;
}
</style>
