<template>
  <div id="app">
    <navSide v-if=" $route.path != '/login'"></navSide>
    <div class= 'container'>
      <router-view/>
    </div>
  </div>
</template>

<script>

import navSide from './components/navSide'

export default {
  components:{
    navSide
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #F3F1FF;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}
a{
  text-decoration: none;
}
body{
  margin: 0;
}
.container{
  margin-top: 20px;
  margin-left: 75px;
}
.el-table{
  min-height: 650px;
  margin-bottom: 20px;
}
.el-table .cell{
  text-align: center;
}
</style>
