<template>
    <div class="balance_container">
        <img :src="imageSrc" alt="" id="balance_image" />
        <div
            v-if="isPerm('do_balance')"
            :class="{
                balance_controlls: true,
            }"
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
                <p id="balance_count">
                    {{ currentImageIndex }}/{{ balanceLenght }}
                </p>
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

export default {
    data: function () {
        return {
            imageSrc: "./img/balance_alt.png",
            currentImageIndex: 0,
            balanceLenght: 0,
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
            this.$notify({title: "Vue 3 notification 🎉", type: "warn"})
            this.$notify({title: "Vue 3 notification 🎉", type: "error"})
            this.$notify({title: "Vue 3 notification 🎉", type: "success"})
            this.$notify({title: "Vue 3 notification 🎉", type: "info"})
            this.imageSrc = "/img/balance_load.png";
            let res = await axios.get("/api/profile/getBalances");
            let balance = res.data;
            if (balance["ok"]) {
                localStorage.setItem(
                    "balance_static",
                    JSON.stringify(balance.static)
                );
                localStorage.setItem(
                    "balance_active",
                    JSON.stringify(balance.active)
                );
                localStorage.setItem("balance_index", 0);
                this.emitter.emit("updateBalanceImage");
            } else {
                this.imageSrc = "/img/balance_404.png";
                if (localStorage.getItem("balance_static"))
                    localStorage.removeItem("balance_static");
                if (localStorage.getItem("balance_active"))
                    localStorage.removeItem("balance_active");
                if (localStorage.getItem("balance_index"))
                    localStorage.removeItem("balance_index");
            }
            this.setCurrentImageIndex();
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
        async updateImage() {
            let index = parseInt(localStorage.getItem("balance_index"));
            let balance_active = JSON.parse(localStorage.getItem("balance_active"));
            let balance_static = JSON.parse(localStorage.getItem("balance_static"));
            if (!balance_active) return;
            if (!index) return;
            if (!balance_static) return;
            let current_balance = balance_active["balance_active"][index];
            let image = await axios.post(
                "/api/profile/balanceImage",
                {
                    active: current_balance,
                    static: balance_static,
                    theme:
                        localStorage.getItem("theme") != null
                            ? parseInt(localStorage.getItem("theme"))
                            : 0,
                },
                { responseType: "blob" }
            );
            let imageBlob = image.data;
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(imageBlob);
            this.imageSrc = imageUrl;
        },
    },
    created() {
        this.updateImage();
        this.setCurrentImageIndex();
        this.setBalanceLenght();
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
</style>