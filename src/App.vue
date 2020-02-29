<template>
  <div id="app">
    <div id="nav">
      <h2>FIREVUE</h2>
      <br>
      <router-link to="/">Login</router-link> |
      <router-link to="/components/">Register</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  text-align: left;
  background-color:#111111;
}

#nav a {
  font-weight: bold;
  color: white;
}
#nav a.router-link-exact-active {
  color: #ff004c;
}
H2{
    display: inline-block;
    color: white;
}
</style>
