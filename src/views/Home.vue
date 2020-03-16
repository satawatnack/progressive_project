<template>
  <div class="home" style="overflow:hidden;">
    <Navbar></Navbar>
    <b-row class="text-center">
      <b-col></b-col>
      <b-col class="p-0 mt-3" cols="8">
        <Homefeeds></Homefeeds>
      </b-col>
      <b-col class="p-3">
        <b-img thumbnail fluid rounded :src=getUrl(userid) alt="Image 1" style="width: 100px;"></b-img>
        <div :key="key" v-for="(user, key) in users">
            <p class="m-2" v-if="user.uid === userid"><b>welcome</b> <br>{{user.name}}</p>
        </div>
        <button class="btn btn-danger" @click="logout">logout</button>
      </b-col>
  </b-row>

  </div>
</template>

<script>
import Homefeeds from '@/components/Homefeeds.vue'
import  Navbar from '@/components/Navbar.vue'
const fb = require('../firebaseConfig.js')
let usersRef = fb.db.ref('/users')
export default {
  name: 'Home',
  data() {
    return {
      userid: fb.auth.currentUser.uid,
      users: {},
      imgURL: ''
    }
  },
  components: {
    Homefeeds,
    Navbar
  },
  methods: {
    logout: function() {
      fb.auth.signOut().then(() => {
        this.$router.replace('login')
      })
    },
    getUrl (uid) {
        fb.storage.ref('profile/' + uid).getDownloadURL().then((url) => {
            this.imgURL = url
        })
        return this.imgURL
    }
  },
  mounted () {
    usersRef.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
  }
}
</script>

