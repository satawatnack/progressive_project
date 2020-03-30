<template>
  <div class="profile" style="overflow:hidden;">
    <Navbar></Navbar>
    <b-row class="text-center">
      <b-col></b-col>
      <b-col class="p-0 mt-3 m-4" sm="3">
        <div>
          <b-img v-if="uploadEnd" thumbnail fluid rounded :src="downloadURL" alt="Image" style="width: 350px;"></b-img>
          <b-img v-else thumbnail fluid rounded :src=getUrl(userid) alt="Image" style="width: 300px;"></b-img>
        </div><br>
        <div>
            <v-btn class="btn btn-secondary"
            @click.native="selectFile">
                change a profile picture
            </v-btn>
            <form ref="form">
            <input
            id="files"
            style="display: none"
            type="file"
            name="file"
            ref="uploadInput"
            accept="image/*"
            :multiple="false"
            @change="detectFiles($event)" />
            </form>
        </div><br>
        <div :key="key" v-for="(user, key) in users">
            <div v-if="updateKey === key">
              <div class="form-group row mt-4">
                <label for="name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="name" v-model="updateUser.name" placeholder="name">
                </div>
              </div>
              <div class="form-group row mt-4">
                <label for="tel" class="col-sm-2 col-form-label">Tel</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="tel" v-model="updateUser.tel" placeholder="tel">
                </div>
              </div>
              <div><b-button @click="updateThisUser(updateUser.name, updateUser.tel)" variant="primary">Save</b-button></div>
            </div>
            <div v-else-if="user.uid === userid">
                <div>Hi , {{user.name}}</div>
                <div>{{user.tel}}</div><br>
                <div>
                    <b-button @click="setUpdateUser(key, user)" variant="light">Update Profile</b-button><button class="btn btn-danger ml-2" @click="logout">logout</button>
                </div>
            </div>
        </div>
        <Myfeeds></Myfeeds>
      </b-col>
      <b-col>
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

<style scoped>
.profile{
  background-color: #f0f2f5;
}
</style>