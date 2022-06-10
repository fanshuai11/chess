<template>
  <div>
    <div class="chessConfig">
      请输入棋盘规格:<input
        type="text"
        v-model="chessNum"
        @keyup.enter="confirm"
      />
    </div>
    <div class="container">
      <ChessRow
        class="row"
        v-for="row in chessData"
        :key="row"
        :chessData="chessData"
        :row="row"
        :chessUpdate="chessUpdate"
      />
    </div>
    <div class="result">{{ result }}</div>
  </div>
</template>

<script>
import ChessRow from "./ChessRow.vue";
export default {
  name: "ChessGame",
  data() {
    return {
      color: 0,
      chessNum: 3,
      chessData: [
        [
          { id: "1", click: 0, color: 0 },
          { id: "2", click: 0, color: 0 },
          { id: "3", click: 0, color: 0 },
        ],
        [
          { id: "4", click: 0, color: 0 },
          { id: "5", click: 0, color: 0 },
          { id: "6", click: 0, color: 0 },
        ],
        [
          { id: "7", click: 0, color: 0 },
          { id: "8", click: 0, color: 0 },
          { id: "9", click: 0, color: 0 },
        ],
      ],
      result: "胜负未定！！！",
    };
  },
  components: { ChessRow },
  methods: {
    chessUpdate(clickObj) {
      if (this.result == "胜负未定！！！") {
        if (clickObj.click == 0) {
          this.color == 1 ? (this.color = 0) : (this.color = 1);
          this.chessData.forEach((itemRow, row) => {
            itemRow.forEach((itemColumn, column) => {
              if (itemColumn.id == clickObj.id) {
                let flag = [[], [], [], [], [], [], [], []];
                this.chessData[row][column].click = 1;
                this.chessData[row][column].color = this.color;
                for (let i = 1; i < this.chessNum; i++) {
                  if (column + i < this.chessNum) {
                    let item = this.chessData[row][column + i];
                    if (item.click == 1 && item.color == this.color) {
                      flag[0].push(1);
                    } else {
                      flag[0].push(0);
                    }
                  }
                  if (row + i < this.chessNum && column + i < this.chessNum) {
                    let item = this.chessData[row + i][column + i];
                    if (item.click == 1 && item.color == this.color) {
                      flag[1].push(1);
                    } else {
                      flag[1].push(0);
                    }
                  }
                  if (row + i < this.chessNum) {
                    let item = this.chessData[row + i][column];
                    if (item.click == 1 && item.color == this.color) {
                      flag[2].push(1);
                    } else {
                      flag[2].push(0);
                    }
                  }
                  if (row + i < this.chessNum && column - i >= 0) {
                    let item = this.chessData[row + i][column - i];
                    if (item.click == 1 && item.color == this.color) {
                      flag[3].push(1);
                    } else {
                      flag[3].push(0);
                    }
                  }
                  if (column - i >= 0) {
                    let item = this.chessData[row][column - i];
                    if (item.click == 1 && item.color == this.color) {
                      flag[4].push(1);
                    } else {
                      flag[4].push(0);
                    }
                  }
                  if (row - i >= 0 && column - i >= 0) {
                    let item = this.chessData[row - i][column - i];
                    if (item.click == 1 && item.color == this.color) {
                      flag[5].push(1);
                    } else {
                      flag[5].push(0);
                    }
                  }
                  if (row - i >= 0) {
                    let item = this.chessData[row - i][column];
                    if (item.click == 1 && item.color == this.color) {
                      flag[6].push(1);
                    } else {
                      flag[6].push(0);
                    }
                  }
                  if (row - i >= 0 && column + i < this.chessNum) {
                    let item = this.chessData[row - i][column + i];
                    if (item.click == 1 && item.color == this.color) {
                      flag[7].push(1);
                    } else {
                      flag[7].push(0);
                    }
                  }
                }
                flag.forEach((item) => {
                  let sum = 0;
                  item.forEach((item_inner) => {
                    sum += item_inner;
                  });
                  if (sum == this.chessNum - 1) {
                    this.color == 1
                      ? (this.result = "黑棋获胜!")
                      : (this.result = "白棋获胜!");
                  }
                });
              }
            });
          });
        }
      }
    },
    confirm() {
      this.color = 0;
      this.result = "胜负未定！！！";
      let rowAry = [];
      for (let i = 0; i < this.chessNum; i++) {
        let columnAry = [];
        for (let j = 0; j < this.chessNum; j++) {
          let columnObj = { id: 0, click: 0, color: 0 };
          columnObj.id = i * this.chessNum + j + 1;
          columnAry.push(columnObj);
        }
        rowAry.push(columnAry);
      }
      this.chessData = rowAry;
    },
  },
};
</script>

<style scoped>
.chessConfig{
  height: 50px;
}
.chessConfig input{
  width: 60px;
  margin-left: 10px;
}
.container {
  display: inline-flex;
  flex-direction: column;
  border: 2px solid rgb(113, 113, 113);
}
.container .row {
  display: flex;
}
.row div {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border: 2px solid rgb(113, 113, 113);
  background-color: rgb(163, 163, 163);
}
.result{
  margin-top: 20px;
  font-size: 24px;
}
</style>