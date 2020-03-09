<template>
  <div class="home">
    <img :src=imgURL><br>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h3>{{ user }}</h3>
    <button @click="logout">logout</button>

  </div>
</template>

<script>
import firebase from 'firebase'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      user: firebase.auth().currentUser.uid,
      imgURL: 'https://firebasestorage.googleapis.com/v0/b/progressiveproj.appspot.com/o/profile%2F' + firebase.auth().currentUser.uid + '?alt=media&token=9fff5e93-ba01-4153-b31a-26eebda1e1bb'
    }
  },
  components: {
    HelloWorld,
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
