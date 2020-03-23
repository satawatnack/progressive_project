<template>
    <header class="masthead">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                <div class="col-12">
                    <b-row>
                        <b-col sm="6"><div style="height: 40%"></div><h3 style="color: #474747">JUSTRENT</h3><br><br></b-col>
                        <b-col sm="4">
                            <h4 style="color: #474745">Upload your profile image !</h4><br>
                            <div>
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
                                <b-img class="mb-3" v-if="uploadEnd" thumbnail fluid rounded :src="downloadURL" alt="Image" style="width: 350px;height:350px; object-fit: cover;"></b-img>
                                <b-img class="mb-3" v-else thumbnail fluid rounded :src="require('../assets/defult.jpg')" alt="Image" style="width: 350px;height:350px; object-fit: cover;"></b-img>
                                <br>
                                <v-btn class="btn btn-secondary"
                                @click.native="selectFile"
                                v-if="!uploadEnd && !uploading">
                                    Upload your profile image
                                </v-btn>
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
                            </div><br>
                            <p v-if="!uploadEnd">please upload your profile !</p>
                            <button  v-if="uploadEnd" type="button" class="btn btn-light" @click="signUp">Sign up</button>
                            <button  v-else type="button" class="btn btn-secondary" style="cursor: none;" disabled>Sign up</button>
                        </b-col>
                    </b-row>
                </div>
                </div>
            </div>
    </header>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    name: 'profileImg',
    data () {
    return {
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: '',
      loading: false,
      color: 'black',
      size: '20px'
    }
  },
    methods: {
      signUp: function() {
        this.$router.replace('home')
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
      },
      deleteImage () {
        fb.storage
          .ref('profile/' + fb.auth.currentUser.uid)
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
  }
}
</script>

<style scoped>
.masthead {
        height: 100vh;
        min-height: 500px;
        background-image: url('../assets/bg.jpeg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
}
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
</style>