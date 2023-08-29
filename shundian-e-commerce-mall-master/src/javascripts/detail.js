class Magnifiers {
      constructor() {
            this.img_box = document.querySelector(".img-box");
            this.focus = document.querySelector(".focus");
            this.big_img = document.querySelector(".big-img");
            this.big_bg = document.querySelector(".big-img img");
            this.scale = 0.6;
            // - 为了获取元素的偏移距离，计算正确的focus位置; 
            this.container = document.querySelector(".goods-detail");
            this.btns = document.querySelectorAll(".list span");
            // 切换行为核心数据; 
            this.index = 0;
            // 图片数据; 
            this.img_list = [
                  {
                        small: "https://sundan.com/public/images/d7/8f/fe/869cdd7fd1dd5340fcdc92ccfa52205489ec4792.jpg?1630401396#h",
                        big: "https://sundan.com/public/images/d7/8f/fe/869cdd7fd1dd5340fcdc92ccfa52205489ec4792.jpg?1630401396#h"
                  },
                  {
                        small: "https://sundan.com/public/images/4a/8d/81/503c497ef43b0160eb1341ea1285f496c89d1915.jpg?1627633769#h",
                        big: "https://sundan.com/public/images/4a/8d/81/503c497ef43b0160eb1341ea1285f496c89d1915.jpg?1627633769#h"
                  },
                  {
                        small: "https://sundan.com/public/images/48/a9/e4/c071534eec6f6777a7af2a9c327f3c0bc420509a.jpg?1627617172#h",
                        big: "https://sundan.com/public/images/48/a9/e4/c071534eec6f6777a7af2a9c327f3c0bc420509a.jpg?1627617172#h"
                  },
                  {
                        small: "https://sundan.com/public/images/60/36/ec/69705972cdd9400ba7ab63d8b620793e6970b246.jpg?1627617172#h",
                        big: "https://sundan.com/public/images/60/36/ec/69705972cdd9400ba7ab63d8b620793e6970b246.jpg?1627617172#h"
                  },
                  {
                        small: "https://sundan.com/public/images/ec/a9/2b/08d11f22e39055cf9d3aba5e1eac8f8b197d47e6.jpg?1627617172#h",
                        big: "https://sundan.com/public/images/ec/a9/2b/08d11f22e39055cf9d3aba5e1eac8f8b197d47e6.jpg?1627617172#h"
                  },
                  {
                        small: "https://sundan.com/public/images/e2/04/61/890d1109567deda72aec42ee87935d1cf77bb147.jpg?1627617172#h",
                        big: "https://sundan.com/public/images/e2/04/61/890d1109567deda72aec42ee87935d1cf77bb147.jpg?1627617172#h"
                  }
            ]

            this.init();


            this.c_off = {
                  left: this.container.offsetLeft,
                  top: this.container.offsetTop,
            }
            // offset 家族是没办法测量 display 为none 的元素; 
            this.f_style = getComputedStyle(this.focus),
                  this.i_style = getComputedStyle(this.img_box)

            // 边界数据对象; 
            this.boundary = {
                  x: {
                        min: 0,
                        max: parseInt(this.i_style.width) - parseInt(this.f_style.width)
                  },
                  y: {
                        min: 0,
                        max: parseInt(this.i_style.height) - parseInt(this.f_style.height)
                  }
            }
            this.bindEvent();
      }
      init() {

            this.focus.style.width = 350 * this.scale + "px";
            this.focus.style.height = 350 * this.scale + "px";

            this.big_img.style.width = 800 * this.scale + "px";
            this.big_img.style.height = 800 * this.scale + "px";
      }

      bindEvent() {
            this.img_box.addEventListener("mouseover", () => {
                  this.show();
            })
            this.img_box.addEventListener("mouseout", () => {
                  this.hide();
            })
            this.img_box.addEventListener("mousemove", (e) => {
                  this.move(e.clientX, e.clientY);
            })

            for (let i = 0; i < this.btns.length; i++) {
                  this.btns[i].addEventListener("mouseenter", () => {
                        this.change(i);
                  })
            }
      }
      show() {
            this.focus.style.display = "block";
            this.big_img.style.display = "block";
      }
      hide() {
            this.focus.style.display = "none";
            this.big_img.style.display = "none";
      }
      move(x, y) {
            // 如果使用offset会出现 鼠标获取位置的参照物和focus元素定位的参照物不一致; 
            // - 导致元素位移位置不正确; 

            x = x - this.c_off.left - parseInt(this.f_style.width) / 2;
            y = y - this.c_off.top - parseInt(this.f_style.height) / 2;


            //  边界检测 
            x = x <= this.boundary.x.min ? this.boundary.x.min : x;
            x = x >= this.boundary.x.max ? this.boundary.x.max : x;

            y = y <= this.boundary.y.min ? this.boundary.y.min : y;
            y = y >= this.boundary.y.max ? this.boundary.y.max : y;

            this.focus.style.left = x + "px";
            this.focus.style.top = y + "px";


            this.big_bg.style.left = - x * (800 / 350) + "px";
            this.big_bg.style.top = - y * (800 / 350) + "px";
      }

      change(index) {
            this.btns.forEach(ele => ele.classList.remove("active"));

            this.btns[index].classList.add("active");

            this.img_box.children[0].src = this.img_list[index].small;
            this.big_bg.src = this.img_list[index].big;
      }

}

var m = new Magnifiers;