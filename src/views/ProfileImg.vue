<template>
    <header class="masthead">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                <div class="col-12">
                    <b-row>
                        <b-col sm="6"><div style="height: 40%"></div><h3 style="color: #474747">JUSTRENT</h3><br><br></b-col>
                        <b-col sm="4">
                            <h4 style="color: #474745">Upload your profile image !</h4><br>
                            <UploadImage></UploadImage><br>
                            <button class="btn btn-dark" @click="signUp">Sign up</button>
                        </b-col>
                    </b-row>
                </div>
                </div>
            </div>
    </header>
</template>

<script>
import UploadImage from '@/components/UploadImages.vue'
export default {
    name: 'profileImg',
    components:{
        UploadImage
    },
    methods: {
        signUp: function() {
            this.$router.replace('home')
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
</style>