<template>
  <div class="chessGame">
    <SlideLength :selectSlide="selectSlide" />
    <button id="backChess" @click="backChess">悔棋</button>
    <div class="container">
      <ChessRow
        v-for="row in chessData"
        :key="row.id"
        :columns="row"
        :clickChessBoard="clickChessBoard"
      />
    </div>
    <div class="result">{{ resultWord }}</div>
  </div>
</template>

<script>
import SlideLength from "./SlideLength.vue";
import ChessRow from "./ChessRow.vue";
import { nanoid } from "nanoid";
export default {
  name: "ChessGame",
  components: { SlideLength, ChessRow },
  data() {
    return {
      chessData: [
        [
          { id: nanoid(), click: 0, color: 0, step: 0 },
          { id: nanoid(), click: 0, color: 0, step: 0 },
          { id: nanoid(), click: 0, color: 0, step: 0 },
        ],
        [
          { id: nanoid(), click: 0, color: 0, step: 0 },
          { id: nanoid(), click: 0, color: 0, step: 0 },
          { id: nanoid(), click: 0, color: 0, step: 0 },
        ],
        [
          { id: nanoid(), click: 0, color: 0, step: 0 },
          { id: nanoid(), click: 0, color: 0, step: 0 },
          { id: nanoid(), click: 0, color: 0, step: 0 },
        ],
      ],
      currentColor: 1,
      result: 0,
      slide: 3,
      step: 1,
    };
  },
  methods: {
    test() {
      this.chessData = [
        [
          { id: 1, click: 1, color: 0 },
          { id: 2, click: 1, color: 1 },
          { id: 3, click: 0, color: 0 },
        ],
        [
          { id: 4, click: 0, color: 0 },
          { id: 5, click: 0, color: 0 },
          { id: 6, click: 0, color: 0 },
        ],
        [
          { id: 7, click: 0, color: 0 },
          { id: 8, click: 0, color: 0 },
          { id: 9, click: 0, color: 0 },
        ],
      ];
    },
    clickChessBoard(clickObj) {
      if (this.result == 0 && clickObj.click == 0) {
        this.chessData.forEach((itemRow, row) => {
          itemRow.forEach((itemColumn, colum) => {
            if (clickObj.id == itemColumn.id) {
              this.chessData[row][colum].click = 1;
              this.chessData[row][colum].color = this.currentColor;
              this.$set(this.chessData[row][colum], "step", this.step),
                this.step++;
              this.currentColor = !this.currentColor;
            }
          });
        });
      }
    },
    selectSlide(length) {
      this.slide = length;
      this.currentColor = 1;
      this.step = 1;
    },
    backChess() {
      if (this.step > 1) {
        this.chessData.forEach((itemRow, indexRow) => {
          itemRow.forEach((itemColumn, indexColumn) => {
            if (itemColumn.step == this.step - 1) {
              this.chessData[indexRow][indexColumn].click = 0;
              this.chessData[indexRow][indexColumn].color = 0;
            }
          });
        });
        this.result = 0;
        this.step--;
        this.currentColor = !this.currentColor;
      }
    },
  },
  watch: {
    chessData: {
      deep: true,
      immediate: true,
      handler(newValue) {
        let eightLines = [
          [0, 1],
          [0, -1],
          [1, 1],
          [1, 0],
          [1, -1],
          [-1, 0],
          [-1, 1],
          [-1, -1],
        ];
        newValue.forEach((itemRow, indexRow) => {
          itemRow.forEach((itemColumn, indexColumn) => {
            if (
              itemColumn.color != this.currentColor &&
              itemColumn.click == 1
            ) {
              let record = [[], [], [], [], [], [], [], []];
              for (let i = 1; i < this.slide; i++) {
                eightLines.forEach((item, index) => {
                  if (
                    indexRow + i * item[0] < this.slide &&
                    indexRow + i * item[0] >= 0 &&
                    indexColumn + i * item[1] < this.slide &&
                    indexColumn + i * item[1] >= 0
                  ) {
                    let nextChess =
                      newValue[indexRow + i * item[0]][
                        indexColumn + i * item[1]
                      ];
                    if (
                      nextChess.color == !this.currentColor &&
                      nextChess.click == 1
                    )
                      record[index].push(1);
                  }
                });
              }
              // record.forEach((item) => {
              //   let sum = 0;
              //   item.forEach((itemInner) => {
              //     sum += itemInner || 0;
              //   });
              //   if (sum == this.slide - 1) this.result = 1;
              // });
              let result = record.some((item) => {
                let sum = 0;
                item.forEach((itemInner) => {
                  sum += itemInner || 0;
                });
                return sum == this.slide - 1;
              });
              result == true ? (this.result = 1) : null;
            }
          });
        });
      },
    },
    slide(newSlide) {
      let newChessData = [];
      for (let i = 0; i < newSlide; i++) {
        let rowChessData = [];
        for (let j = 0; j < newSlide; j++) {
          rowChessData.push({ id: nanoid(), click: 0, color: 0, step: 0 });
        }
        newChessData.push(rowChessData);
      }
      this.chessData = newChessData;
    },
  },
  computed: {
    resultWord() {
      if (this.result == 1) {
        if (this.currentColor == 0) {
          return "黑棋获胜！！";
        } else {
          return "白棋获胜！！";
        }
      } else {
        return "旗开得胜！！";
      }
    },
  },
};
</script>

<style >
.chessGame {
  width: 300px;
  height: 500px;
  background-color: rgb(223, 129, 129);
  position: relative;
}
#backChess {
  position: absolute;
  top: 100px;
  left: 200px;
  font-size: 20px;
}
.container {
  display: inline-flex;
  flex-direction: column;
  border: 2px solid rgb(136, 136, 136);
}
.container .row {
  display: flex;
}
.container .row .column {
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  background-color: rgb(201, 201, 201);
  border: 2px solid rgb(136, 136, 136);
  position: relative;
}
.container .row .column span {
  position: absolute;
  display: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.result {
  margin-top: 20px;
}
</style>