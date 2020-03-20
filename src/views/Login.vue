<template>
    <div class="login">
        <header class="masthead">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                <div class="col-12">
                    <b-row>
                        <b-col sm="6"><div style="height: 40%"></div><h3 style="color: #474747">JUSTRENT</h3><div style="height: 40px"></div></b-col>
                        <b-col sm="4">
                            <h3 style="color: 474745">Sign In</h3><br>
                            <input class="form-control" type="text" v-model="email" placeholder="Email">
                            <input class="form-control" type="password" v-model="password" placeholder="Password" v-on:keyup.enter="login"><br>
                            <button class="btn btn-dark" @click="login">Sign In</button> <p>or</p>
                            <button class="btn btn-primary" @click="socialFacecbookLogin">Facebook</button>
                            <button class="btn btn-danger" @click="socialGoogleLogin">Google</button>
                            <p>You don't have an account ? you can <router-link to="sign-up">create one</router-link></p>
                        </b-col>
                    </b-row>
                </div>
                </div>
            </div>
        </header>
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
    input {
        margin: 15px 0;
        padding: 15px;
    }
    p {
        margin-top: 10px;
        font-size: 13px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }
    .masthead {
        height: 100vh;
        min-height: 500px;
        background-image: url('../assets/bg.jpeg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>