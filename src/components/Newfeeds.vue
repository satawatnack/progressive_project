<template>
  <div class="body">
    <div class="panel panel-default">
      <div class="panel-heading mb-2">
        <h3 class="panel-title mt-5 mb-5">{{ searchType }}</h3>
        <input style="display:none;" class="form-control" type="text" v-model="searchType" placeholder="Search" />
        <input class="form-control" type="text" v-model="search" placeholder="Search" />
      </div>
      <div class="panel-body"><br>
        <table class="table table-striped">
          <tbody>
            <div :key="key" v-for="(post, key) in dict_reverse(resultSearch)">
              <div v-if="updateKey === key" class="postDiv">
                <div class="postDetail">
                  <b-row>
                    <b-col cols="2">
                      <b-img v-bind="mainProps" rounded="circle" :src="getUserProfile(post.uid)" alt="Circle image"></b-img>
                    </b-col>
                    <b-col cols="8" align="left">
                      <p class="ml-3 mt-2">
                        <b>{{getUserName(post.uid)}}</b><br>
                        <b style="font-weight: lighter;">{{post.time}}</b>
                      </p>
                    </b-col>
                    <b-col cols="2">
                    </b-col>
                  </b-row>
                  <div align="left" class="mt-2">
                    <b><input class="form-control" type="text" v-model="updatePost.title" placeholder="title"></b><br>
                    tel : {{getUserTel(post.uid)}} <br>
                    type :
                    <select v-model="updatePost.type" class="form-control mt-2">
                      <option v-for="option in options" v-bind:value="option.value" :disabled="option.disabled" :key="option.value">
                        {{ option.text }}
                      </option>
                    </select><br>
                    status : <input type="text" class="form-control" v-model="updatePost.status" placeholder="status"> <br>
                    price : <input type="text" class="form-control" v-model="updatePost.price" placeholder="price"> <br><hr>
                    <textarea type="text" class="form-control" rows="3" v-model="updatePost.detail" placeholder="detail"></textarea>
                  </div>
                </div>
                <b-img v-if="uploadEnd" thumbnail fluid rounded :src="downloadURL" alt="Image" class="postImg"></b-img>
                <b-img v-else-if="post.image" thumbnail fluid rounded :src=getUrl(post) alt="Image" class="postImg"></b-img>
                <b-img v-else thumbnail fluid rounded :src="require('../assets/defult.jpg')"  alt="Image" class="postImg"></b-img>
                <div><br>
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
                <button class="btn btn-primary mt-3" @click="updateThisPost(updatePost.title, updatePost.type, updatePost.status, updatePost.price, updatePost.detail)">Save</button>
              </div>
              <div v-else class="postDiv">
                <div class="postDetail">
                  <b-row class="mb-3">
                    <b-col cols="2">
                      <b-img v-bind="mainProps" rounded="circle" :src="getUserProfile(post.uid)" alt="Circle image"></b-img>
                    </b-col>
                    <b-col cols="8" align="left">
                      <p class="ml-3 mt-2">
                        <b>{{getUserName(post.uid)}}</b><br>
                        <b style="font-weight: lighter;">{{post.time}}</b>
                      </p>
                    </b-col>
                    <b-col cols="2">
                      <b-dropdown v-if="post.uid==uid" class="mt-2">
                        <b-dropdown-item @click="setUpdatePost(key, post)">edit</b-dropdown-item>
                        <b-dropdown-item @click="removePost(post, key)">delete</b-dropdown-item>
                      </b-dropdown>
                    </b-col>
                  </b-row>
                  <div align="left" class="mt-1">
                    <b>{{post.title}}</b><br>
                    tel : {{getUserTel(post.uid)}} <br>
                    type : {{post.type}} <br>
                    status : {{post.status}} <br>
                    price : {{post.price}} <br><hr>
                    {{post.detail}}
                  </div>
                </div>
                 <b-img v-if="post.image" :src="getUrl(post)"  alt="Image" class="postImg"></b-img>
                 <b-img v-else :src="require('../assets/defult.jpg')"  alt="Image" class="postImg"></b-img>
              </div>
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
      uid: (fb.auth.currentUser) ? fb.auth.currentUser.uid : '',
      posts: {},
      imgUrls: {},
      users: {},
      updateKey: '',
      updatePost: {
          title: '',
          type: '',
          status: '',
          price: '',
          detail: '',
      },
      profileImgs: {},
      search: '',
      loading: false,
      color: 'black',
      size: '20px',
      mainProps: { width: 65, height: 65, class: 'm1' },
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
    }
  },
  props: ['searchType'],
  methods: {
    dict_reverse(obj) {
      if(obj){
        var new_obj= {}
        var rev_obj = Object.keys(obj).reverse();
        rev_obj.forEach(function(i) { 
          new_obj[i] = obj[i];
        })
        return new_obj;
      }
      else return obj
    },
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
    getUserProfile (uid) {
      fb.storage.ref('profile/' + uid).getDownloadURL().then((url) => {
        this.$set(this.profileImgs, uid, url);
      })
      return this.profileImgs[uid]
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
        this.updatePost.price = post.price
        this.updatePost.detail = post.detail
    },
    updateThisPost (title, type, status, price, detail) {
        postsRef.child(this.updateKey).update({
            title: title,
            type: type,
            status: status,
            price: price,
            detail: detail
        })
        this.updateKey = ''
        this.updatePost.title = ''
        this.updatePost.type = ''
        this.updatePost.status = ''
        this.updatePost.price = ''
        this.updatePost.detail = ''
        this.uploadEnd = false
    },
    removePost (post, key) {
        if(post.uid == fb.auth.currentUser.uid){
            postsRef.child(key).remove()
            if(post.image){
              fb.storage
              .ref('posts/' + post.imageTime +  post.uid)
              .delete()
              .catch((error) => {
              console.error(`file delete error occured: ${error}`)
              })
            }
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
      if(this.searchType) {
        return Object.values(this.posts).filter(post => {
          return post.title.toLowerCase().includes(this.searchType.toLowerCase()) || post.type.toLowerCase().includes(this.searchType.toLowerCase()) 
        })
      }
      else {
        return this.posts
      }
    },
    resultSearch() {
      if(this.search) {
        return Object.values(this.resultQuery).filter(post => {
          return post.title.toLowerCase().includes(this.search.toLowerCase()) || post.type.toLowerCase().includes(this.search.toLowerCase()) 
        })
      }
      else {
        return this.resultQuery
      }
    }
  }
}
</script>

<style scoped>
.progress-bar {
  margin: 10px 0;
}
.postImg {
  margin-top: 10px;
  width: 100%;
  height:350px;
  object-fit: cover;
}
.postDiv {
  background-color: white;
  border-radius: 10px;
  padding-bottom: 20px;
}
.postDetail {
  padding: 20px 20px 0px 20px;
  font-size: 14px;
}
</style>
