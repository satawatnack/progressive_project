<template>
  <div>
    <b-navbar id="navbar" toggleable="md">
      <b-navbar-brand class="md-mx-auto navbar-header">
        <router-link to="/">JUST-RENT</router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="left-collapse"></b-navbar-toggle>
      <b-collapse id="left-collapse" class="navbar-menu-group" is-nav>
        <b-navbar-nav class="navlink">
          <b-nav-item><router-link to="/">home</router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: 'navbar'
}
</script>

<style scoped>
#navbar {
  background: rgb(255,0,33);
  background: linear-gradient(90deg, rgba(255,0,33,0.8981967787114846) 0%, rgba(216,97,3,0.8057598039215687) 100%);
}

.navbar-header{
  align-items: center;
  margin-left: 12%;
  margin-right: 30%;
}

.navbar-header a{
  color: #fff;
  font-size: 1.3em;
  font-weight: 600;
  text-decoration: none;
}

.navbar-menu-group .navlink {
  display: list-item;
  margin-left: 0.8em;
}

.navbar-menu-group a {
  text-decoration: none;
  color: #fff;
  font-size: 0.9em;
  text-transform: uppercase;
}

.navlink a a.router-link-exact-active {
  border-bottom: #fff solid 2px;
}

.navlink a a:hover {
  border-bottom: #fff solid 2px;
}

</style>
