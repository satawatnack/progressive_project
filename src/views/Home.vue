<template>
  <div class="home" style="overflow:hidden;">
    <Navbar></Navbar>
    <b-row>
      <b-col><br>
        <div align="left" class="fixed p-4 seletbar">
          <div class="mb-3 select" style="width': '30px';cursor: pointer;" @click="sendSelectType ('')"> all</div>
          <img class="mb-3 select" :style="[selectType=='camera' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('camera')" src="../assets/icons/camera.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='watch' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('watch')" src="../assets/icons/watch.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='bag' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('bag')" src="../assets/icons/bag.png" alt=""><br>
          <img class="mb-2 select" :style="[selectType=='book' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('book')" src="../assets/icons/book.png" alt=""><br>
          <img class="mb-2 select" :style="[selectType=='bike' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('bike')" src="../assets/icons/bike.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='motorcycle' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('motorcycle')" src="../assets/icons/motorcycle.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='car' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('car')" src="../assets/icons/car.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='land' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('land')" src="../assets/icons/land.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='house' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('house')" src="../assets/icons/home.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='condominium' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('condominium')" src="../assets/icons/condominium.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='apartment' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('apartment')" src="../assets/icons/apartment.png" alt=""><br>
          <div class="mb-3 select"  style="width: 30px;cursor: pointer;" @click="sendSelectType ('other')">others</div>
        </div>
      </b-col>
      <b-col class="p-0 mt-3" cols="8">
        <CreatePost></CreatePost>
        <Newfeeds v-bind:searchType="selectType"></Newfeeds>
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
import CreatePost from '@/components/CreatePost.vue'
import  Navbar from '@/components/Navbar.vue'
import Newfeeds from '@/components/Newfeeds.vue'
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
    Newfeeds
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
.fixed {
  position:fixed;
  top:150px;
}
.seletbar {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
  z-index: 1;
  background: inherit;
  overflow: hidden;
  width: 80px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.seletbar:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
  filter: blur(10px);
  margin: -20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.select {
  width: 25px;
  cursor: pointer;
  transition: all .2s ease-in-out;
  font-size: 13px;
}
.select:hover {
  transform: scale(1.4);
}
@media only screen and (max-width: 500px) {
  .seletbar{
    width: 30px;
    padding-left: 15px !important;
    padding-right: 43px !important;
  }
  .seletbar:before {
    width: 30px;
    padding-left: 0px;
  }
  .select {
    width: 20px;
    font-size: 12px;
  }
}
</style>