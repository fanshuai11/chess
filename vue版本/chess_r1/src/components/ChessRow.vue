<template>
    <div class="row">
        <ChessColumn
            v-for="column in columns"
            :key="column.id"
            :column="column"
            :clickChessBoard="clickChessBoard"
        />
    </div>
  
</template>

<script>
import ChessColumn from "./ChessColumn.vue"
export default {
    name:"ChessRow",
    components:{ChessColumn},
    props:["columns","clickChessBoard"]
}
</script>

<style>

</style>