<template>
    <div>
        <h3>Let's upload your profile image !</h3>
        <UploadImage></UploadImage>
        <button @click="signUp">Sign up</button>
    </div>
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

</style>