<template>
  <div class="home">
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
      user: firebase.auth().currentUser.uid
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
