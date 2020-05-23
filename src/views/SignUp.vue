<template>
  <header class="masthead">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12">
          <b-row>
            <b-col sm="6">
              <div class="m-5"><h3 style="color: #474747">JUSTRENT</h3><hr></div>
            </b-col>
            <b-col sm="4">
              <h4>Let's create a new account !</h4><br>
              <input class="form-control" type="text" v-model="email" placeholder="Email">
              <input class="form-control" type="password" v-model="password" placeholder="Password">
              <input class="form-control" type="text" v-model="name" placeholder="Firstname Lastname">
              <input class="form-control" type="text" v-model="tel" placeholder="Phone Number">
              <span v-if="msg">*{{msg}}</span><br>
              <button v-if="msg" class="btn btn-light" disabled @click="next">next</button>
              <button v-else class="btn btn-light" @click="next">next</button><br>
              <p>or go back to <router-link to="login">login.</router-link></p>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </header>
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
  computed: {
    msg () {
      if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) return 'Invalid Email Address'
      else if (this.password.length < 8 || !this.password) return 'your password must more than 7'
      else if (!this.name) return 'you must have name'
      else if (!this.password) return 'you must have phone number'
      else if (this.tel.length < 10 || !this.tel) return 'your phone number must be 10 numbers'
      else if (isNaN(this.tel)) return 'your phone number must be numeric'
      else return ''
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
input {
  margin: 15px 0;
  padding: 20px;
}
button {
  margin-top: 20px;
  cursor: pointer;
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