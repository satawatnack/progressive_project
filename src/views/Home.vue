<template>
  <div class="home" style="overflow:hidden;">
    <Navbar></Navbar>
    <b-row>
      <SelectBar :selectType="selectType" @clicked="sendSelectType"></SelectBar>
      <b-col class="p-0 mt-3 m-4" sm="6">
        <CreatePost></CreatePost>
        <h3 class="panel-title mt-5 mb-5">RENT ANYTHING. <br>FROM ANYONE.</h3><hr>
        <SelectBarPhone :selectType="selectType" @clicked="sendSelectType"></SelectBarPhone>
        <b-row class="justify-content-md-center">
          <b-col sm="7">
            <Newfeeds v-bind:searchType="selectType"></Newfeeds>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="p-3 mt-3 profileDiv">
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
import CreatePost from '@/components/CreatePost.vue'
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
      userid: fb.auth.currentUser.uid,
      users: {},
      imgURL: '',
      selectType: ''
    }
  },
  components: {
    CreatePost,
    Navbar,
    Newfeeds,
    SelectBar,
    SelectBarPhone
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