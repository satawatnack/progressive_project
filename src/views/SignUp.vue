<template>
    <div class="sign-up">
        <h3>Let's create a new account !</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <input type="text" v-model="name" placeholder="Firstname Lastname"><br>
        <input type="text" v-model="tel" placeholder="Phone Number"><br>
        <button @click="next">next</button>
        <span>or go back to <router-link to="login">login.</router-link></span>
    </div>
</template>

<script>
import firebase from 'firebase'
const fb = require('../firebaseConfig.js')
let usersRef = fb.db.ref('/users')

export default {
    name: 'signUp',
    data() {
        return {
            email: '',
            password: '',
            name: '',
            tel: ''
        }
    },
    methods: {
        next: function() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (result) =>  {
                    this.$router.replace('profileImg')
                    let data = {
                        uid: result.user.uid,
                        name: this.name,
                        tel: this.tel
                    }
                    usersRef.push(data)
                    console.log(result.user.uid)
                },
                (err) =>  {
                    alert('Oops. ' + err.message)
                }
            )
        }
    }
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