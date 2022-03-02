<template>
    <div class="content">
        <RegisterForm style="margin-bottom: 15px"/>
        <Contacts />
    </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
import Contacts from "../components/Contacts.vue";

export default {
    components: {
        RegisterForm,
        Contacts
    },
};
</script>

<style scoped>
@import "../assets/css/global.css";
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.reg_button {
    color: #42556d;
}
</style>