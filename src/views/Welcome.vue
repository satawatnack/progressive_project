<template>
  <div class="home" style="overflow:hidden;">
    <Navbar></Navbar>
    <b-row>
      <SelectBar :selectType="selectType" @clicked="sendSelectType"></SelectBar>
      <b-col class="p-0 mt-3 m-4" sm="6">
        <b-button @click="login" variant="light">Login</b-button>
        <h3 class="panel-title mt-5 mb-5">RENT ANYTHING. <br>FROM ANYONE.</h3><hr>
        <SelectBarPhone :selectType="selectType" @clicked="sendSelectType"></SelectBarPhone>
        <b-row class="justify-content-md-center">
          <b-col sm="7">
            <Newfeeds v-bind:searchType="selectType"></Newfeeds>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import  Navbar from '@/components/Navbar.vue'
import Newfeeds from '@/components/Newfeeds.vue'
import SelectBar from '@/components/SelectBar.vue'
import SelectBarPhone from '@/components/SelectBarPhone.vue'

const fb = require('../firebaseConfig.js')
let usersRef = fb.db.ref('/users')

export default {
  name: 'Home',
  data() {
    return {
      users: {},
      imgURL: '',
      selectType: ''
    }
  },
  components: {
    Navbar,
    Newfeeds,
    SelectBar,
    SelectBarPhone
  },
  methods: {
    login () {
        if(fb.auth.currentUser) this.$router.replace('home')
        else this.$router.replace('login')
    },
    getUrl (uid) {
        fb.storage.ref('profile/' + uid).getDownloadURL().then((url) => {
            this.imgURL = url
        })
        return this.imgURL
    },
    sendSelectType (type) {
      this.selectType = type
    }
  },
  mounted () {
    usersRef.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
  }
}
</script>

<style scoped>
.home{
  background-color: #f0f2f5;
}
</style>