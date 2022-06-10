<template>
    <div class="column" @click="clickChessBoard(column)">
        <span :style="display"></span>
    </div>
  
</template>

<script>
export default {
    name:"ChessColumn",
    props:["column","clickChessBoard"],
    data(){
        return {
            display:""
        }
    },
    watch:{
        column:{
            deep:true,
            immediate:true,
            handler(){
                if(this.column.click==1){
                    if(this.column.color==0){
                        this.display="display:block;background-color: white;"
                    }else{
                        this.display="display:block;background: radial-gradient(circle,white,rgb(16, 15, 15),black);"
                    }
                }else{
                    this.display="dispaly:none"
                };
            }
        }
    }
}
</script>

<style>
</style>