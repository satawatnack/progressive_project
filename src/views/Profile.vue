<template>
  <div class="home" style="overflow:hidden;">
    <Navbar></Navbar>
    <b-row class="text-center">
      <b-col></b-col>
      <b-col class="p-0 mt-3" cols="8">
        <b-img thumbnail fluid rounded :src=getUrl(userid) alt="Image 1" style="width: 350px;"></b-img>
        <div>
            <v-btn class="btn btn-secondary"
            @click.native="selectFile">
                change a profile image
            </v-btn>
            <form ref="form">
            <input
            id="files"
            type="file"
            name="file"
            ref="uploadInput"
            accept="image/*"
            :multiple="false"
            @change="detectFiles($event)" />
            </form>
        </div>
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
        <button class="btn btn-danger" @click="logout">logout</button>
      </b-col>
  </b-row>

  </div>
</template>

<script>
import Myfeeds from '@/components/Myfeeds.vue'
import  Navbar from '@/components/Navbar.vue'
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
      },
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: ''
    }
  },
  components: {
    Myfeeds,
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
    },
    selectFile () {
      this.$refs.uploadInput.click()
    },
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = fb.storage.ref('profile/' + fb.auth.currentUser.uid).put(file)
    }
  },
  mounted () {
    usersRef.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
  },
  watch: {
    uploadTask: function () {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.uploadEnd = true
          this.downloadURL = downloadURL
          this.$emit('downloadURL', downloadURL)
        })
      })
    }
  }
}
</script>

