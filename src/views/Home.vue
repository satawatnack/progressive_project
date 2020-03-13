<template>
  <div class="home" style="overflow:hidden;">
    <b-row class="text-center">
      <b-col></b-col>
      <b-col class="p-0 mt-3" cols="8">
        <Homefeeds></Homefeeds>
      </b-col>
      <b-col class="p-3">
        <b-img thumbnail fluid rounded :src=imgURL alt="Image 1" style="width: 60px;"></b-img>
        <div :key="key" v-for="(user, key) in users">
            <p class="m-2" v-if="user.uid === userid">welcome <br>{{user.name}}</p>
        </div>
        <button @click="logout">logout</button>
      </b-col>
  </b-row>

  </div>
</template>

<script>
import Homefeeds from '@/components/Homefeeds.vue'
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
  components: {
    Homefeeds
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

