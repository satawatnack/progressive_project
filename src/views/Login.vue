<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Login</button>
        <button @click="socialFacecbookLogin">Facebook</button>
        <button @click="socialGoogleLogin">Google</button>
        <p>You don't have an account ? you can <router-link to="sign-up">create one</router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (result) => {
                    console.log(result.user.email)
                    console.log(result.user.uid)
                    this.$router.replace('home')
                },
                (err) => {
                    alert('Oops ' + err.mesage)
                }
            )
        },
        socialFacecbookLogin: function() {
            const provide = new firebase.auth.FacebookAuthProvider();
            firebase
                .auth()
                .signInWithPopup(provide)
                .then(result => {
                    this.$router.replace('home')
                    console.log(result.additionalUserInfo.profile.id)
                })
                .catch(err => {
                    alert("Oops. " + err.message)
                });
        },
        socialGoogleLogin: function() {
            const provide = new firebase.auth.GoogleAuthProvider().addScope("email");
            firebase
                .auth()
                .signInWithPopup(provide)
                .then(result => {
                    this.$router.replace('home')
                    console.log(result.additionalUserInfo.profile.name)
                    console.log(result.additionalUserInfo.profile.picture)
                    console.log(result.user.uid)
                })
                .catch(err => {
                    alert("Oops. " + err.message)
                });
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
    p {
        margin-top: 40px;
        font-size: 13px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }
</style>