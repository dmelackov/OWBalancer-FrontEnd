<template>
    <div class="balance_container">
        <Balancer :Balance="currentBalance" v-if="this.imageSrc == null" />
        <img :src="this.imageSrc" alt="" v-if="this.imageSrc != null" id="balance_image" />
        <div v-if="isPerm('do_balance')" :class="{
            balance_controlls: true,
        }" class="balance_controlls">
            <div class="balance_controlls_left">
                <button class="btn balance_button" :class="{ load: loading }" id="balance_button" @click="getBalances">
                    Balance teams
                </button>
                <button class="btn copy_button btn-submit" id="copy_button" @click="copyBalance">
                    Copy
                </button>
                <button class="btn btn1" @click="firstTeamWin">
                    First Team Win
                </button>
                <button class="btn btn1" @click="secondTeamWin">
                    Second Team Win
                </button>
                <button class="btn btn1" @click="draw">
                    Draw
                </button>
            </div>
            <div class="balance_controlls_right">
                <button class="btn balance_button balance_button_left" @click="changeImageIndex(-1)">
                    ❮
                </button>
                <p class="balance_count">{{ currentImageIndex }}/{{ balanceLenght }}</p>
                <button class="btn balance_button balance_button_right" @click="changeImageIndex(1)">
                    ❱
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api"
import Balancer from "@/components/Balancer/Balancer.vue";
import * as domtoimage from "html-to-image";
import useLobbyState from "@/store/LobbyState";
import useLoginState from "@/store/LoginState";
import _ from "underscore"

