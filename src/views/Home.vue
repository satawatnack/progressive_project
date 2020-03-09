<template>
  <div class="home">
     <b-img thumbnail fluid rounded :src=imgURL alt="Image 1" style="width: 100px;"></b-img>
    <ul :key="key" v-for="(user, key) in users">
        <li v-if="user.uid === userid">welcome {{user.name}}</li>
    </ul>
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
      imgURL: 'https://firebasestorage.googleapis.com/v0/b/progressiveproj.appspot.com/o/profile%2F' + fb.auth.currentUser.uid + '?alt=media&token=9fff5e93-ba01-4153-b31a-26eebda1e1bb',
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

