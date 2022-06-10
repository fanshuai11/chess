<template>
  <div @click="chessUpdate(column)">
    <span :style="style"></span>
  </div>
</template>

<script>
export default {
  name: "ChessColumn",
  data() {
    return {
      style: {
        display: "none",
        backgroundColor: "",
      },
      columnCopy: this.column,
    };
  },
  props: ["column","chessUpdate"],
  watch: {
    columnCopy: {
        deep:true,
        handler(newValue){
          
          if(newValue.click==1){
              this.style.display="block";
              if(newValue.color==1){
                  this.style.background="radial-gradient(circle,white,rgb(16, 15, 15),black)"
              }else{
                  this.style.background="white"
              }
          }

        }
    },
  },
};
</script>

<style scoped>
div {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border: 2px solid rgb(113, 113, 113);
  background-color: rgb(163, 163, 163);
  position: relative;
}
span {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: rgb(255, 255, 255);
}
</style>