export default {
    components: { Balancer },
    setup() {
        const { loading, Settings } = useLoginState()
        const { customs, updateLobbyState } = useLobbyState()
        return {
            loading,
            customs,
            Settings,
            updateLobbyState
        }
    },
    data: function () {
        return {
            imageSrc: "./img/balancer_placeholder/balance_alt.png",
            currentImageIndex: 0,
            balanceLenght: 0,
            currentBalance: {},
        };
    },
    methods: {
        async sendResult(firstTeamPoints, secondTeamPoints) {
            await api.game_api.sendResult(firstTeamPoints, secondTeamPoints, this.currentBalance.active, this.currentBalance.static)
            this.$notify({
                    title: "Result sendet to server",
                    type: "success",
                });
            this.updateLobbyState();
        },
        firstTeamWin() {
            this.sendResult(1, 0)
        },
        secondTeamWin() {
            this.sendResult(0, 1)
        },
        draw(){
            this.sendResult(1, 1)
        },
        changeImageIndex(diff) {
            let index = parseInt(localStorage.getItem("balance_index"));
            let newIndex = index + diff;
            if (newIndex < 0) return;
            if (newIndex >= this.balanceLenght) return;
            localStorage.setItem("balance_index", newIndex);
            this.setCurrentImageIndex();
            this.emitter.emit("updateBalanceImage");
        },
        async getBalances() {
            this.imageSrc = "/img/balancer_placeholder/balance_load.png";

            let playerAmount = this.Settings.Amount.D + this.Settings.Amount.H + this.Settings.Amount.T

            let customsIDs = []
            let randomCustomIDs = []
            for (let i = 0; i < this.customs.length; i++) {
                const custom = this.customs[i];
                if (custom.checkmark) {
                    customsIDs.push(custom.ID)
                } else {
                    randomCustomIDs.push(custom.ID)
                }
            }
            if (customsIDs.length + randomCustomIDs.length < playerAmount * 2) {
                this.$notify({ title: "Not enough players in lobby", type: "error" });
                this.imageSrc = "./img/balancer_placeholder/balance_alt.png"
                return
            }

            if (customsIDs.length > playerAmount * 2) {
                this.$notify({ title: "Too many checkmark", type: "error" });
                this.imageSrc = "./img/balancer_placeholder/balance_alt.png"
                return
            }

            customsIDs = customsIDs.concat(_.sample(randomCustomIDs, playerAmount * 2 - customsIDs.length))


            let balance = await api.profile_api.balance_api.getBalances(customsIDs);
            if (balance["result"] == 200) {
                localStorage.setItem("balance_static", JSON.stringify(balance.static));
                localStorage.setItem("balance_active", JSON.stringify(balance.active));
                localStorage.setItem("balance_index", 0);
                this.emitter.emit("updateBalanceImage");
            } else {
                this.imageSrc = "/img/balancer_placeholder/balance_404.png";
                this.$notify({ title: balance["status"], type: "error" });
                if (localStorage.getItem("balance_static"))
                    localStorage.removeItem("balance_static");
                if (localStorage.getItem("balance_active"))
                    localStorage.removeItem("balance_active");
                if (localStorage.getItem("balance_index"))
                    localStorage.removeItem("balance_index");
            }
            this.setBalanceLenght();
        },

        setCurrentImageIndex() {
            let index = localStorage.getItem("balance_index");
            if (index) {
                this.currentImageIndex = parseInt(index) + 1;
            } else {
                this.currentImageIndex = 0;
            }
        },

        setBalanceLenght() {
            let balances = localStorage.getItem("balance_active");
            if (balances) {
                this.balanceLenght = JSON.parse(balances).length;
            } else {
                this.balanceLenght = 0;
            }
        },
        updateImage() {
            let index = parseInt(localStorage.getItem("balance_index"));
            let balance_active = JSON.parse(localStorage.getItem("balance_active"));
            let balance_static = JSON.parse(localStorage.getItem("balance_static"));

            if (!balance_active) return;
            if (index === undefined) return;
            if (!balance_static) return;

            this.imageSrc = null;
            this.currentBalance.active = balance_active[index];
            this.currentBalance.static = balance_static;
        },
        async copyBalance() {
            let balance = document.getElementById("balance");
            let img = await domtoimage.toBlob(balance);
            // eslint-disable-next-line no-undef
            try {
                const item = new window.ClipboardItem({ "image/png": img });
                navigator.clipboard.write([item]);
                this.$notify({
                    title: "Balance success copy to clipboard",
                    type: "success",
                });
            } catch (error) {
                this.$notify({
                    title: "Unsupported browser",
                    type: "error",
                });
            }
        },
        updateBalanceImage() {
            this.setCurrentImageIndex();
            this.updateImage();
        },
        async balancerDragEnd(players) {
            if (players[0] == players[1]) return;
            let tempEl = this.currentBalance.static[players[0]];
            this.currentBalance.static[players[0]] = this.currentBalance.static[
                players[1]
            ];
            this.currentBalance.static[players[1]] = tempEl;
            let resData = await api.profile_api.balance_api.calcBalance(this.currentBalance)
            if (resData.status != 400) {
                return;
            }
            console.log(resData)
            this.currentBalance.active = resData;
        },
    },
    async created() {
        this.emitter.on("updateBalanceImage", this.updateBalanceImage);
        this.emitter.on("BalancerDragEnd", this.balancerDragEnd);
        this.setBalanceLenght();
        this.emitter.emit("updateBalanceImage");
    },
    unmounted() {
        this.emitter.off("updateBalanceImage", this.updateBalanceImage);
        this.emitter.off("BalancerDragEnd", this.balancerDragEnd);
    },
};
</script>

<style lang="scss" scoped>
.balance_container {
    margin-right: 50px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    width: 60%;

    .balance_controlls {
        border-radius: 6px;
        padding: 8px 16px;
        height: max-content;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;

        .balance_button {
            cursor: pointer;
            height: max-content;
            background-color: #11161d;
            border-radius: 6px;
            padding: 8px 32px;
            box-shadow: 0 1px 0 #3a4b68a8;

            &:hover {
                background-color: #242e3b;
            }

            &.load {
                filter: brightness(80%);
            }
        }

        .balance_controlls_right {
            display: flex;
            flex-wrap: nowrap;
            align-content: center;
            align-items: center;
            height: max-content;

            .balance_button_left .balance_button_right {
                padding-left: 20px;
                padding-right: 20px;
                margin: 0;
            }
            .balance_count {
                margin: 0 20px;
            }
        }

        .balance_controlls_left {
            display: flex;
            align-items: center;
            height: max-content;
            gap: 20px;

            .copy_button {
                cursor: pointer;
                height: max-content;
                border-radius: 6px;
                padding: 8px 32px;
                box-shadow: 0 1px 0 #082c0aa8;
            }

            .btn1 {
                cursor: pointer;
                height: max-content;
                border-radius: 6px;
                padding: 8px 32px;
                box-shadow: 0 1px 0 #3a4b68a8;

                &:hover {
                    background-color: #242e3b;
                }
            }

        }
    }
}

#balance_image {
    width: 100%;
}
</style>
