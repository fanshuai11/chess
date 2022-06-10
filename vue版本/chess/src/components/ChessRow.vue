<template>
    <div>
        <ChessColumn 
            v-for="column in row"  
            :key="column"
            :column="column"
            :chessUpdate="chessUpdate"
            />
    </div>
    
  
</template>

<script>
import ChessColumn from "./ChessColumn.vue"
export default {
    name:"ChessRow",
    components:{ChessColumn},
    props:["chessData","row","chessUpdate"]

}
</script>

<style>

</style>