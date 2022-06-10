class chessPlugin {
    constructor(selector, num) {
        this.num = num;
        this.white_records = [];
        this.black_records = [];
        this.container = document.querySelector(selector);
        this.buildHtml();
        this.rows = document.querySelectorAll('.row');
        this.flag = 0;
        this.chess_back = document.getElementById("back");
        this.tips = document.getElementById('tips');
        this.container.onclick =(e) =>{
            [].forEach.call(this.rows, (row_item, row_index) => {
                let columns = row_item.getElementsByTagName('span');
                [].forEach.call(columns, (cloumn_item, cloumn_index) => {
                    let chess = cloumn_item.childNodes;
                    if (e.target == cloumn_item) {
                        if (chess[0].className == "black" || chess[0].className == "white") return;
                        if (this.flag == 0) {
                            this.tips.innerHTML = "轮到白棋下";
                            chess[0].className = "black";
                            this.black_records.push([row_index, cloumn_index]);
                            if (this.judge_line(this.black_records, this.num)) {
                                console.log("黑棋获胜！");
                                this.container.onclick = null;
                                this.tips.innerHTML = "黑棋获胜！";
                            }
                            this.flag = 1;
                        } else {
                            tips.innerHTML = "轮到黑棋下";
                            chess[0].className = "white";
                            this.white_records.push([row_index, cloumn_index]);
                            if (this.judge_line(this.white_records, this.num)) {
                                console.log("白棋获胜！");
                                this.container.onclick = null;
                                this.tips.innerHTML = "白棋获胜！";
                            }
                            this.flag = 0;
                        }
                    }
                })

            })
        };      
        this.chess_back.onclick = (e)=>{
            if (this.flag == 0 && this.white_records.length != 0) {
                let last = this.white_records.pop();
                this.rows.forEach((row_item, row_index) => {
                    let columns = row_item.getElementsByTagName('span');
                    [].forEach.call(columns, (cloumn_item, cloumn_index) => {
                        if (row_index == last[0] && cloumn_index == last[1]) {
                            let chess = cloumn_item.childNodes[0];
                            chess.className = "";
                            this.tips.innerHTML = "轮到黑棋下";
                        }
                    })
                });
                this.flag = 1;
            } else if (this.flag == 1 && this.black_records.length != 0) {
                let last = this.black_records.pop();
                this.rows.forEach((row_item, row_index) => {
                    let columns = row_item.getElementsByTagName('span');
                    [].forEach.call(columns, (cloumn_item, cloumn_index) => {
                        if (row_index == last[0] && cloumn_index == last[1]) {
                            let chess = cloumn_item.childNodes[0];
                            chess.className = "";
                            this.tips.innerHTML = "轮到黑棋下";
                        }
                    })
                });
                this.flag = 0;
            }
        
        }
    };
    buildHtml() {
        let row = "";
        for (let i = 0; i < this.num; i++) {
            row += "<span><div></div></span>"
        };
        row = `<div class="row">${row}</div>`;
        let allRow = ""
        for (let i = 0; i < this.num; i++) {
            i==0?allRow+="<button id='back'>悔棋</button>":null;
            allRow += row;
            i==this.num-1?allRow+="<span id='tips'>轮到黑棋下</span>":null;
        };
        this.container.innerHTML = allRow;
    };
    arrayHas(ary, target) {
        return ary.some(item => {
            return item[0] == target[0] && item[1] == target[1]
        })
    };
    judge_line(ary, num) {
        return ary.some(item => {
            let isLine = false;
            for (let i = 1; i < num; i++) {
                if (this.arrayHas(ary, [item[0], item[1] + i])) {
                    isLine = true;
                } else {
                    isLine = false;
                    break;
                }
            };
            if (isLine == true) {
                return true
            };
            for (let i = 1; i < num; i++) {
                if (this.arrayHas(ary, [item[0] + i, item[1] + i])) {
                    isLine = true;
                } else {
                    isLine = false;
                    break;
                }
            };
            if (isLine == true) {
                return true
            };
            for (let i = 1; i < num; i++) {
                if (this.arrayHas(ary, [item[0] + i, item[1]])) {
                    isLine = true;
                } else {
                    isLine = false;
                    break;
                }
            };
            if (isLine == true) {
                return true
            };
            for (let i = 1; i < num; i++) {
                if (this.arrayHas(ary, [item[0] + i, item[1] - i])) {
                    isLine = true;
                } else {
                    isLine = false;
                    break;
                }
            };
            if (isLine == true) {
                return true
            };
        });
    };
}

