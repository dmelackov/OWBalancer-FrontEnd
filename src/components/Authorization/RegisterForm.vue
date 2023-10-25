<template>
    <div class="login_form">
        <div class="title">
            <p>Registration</p>
        </div>
        <div class="form" @submit.prevent="submit">
            <form class="form" action="" name="register_form">
                <p>
                    <input
                        class="field form-control custom_input"
                        id="login"
                        name="login"
                        placeholder="Login"
                        required=""
                        type="text"
                        v-model="form.login"
                    />
                </p>
                <p>
                    <input
                        class="field form-control custom_input"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required=""
                        type="password"
                        v-model="form.password"
                    />
                </p>
                <p>
                    <input
                        class="field form-control custom_input"
                        id="password_again"
                        name="password_again"
                        placeholder="Repeat password"
                        required=""
                        type="password"
                        v-model="form.repeat_password"
                    />
                </p>
                <p>
                    <input
                        class="btn btn-submit custom_input"
                        id="submit"
                        name="submit"
                        type="submit"
                        value="Enter"
                    />
                </p>
                <p class="form_error" v-if="form_error.length != 0">
                    {{ form_error }}
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import api from "@/api";
export default {
    data() {
        return {
            form: {
                login: "",
                password: "",
                repeat_password: "",
            },
            form_error: "",
        };
    },

    methods: {
        async submit() {
            this.form_error = "";
            let ResData = await api.profile_api.auth_api.registration(
                this.form.login,
                this.form.password,
                this.form.repeat_password
            );
            if (ResData.status == 200) {
                this.$router.push("/login");
            } else {
                if (ResData.status == 400 && ResData.message) {
                    this.form_error = ResData.message;
                }
            }
        },
    },
};
</script>

<style scoped>
p {
    margin: 0;
}
.title {
    margin-bottom: 20px;
}
.login_form {
    width: max-content;
    height: max-content;
    border-radius: 6px;
    padding: 20px;
    background-color: #11161d;
}

.login_form > .title > p {
    text-align: center;
    font-size: 25px;
}

#submit {
    margin-left: auto;
    margin-right: auto;
    display: block;
}

.error-message {
    font-size: 11px;
}

.error {
    border: solid 1px #a30000 !important;
}

input.error {
    border: solid 1px #da0000;
}

.form_error {
    color: #da0000;
    font-size: 12px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
