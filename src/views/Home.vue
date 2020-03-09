<template>
  <div class="home">
    <img :src=imgURL><br>
    <ul :key="key" v-for="(user, key) in users">
      <li>{{user.name}}</li>
      <li>{{user.tel}}</li>
      <li>{{user.uid}}</li>
    </ul>
    <h3>{{ userid }}</h3>
    <button @click="logout">logout</button>

  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
let usersRef = fb.db.ref('/users')
export default {
  name: 'Home',
  data() {
    return {
      userid: fb.auth.currentUser.uid,
      users: {},
      imgURL: 'https://firebasestorage.googleapis.com/v0/b/progressiveproj.appspot.com/o/profile%2F' + fb.auth.currentUser.uid + '?alt=media&token=9fff5e93-ba01-4153-b31a-26eebda1e1bb'
    }
  },
  methods: {
    logout: function() {
      fb.auth.signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  mounted () {
    usersRef.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
  }
}
</script>

