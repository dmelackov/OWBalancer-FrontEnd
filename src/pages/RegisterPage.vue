<template>
    <div class="content">
        <RegisterForm style="margin-bottom: 15px"/>
        <Contacts />
    </div>
</template>

<script>
import RegisterForm from "../components/Authorization/RegisterForm.vue";
import Contacts from "../components/Authorization/Contacts.vue";

export default {
    components: {
        RegisterForm,
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