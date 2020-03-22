<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">My Feed</h3>
        <input class="form-control" type="text" v-model="searchType" placeholder="Search" />
      </div>
      <div class="panel-body">
        <table class="table table-striped">
          <tbody>
            <div :key="key" v-for="(post, key) in resultQuery">
              <div v-if="updateKey === key">
                <div><input type="text" v-model="updatePost.title" placeholder="title"></div>
                <div><input type="text" v-model="updatePost.type" placeholder="type"></div>
                <div><input type="text" v-model="updatePost.status" placeholder="status"></div>
                <div>{{post.time}}</div>
                <div><input type="text" v-model="updatePost.detail" placeholder="type"></div>
                <div>
                    <b-img v-if="uploadEnd" thumbnail fluid rounded :src="downloadURL" alt="Image" style="width: 300px;"></b-img>
                    <b-img v-else-if="post.image" thumbnail fluid rounded :src=getUrl(post) alt="Image" style="width: 300px;"></b-img>
                    <b-img v-else thumbnail fluid rounded :src="require('../assets/defult.jpg')"  alt="Image" style="width: 300px;"></b-img>
                </div>
                <div>post by : {{getUserName(post.uid)}}</div>
                <div>tel : {{getUserTel(post.uid)}}</div>
                <div>
                    <label>
                        <div class="btn btn-secondary">
                            change picture
                        </div>
                        <input
                        type="file"
                        style="display:none"
                        accept="image/*"
                        @change="detectFiles($event, post.imageTime, post.uid)" />
                    </label>
                </div>
                <div><button @click="updateThisPost(updatePost.title, updatePost.type, updatePost.status, updatePost.detail)">Save</button></div>
              </div>
              <tr v-else-if="post.uid==uid">
                <td>{{post.title}}</td>
                <td>{{post.type}}</td>
                <td>{{post.status}}</td>
                <td>{{post.time}}</td>
                <td>{{post.detail}}</td>
                <td >
                  <b-img v-if="post.image" thumbnail fluid rounded :src="getUrl(post)"  alt="Image" style="width: 300px;"></b-img>
                  <b-img v-else thumbnail fluid rounded :src="require('../assets/defult.jpg')"  alt="Image" style="width: 300px;"></b-img>
                </td>
                <td>post by : {{getUserName(post.uid)}}</td>
                <td>tel : {{getUserTel(post.uid)}}</td>
                <td>
                    <button v-if="post.uid==uid" @click="setUpdatePost(key, post)">edit</button><br>
                    <button v-if="post.uid==uid" @click="removePost(post, key)">delete</button>
                </td>
              </tr>
              <br>
            </div>
          </tbody>
        </table>
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
      posts: {},
      imgUrls: {},
      users: {},
      updateKey: '',
      updatePost: {
          title: '',
          type: '',
          status: '',
          detail: '',
      },
      search: '',
      loading: false,
      color: 'black',
      size: '20px'
    }
  },
  props: ['searchType'],
  methods: {
    detectFiles (e, imgTime, uid) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x], imgTime, uid)
      })
    },
    upload (file, imgTime, uid) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = fb.storage.ref('posts/' + imgTime + uid).put(file)
      fb.storage.ref('posts/' + imgTime+  uid).getDownloadURL().then((url) => {
        const imgdiv = document.getElementById("updatePostImg")
        if(imgdiv) imgdiv.src = url
      })
      postsRef.child(this.updateKey).update({
        image: true
      })
    },
    getUrl (post) {
      fb.storage.ref('posts/' + post.imageTime +  post.uid).getDownloadURL().then((url) => {
        this.$set(this.imgUrls, post.imageTime +  post.uid, url);
      })
      return this.imgUrls[post.imageTime +  post.uid]
    },
    getUserTel (uid) {
        for (var i in this.users) {
            if (this.users[i].uid == uid) return this.users[i].tel
        }
    },
    getUserName (uid) {
        for (var i in this.users) {
            if (this.users[i].uid == uid) return this.users[i].name
        }
    },
    setUpdatePost (key, post) {
        this.updateKey = key
        this.updatePost.title = post.title
        this.updatePost.type = post.type
        this.updatePost.status = post.status
        this.updatePost.detail = post.detail
    },
    updateThisPost (title, type, status, detail) {
        postsRef.child(this.updateKey).update({
            title: title,
            type: type,
            status: status,
            detail: detail
        })
        this.updateKey = ''
        this.updatePost.title = ''
        this.updatePost.type = ''
        this.updatePost.status = ''
        this.updatePost.detail = ''
        this.uploadEnd = false
    },
    removePost (post, key) {
        if(post.uid == fb.auth.currentUser.uid){
            postsRef.child(key).remove()
            fb.storage
            .ref('posts/' + post.imageTime +  post.uid)
            .delete()
            .catch((error) => {
            console.error(`file delete error occured: ${error}`)
            })
            alert('Post removed successfully')
        }
        else {
            alert('It isn\'t your post')
        }
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
      if(this.searchType){
        return Object.values(this.posts).filter(post => {
          return post.title.toLowerCase().includes(this.searchType.toLowerCase()) || post.type.toLowerCase().includes(this.searchType.toLowerCase())
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
</style>
