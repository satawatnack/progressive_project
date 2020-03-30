<template>
  <div class="home" style="overflow:hidden;">
    <Navbar></Navbar>
    <b-row>
      <b-col class="selectBarDiv"><br>
        <div align="left" class="fixed p-4 seletbar">
          <div class="mb-3 select" style="width': '30px';cursor: pointer;" @click="sendSelectType ('')"> all</div>
          <img class="mb-3 select" :style="[selectType=='camera' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('camera')" src="../assets/icons/camera.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='watch' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('watch')" src="../assets/icons/watch.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='bag' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('bag')" src="../assets/icons/bag.png" alt=""><br>
          <img class="mb-2 select" :style="[selectType=='book' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('book')" src="../assets/icons/book.png" alt=""><br>
          <img class="mb-2 select" :style="[selectType=='bicycle' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('bicycle')" src="../assets/icons/bike.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='motorcycle' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('motorcycle')" src="../assets/icons/motorcycle.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='car' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('car')" src="../assets/icons/car.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='land' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('land')" src="../assets/icons/land.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='house' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('house')" src="../assets/icons/home.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='condominium' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('condominium')" src="../assets/icons/condominium.png" alt=""><br>
          <img class="mb-3 select" :style="[selectType=='apartment' ? { 'margin-left': '15px' } : { 'margin-left': '0px' }]" @click="sendSelectType ('apartment')" src="../assets/icons/apartment.png" alt=""><br>
          <div class="mb-3 select"  style="width: 30px;cursor: pointer;" @click="sendSelectType ('other')">others</div>
        </div>
      </b-col>
      <b-col class="p-0 mt-3 m-4" sm="3">
        <CreatePost></CreatePost>
        <h3 class="panel-title mt-5 mb-5">RENT ANYTHING. <br>FROM ANYONE.</h3><hr>
        <div class="selectBarDivPhone mb-4" align="center"><br>
            <div class="selectPhone" style="width': '30px';cursor: pointer;" @click="sendSelectType ('')"> all</div>
            <img class="selectPhone" :style="[selectType=='camera' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('camera')" src="../assets/icons/camera.png" alt="">
            <img class="selectPhone" :style="[selectType=='watch' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('watch')" src="../assets/icons/watch.png" alt="">
            <img class="selectPhone" :style="[selectType=='bag' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('bag')" src="../assets/icons/bag.png" alt="">
            <img class="selectPhone" :style="[selectType=='book' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('book')" src="../assets/icons/book.png" alt="">
            <img class="selectPhone" :style="[selectType=='bicycle' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('bicycle')" src="../assets/icons/bike.png" alt="">
            <img class="selectPhone" :style="[selectType=='motorcycle' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('motorcycle')" src="../assets/icons/motorcycle.png" alt="">
            <img class="selectPhone" :style="[selectType=='car' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('car')" src="../assets/icons/car.png" alt="">
            <img class="selectPhone" :style="[selectType=='land' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('land')" src="../assets/icons/land.png" alt="">
            <img class="selectPhone" :style="[selectType=='house' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('house')" src="../assets/icons/home.png" alt="">
            <img class="selectPhone" :style="[selectType=='condominium' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('condominium')" src="../assets/icons/condominium.png" alt="">
            <img class="selectPhone" :style="[selectType=='apartment' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('apartment')" src="../assets/icons/apartment.png" alt="">
            <div class="selectPhone m-3"  style="width: 30px;cursor: pointer;" @click="sendSelectType ('other')">others</div>
        </div>
        <Newfeeds v-bind:searchType="selectType"></Newfeeds>
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
.home{
  background-color: #f0f2f5;
}
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
.selectBarDivPhone{
  display: none;
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
  .selectBarDiv{
    display: none;
  }
  .profileDiv{
    display: none;
  }
  .selectBarDivPhone{
    display: block;
  }
  .selectBarDivPhone {
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
    z-index: 1;
    background: inherit;
    overflow: hidden;
    border-radius: 20px;
  }
  .selectBarDivPhone:before {
    content: "";
    background: inherit;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(10px);
    border-radius: 20px;
  }
  .selectPhone{
    width: 25px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    font-size: 13px;
    margin:10px;
  }
  .selectPhone:hover {
    transform: scale(1.4);
  }
}
</style>