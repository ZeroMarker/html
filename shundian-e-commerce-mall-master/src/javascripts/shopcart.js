window.addEventListener("load", () => {
      class GoodList {
            constructor() {
                  this.goods_detail = document.querySelector(".goods-detail")
                  this.cart_empty = document.querySelector(".cart-empty")
                  this.wupin = document.querySelector(".wupin")
                  this.down = document.querySelector(".down")
                  this.up = document.querySelector(".up")
                  this.btn = document.querySelector(".btn")
                  this.pay = document.getElementById("pay")
                  this.price_num = document.getElementById("price_num")
                  this.data = null;
                  this.render();
                  this.detele();
                  this.add();
                  this.jian();
                  this.Priceup();
                  this.Pricedown();
                  this.cart_data = this.getCartData();
                  this.priceall = document.querySelectorAll(".priceall");
                  this.count = document.querySelector(".count")

                  this.ZHprice();

            }
            
            render() {
                  let data = JSON.parse(localStorage.getItem("cart"));
                  let arr = [];

                  for (const i in data) {
                        arr.push[i];
                        arr.id = data[i]

                        var div = `<div class="wupin" data-id=${arr.id.goods_id}>
                                     <img src="${arr.id.src}" alt="">
                                     <div class="wutitle">${arr.id.title}</div>
                                     <div class="wuprice">${arr.id.price}</div>
                                     <div class="sum">
                                           <button class="down">-</button>
                                           <input class="count" value="${arr.id.count}">
                                           <button class="up">+</button>
                                     </div>
                                     <div class="priceall">${arr.id.price}</div>
                                     <button class="btn">删除</button>
                               </div>`
                        this.wupin.innerHTML = div + this.wupin.innerHTML;
                  }

            }
            detele() {
                  var i_btn = document.getElementsByClassName("btn");
                  for (var k = 0; k < i_btn.length; k++) {
                        i_btn[k].onclick = function () {
                              this.parentElement.remove();
                              localStorage.clear(this.parentElement.getAttribute("data-id"));
                              this.remove(this.parentElement.getAttribute("data-id"));
                              // location.reload();
                        }
                  }
            }
            add() {
                  var a_btn = document.getElementsByClassName("up");
                  for (var a = 0; a < a_btn.length; a++) {
                        a_btn[a].onclick = function () {
                              this.parentNode.childNodes[3].value++;
                              this.ZHprice();
                        }

                  }

            }
            jian() {
                  var b_btn = document.getElementsByClassName("down");
                  for (var b = 0; b < b_btn.length; b++) {
                        b_btn[b].onclick = function () {
                              if (this.parentNode.childNodes[3].value < 2) {
                                    this.parentElement.parentElement.remove();
                              }
                              this.parentNode.childNodes[3].value--;
                        }
                  }
            }
            Priceup() {
                  var c_btn = document.getElementsByClassName("up");
                  for (var c = 0; c < c_btn.length; c++) {
                        c_btn[c].onclick = function () {
                              let node = Number(this.parentNode.parentNode.childNodes[9].innerHTML.split("￥")[1]);
                              let nono = Number(this.parentNode.childNodes[3].value++);
                              this.parentNode.parentNode.childNodes[9].innerText = "￥" + ((node * nono) + node) + ".00";

                        }
                  }
            }
            Pricedown() {
                  var d_btn = document.getElementsByClassName("down");
                  for (var d = 0; d < d_btn.length; d++) {
                        d_btn[d].onclick = function () {
                              let npmd = Number(this.parentNode.parentNode.childNodes[5].innerHTML.split("￥")[1]);
                              console.log(npmd);
                              let node = Number(this.parentNode.parentNode.childNodes[9].innerHTML.split("￥")[1]);
                              console.log(node);
                              let nono = Number(--this.parentNode.childNodes[3].value);
                              this.parentNode.parentNode.childNodes[9].innerText = "￥" + npmd * nono + ".00";
                        }
                  }
            }
      
            ZHprice() {
                  let sum = 0;

                  for (var i = 0; i < this.priceall.length; i++) {
                        let ndd = this.priceall[i].innerHTML.split("￥")[1];
                        let nono = this.count.value;
                        console.log(nono);
                        // console.log(ndd);
                        let pp = Number(ndd);
                        sum += pp;
                        this.price_num.innerHTML = sum;
                  }
            }
            
                        getCartData() {
                              try {
                                    let data = JSON.parse(localStorage.getItem("cart"))
                                    if (data === null) {
                                          return {}
                                    }
                                    return data;
                              } catch (e) {
                                    return {};
                              }
                        }
                        addCart(id, data) {
                              // 判断当前的id是否存在于购物车列表之中
                              if (id in this.cart_data) {
                                    // 如果存在就让商品数量自增; 
                                    this.cart_data[id].count++;
                              } else {
                                    // 如果不存在就放入一个初始数据; 
                                    data.count = 1;
                                    this.cart_data[id] = data;
                              }
                              this.save();
                        }
                        remove(id) {
                              delete this.cart_data[id];
                              this.save();
                        }
                        save() {
                              localStorage.setItem("cart", JSON.stringify(this.cart_data));
                        }
                  }
                  let g = new GoodList;
            });