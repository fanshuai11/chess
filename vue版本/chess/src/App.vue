<template>
  <div class="outer">
      <h2>爸爸做的小游戏：棋盘连珠游戏</h2>
      <ChessGame/>
  </div>
  
</template>

<script>
import ChessGame from "./components/ChessGame.vue";
export default {
  name:"App",
  data(){
    return{
      first:""
    }
    
  },
  components:{ChessGame},

}
</script>

<style>
  html,body{
    height: 100%;
  }
  .outer{
    position: relative;
    display: inline-flex;
    flex-direction: column;
    top:50px;
    left:50px
  }

</style>
