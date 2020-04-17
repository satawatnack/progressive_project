<template>
  <div>
    <div class="panel panel-default">
      <div v-if="!show" class="mt-3">
        <b-button v-on:click="show = true" variant="light">Create Post</b-button>
      </div>
      <div v-else>
        <div class="panel-heading">
          <h3 class="panel-title mt-3 mb-4">Add New Posts</h3>
        </div>
        <div class="panel-body">
          <form id="form" class="form" v-on:submit.prevent="addPost">
            <b-row>
              <b-col sm="6">
                <div class="form-group row mt-4">
                  <label for="postTitle" class="col-sm-2 col-form-label">Title</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="postTitle" v-model="newPost.title" placeholder="title">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="postType" class="col-sm-2 col-form-label">Type</label>
                  <div class="col-sm-10">
                    <select v-model="selected" class="form-control">
                      <option v-for="option in options" v-bind:value="option.value" :disabled="option.disabled" :key="option.value">
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="postStatus" class="col-sm-2 col-form-label">Status</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="postStatus" v-model="newPost.status" placeholder="status">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="postPrice" class="col-sm-2 col-form-label">Price</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="postPrice" v-model="newPost.price" placeholder="price">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="location" class="col-sm-2 col-form-label">location</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="location" v-model="newPost.location" placeholder="location">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="postDetail" class="col-sm-2 col-form-label">Detail</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="5" id="postDetail" v-model="newPost.detail" placeholder="detail"></textarea>
                  </div>
                </div>
              </b-col>
              <b-col sm="6">
                <b-img class="mb-3 postImg" v-if="uploadEnd" thumbnail fluid rounded :src="downloadURL" alt="Image"></b-img>
                <b-img class="mb-3 postImg" v-else thumbnail fluid rounded :src="require('../assets/defult.jpg')" alt="Image"></b-img>
                <v-btn class="btn btn-secondary"
                  @click.native="selectFile"
                  v-if="!uploadEnd && !uploading">
                    Upload image
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
                <div v-if="uploadEnd">
                  <v-btn
                      class="ma-0 btn btn-danger"
                      dark
                      small
                      color="error"
                      @click="deleteImage()"
                      >
                      Cancel
                  </v-btn>
                </div>
              </b-col>
            </b-row>
            <input type="submit" class="btn btn-primary mt-3" value="Add Post">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
let postsRef = fb.db.ref('/posts')
let usersRef = fb.db.ref('/users')

export default {
  name: 'homefeeds',
  data () {
    return {
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: '',
      uid: fb.auth.currentUser.uid,
      newPost: {
          title: '',
          type: '',
          status: '',
          time: '',
          imageTime: '',
          image: false,
          location: '',
          price: '',
          detail: '',
          uid: fb.auth.currentUser.uid
      },
      posts: {},
      imgUrl: '',
      users: {},
      loading: false,
      color: 'black',
      size: '20px',
      selected: '',
      options: [
        { text: 'Please select one', value: '', "disabled": true,},
        { text: 'camara', value: 'camara' },
        { text: 'watch', value: 'watch' },
        { text: 'bag', value: 'bag' },
        { text: 'book', value: 'book' },
        { text: 'bicycle', value: 'bicycle' },
        { text: 'motorcycle', value: 'motorcycle' },
        { text: 'car', value: 'car' },
        { text: 'land', value: 'land' },
        { text: 'house', value: 'house' },
        { text: 'condominium', value: 'condominium' },
        { text: 'apartment', value: 'apartment' },
        { text: 'other', value: 'other' }
      ],
      show: false
    }
  },
  methods: {
    addPost () {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      const dateTime = date +' '+ time
      this.newPost.time = dateTime
      this.newPost.type = this.selected
      if(!this.newPost.imageTime) {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const dateTime = date +' '+ time
        this.newPost.imageTime = dateTime
        this.newPost.image = false
      }
      postsRef.push(this.newPost)
      this.uploading = false
      this.uploadEnd = false
      this.downloadURL = ''
      this.$refs.form.reset()
      this.newPost.title = ''
      this.newPost.type = ''
      this.newPost.status = ''
      this.newPost.time = ''
      this.newPost.imageTime = ''
      this.newPost.image = false
      this.newPost.detail = ''
      this.newPost.location = ''
      this.newPost.price = ''
      this.show = false
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
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      const dateTime = date +' '+ time;
      this.newPost.imageTime = dateTime
      this.newPost.image = true
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = fb.storage.ref('posts/' + this.newPost.imageTime + fb.auth.currentUser.uid).put(file)
    },
    deleteImage () {
      fb.storage
        .ref('posts/' + this.newPost.imageTime +  fb.auth.currentUser.uid)
        .delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.downloadURL = ''
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`)
        })
      this.$refs.form.reset()
    }
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
  },
  mounted () {
    postsRef.on('value', (snapshot) => {
      this.posts = snapshot.val()
    }),
    usersRef.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
  },
}
</script>

<style scoped>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
.postImg {
  width: 350px;
  height:350px;
  object-fit: cover;
}
</style>
