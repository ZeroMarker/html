function Tab() {
    this.btns = document.querySelectorAll(".btns span");
    this.boxs = document.querySelectorAll(".box");
    this.bindEvent();
}
Tab.prototype.bindEvent = function () {
    var _this = this;
    this.btns.forEach(function (ele) {
        ele.onmouseover = function () {
            // console.log( this , _this );
            var index = _this.getIndex(this);
            _this.change(index);
        }
    })

}
Tab.prototype.getIndex = function (ele) {
    for (var i = 0; i < this.btns.length; i++) {
        if (this.btns[i] === ele) {
            return i;
        }
    }
}
Tab.prototype.change = function (index) {
    // 清空 : 
    for (var i = 0; i < this.btns.length; i++) {
        this.btns[i].classList.remove("active");
        this.boxs[i].style.display = "none";
    }

    this.btns[index].classList.add("active");
    this.boxs[index].style.display = "block";
}

new Tab();