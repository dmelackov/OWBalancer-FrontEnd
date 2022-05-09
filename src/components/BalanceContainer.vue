<template>
    <div class="balance_container">
        <Balancer
            :Balance="currentBalance"
            :USettings="Settings"
            v-if="this.imageSrc == null"
        />
        <img
            :src="this.imageSrc"
            alt=""
            v-if="this.imageSrc != null"
            id="balance_image"
        />
        <div
            v-if="isPerm('do_balance')"
            :class="{
                balance_controlls: true,
            }"
            class="balance_controlls"
        >
            <div class="balance_controlls_left">
                <button
                    class="btn balance_button"
                    id="balance_button"
                    @click="getBalances"
                >
                    Balance teams
                </button>
            </div>
            <div class="balance_controlls_right">
                <button
                    class="btn balance_button"
                    id="balance_button_left"
                    @click="changeImageIndex(-1)"
                >
                    ❮
                </button>
                <p id="balance_count">{{ currentImageIndex }}/{{ balanceLenght }}</p>
                <button
                    class="btn balance_button"
                    id="balance_button_right"
                    @click="changeImageIndex(1)"
                >
                    ❱
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Balancer from "./Balancer.vue";

export default {
    components: { Balancer },
    data: function () {
        return {
            imageSrc: "./img/balance_alt.png",
            currentImageIndex: 0,
            balanceLenght: 0,
            currentBalance: {},
            Settings: {},
        };
    },
    methods: {
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
            this.imageSrc = "/img/balance_load.png";
            let res = await axios.get("/api/profile/balance/getBalances");
            let balance = res.data;
            if (balance["result"] == 200) {
                localStorage.setItem("balance_static", JSON.stringify(balance.static));
                localStorage.setItem("balance_active", JSON.stringify(balance.active));
                localStorage.setItem("balance_index", 0);
                this.emitter.emit("updateBalanceImage");
            } else {
                this.imageSrc = "/img/balance_404.png";
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
        async getValuesFromServer() {
            this.Settings = (await axios.get("/api/profile/settings/getSettings")).data;
        },
    },
    async created() {
        this.emitter.on("updateBalanceImage", () => {
            this.setCurrentImageIndex();
            this.updateImage();
        });
        this.emitter.on("BalancerDragEnd", async (players) => {
            if(players[0] == players[1]) return;
            let tempEl = this.currentBalance.static[players[0]]
            this.currentBalance.static[players[0]] = this.currentBalance.static[players[1]]
            this.currentBalance.static[players[1]] = tempEl
            let res = await axios.post("/api/profile/balance/calcBalance", this.currentBalance)
            console.log("DROP")
            if(res == false) {
                return
            }
            this.currentBalance.active = res.data;
        })
        this.setBalanceLenght();
        await this.getValuesFromServer();
        this.emitter.emit("updateBalanceImage");
    },
};
</script>

<style scoped>
@import "../assets/css/global.css";

.balance_container {
    margin-right: 50px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    width: 60%;
}

#balance_image {
    width: 100%;
}

.balance_controlls {
    border-radius: 6px;
    padding: 8px 16px;
    height: max-content;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
}

.balance_button {
    cursor: pointer;
    height: max-content;
    background-color: #11161d;
    border-radius: 6px;
    padding: 8px 32px;
    box-shadow: 0 1px 0 #3a4b68a8;
}

.balance_button:hover {
    background-color: #242e3b;
}

.balance_button::selection {
    background: transparent;
}

#balance_count {
    padding-left: 20px;
    padding-right: 20px;
    margin: 0;
}

#balance_count::selection {
    background: transparent;
}

.balance_controlls_right {
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    height: max-content;
}

.balance_controlls_left {
    display: flex;
    align-items: center;
    height: max-content;
}
.balance_controlls {
    padding: 8px 0;
}
</style>
