<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Add New Posts</h3>
      </div>
      <div class="panel-body">
         <form id="form" class="form" v-on:submit.prevent="addPost">
          <div class="form-group">
            <label for="postTitle">Title:</label>
            <input type="text" id="postTitle" class="form-control" v-model="newPost.title">
          </div>
          <div class="form-group">
            <label for="postType">Type:</label><br>
            <select v-model="selected">
              <option v-for="option in options" v-bind:value="option.value" :disabled="option.disabled" :key="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="postStatus">Status:</label>
            <input type="text" id="postStatus" class="form-control" v-model="newPost.status">
          </div>
          <div class="form-group">
            <label for="postDetail">Detail:</label>
            <input type="text" id="postDetail" class="form-control" v-model="newPost.detail">
          </div>
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
            <b-img v-if="uploadEnd" thumbnail fluid rounded :src="downloadURL" alt="Image" style="width: 350px;"></b-img><br><br>
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
            <input type="submit" class="btn btn-primary" value="Add Post">
        </form>
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
        { text: 'car', value: 'car' },
        { text: 'house', value: 'house' },
        { text: 'computer', value: 'computer' }
      ]
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
      this.newPost.detail = ''
      this.newPost.uid = ''
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
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.newPost.imageTime = dateTime
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
  computed: {
    resultQuery() {
      if(this.search){
        return Object.values(this.posts).filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase()) || post.type.toLowerCase().includes(this.search.toLowerCase())
      })
      }
      else {
        return this.posts
      }
    }
  }
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
</style>
