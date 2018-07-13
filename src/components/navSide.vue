<template>
  <div class = 'topnav'>
      <div class = 'top'>
        <div class = 'logo'>
          <img src="../assets/img/logo.png" alt="">
        </div>
        <div class = 'title'>
          <img src="../assets/img/top_title.png" alt="">
        </div>
        <div class = 'right'>
          <span>消息</span>
          <span>安全等级</span>
          <div>你好！<span>xxx</span></div>
        </div>
      </div>
      <div class = 'leftSide'></div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'navSide',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.topnav{
  .logo{
    position: absolute;
    left:5px;
    top:0px;
    z-index: 10;
  }
  .title{
    position: absolute;
    left:70px;
    top:0px;
  }
  .top{
    background: #2D3140;
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    height: 50px;
    line-height: 50px;
    .right{
      margin-left: 90%;
      width: 10%;
      display: flex;
      justify-content: space-around;
      color:#fff;
    }
  }
  .leftSide{
    position: absolute;
    height: 100%;
    top:0px;
    left:0px;
    width: 58px;
    background:#2D3140;
  }
}
</style>
