<template>
  <div class="header">
    <h2>棋盘游戏</h2>
    <div>
      请选择棋盘的规格：<select @change="selectLength($event)" id="chessBoard">
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>

  </div>
</template>

<script>
export default {
  name:"SlideLength",
  methods:{
    selectLength(e){
      this.$emit("select",Number(e.target.value));

    }

  }

};
</script>

<style>
    #chessBoard {
    width: 40px;
    margin-bottom: 30px;
    }
</style>