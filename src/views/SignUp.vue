<template>
    <div class="sign-up">
        <h3>Let's create a new account !</h3>
        <input type="text" placeholder="Email" name="" id=""><br>
        <input type="password" placeholder="Password" name="" id=""><br>
        <button>Sign up</button>
        <span>or go back to <router-link to="login">login.</router-link></span>
    </div>
</template>

<script>
export default {
    name: 'signUp',
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped>
    .login {
        margin-top: 40px;
    }
    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 10px;
        font-size: 11px;
    }
</style>