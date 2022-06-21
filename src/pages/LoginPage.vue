<template>
    <div class="content">
        <LoginForm style="margin-bottom: 15px"/>
        <router-link to="/register" class="reg_button">Registration</router-link>
        <Contacts />
    </div>
</template>

<script>
import LoginForm from "../components/Authorization/LoginForm.vue";
import Contacts from "../components/Authorization/Contacts.vue"

export default {
    components: {
        LoginForm,
        Contacts
    },
};
</script>

<style scoped>

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