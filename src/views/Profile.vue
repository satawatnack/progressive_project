<template>
  <div class="home" style="overflow:hidden;">
    <b-row class="text-center">
      <b-col></b-col>
      <b-col class="p-0 mt-3" cols="8">
        <b-img thumbnail fluid rounded :src=getUrl(userid) alt="Image 1" style="width: 60px;"></b-img>
        <div :key="key" v-for="(user, key) in users">
            <div v-if="updateKey === key">
                <div><input type="text" v-model="updateUser.name" placeholder="name"></div>
                <div><input type="text" v-model="updateUser.tel" placeholder="tel"></div>
                <div><button @click="updateThisUser(updateUser.name, updateUser.tel)">Save</button></div>
            </div>
            <div v-else-if="user.uid === userid">
                <div>{{user.name}}</div>
                <div>{{user.tel}}</div>
                <div>
                    <button @click="setUpdateUser(key, user)">Update Profile</button><br>
                </div>
            </div>
        </div>
        <Myfeeds></Myfeeds>
      </b-col>
      <b-col class="p-3">
        <button @click="logout">logout</button>
      </b-col>
  </b-row>

  </div>
</template>

<script>
import Myfeeds from '@/components/Myfeeds.vue'
const fb = require('../firebaseConfig.js')
let usersRef = fb.db.ref('/users')
export default {
  name: 'Profile',
  data() {
    return {
      userid: fb.auth.currentUser.uid,
      users: {},
      imgURL: '',
      updateKey: '',
      updateUser: {
          name: '',
          tel: '',
      }
    }
  },
  components: {
    Myfeeds
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
    setUpdateUser (key, user) {
        this.updateKey = key
        this.updateUser.name = user.name
        this.updateUser.tel = user.tel
    },
    updateThisUser (name, tel) {
        usersRef.child(this.updateKey).update({
            name: name,
            tel: tel
        })
        this.updateKey = ''
        this.updateUser.name = ''
        this.updateUser.tel = ''
    }
  },
  mounted () {
    usersRef.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
  }
}
</script>

