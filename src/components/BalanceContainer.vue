<template>
    <div class="balance_container">
        <img :src="imageSrc" alt="" id="balance_image" />
        <div
            :class="{
                balance_controlls: true,
                opacity_disable: !isPerm('do_balance'),
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

import axios from "axios"

export default {
    data: function () {
        return {
            imageSrc: "/static/img/balance_alt.png",
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
            this.updateImage();
        },
        async getBalances() {
            this.imageSrc = "/static/img/balance_load.png";
            let res = await axios.get("/api/profile/getBalances");
            let balance = res.data;
            if (balance["ok"] && balance.Balances.length > 0) {
                localStorage.setItem("balance", JSON.stringify(balance));
                localStorage.setItem("balance_index", 0);
                this.updateImage();
            } else {
                this.imageSrc = "/static/img/balance_404.png";
                if (localStorage.getItem("balance"))
                    localStorage.removeItem("balance");
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
            let balances = localStorage.getItem("balance");
            if (balances) {
                this.balanceLenght = JSON.parse(balances).Balances.length;
            } else {
                this.balanceLenght = 0;
            }
        },
    },
};
</script>