let inp_num = document.getElementById('num'),
    btn_conf = document.getElementById("btn_condfirm");
new chessPlugin(".container", 3);
btn_conf.onclick = function () {
    let chess_module = new chessPlugin(".container", inp_num.value);
    inp_num.value=""
}




