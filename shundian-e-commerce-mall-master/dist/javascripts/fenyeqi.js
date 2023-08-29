class fenyeqi {
      constructor(data, options) {
            // 创建默认参数; 
            Object.assign(this, {
                  // 一页默认显示十条数据; 
                  show_num: 10,
                  // 当前的页码 ; 
                  index: 0,
                  // 分页内容总条数; 
                  count: data.length

            }, options)

            this.data = data;
            this.goods_list = document.querySelector(".goods-list");
            this.priceorder1 = document.getElementById("priceorder1");
            this.pagination = document.querySelector(".pagination");
            // 计算总页数;
            this.total_page_num = Math.ceil(this.count / this.show_num);
            this.render();
            this.renderBullet();
            this.bindEvent();
      }
      bindEvent() {
            on(this.pagination, "click", "span", (e) => {
                  this.index = e.origin.innerText - 1;
                  this.render();
                  this.renderBullet();
            });
            on(this.goods_list, "click", ".goods", (e) => {
                  this.go(e.origin.getAttribute("data-id"));
            });
            on(this.priceorder1, "click", (e) => {
                  // this.PriceDown();
                  // this.PriceUp();
                  this.paixu(
                        this.priceorder1.getAttribute("class")

                  );
                  this.priceorder1.classList.toggle("active")

            });
      }
      render() {
            let html = "";
            for (let i = this.index * this.show_num; i < (this.index + 1) * this.show_num; i++) {
                  if (this.data[i] === undefined) continue;

                  html += `<div class="goods" data-id=${this.data[i].goods_id}>
                      <img src="${this.data[i].src}" alt="">
                      <div class="title">${this.data[i].title}</div>
                      <div class="goods-bq">
                              <div class="list_l">
                                  <div class="red_list_l">${this.data[i].list_l}</div>
                              </div>
                              <div class="list_r">
                                  <div class="gray_list_r">${this.data[i].list_r}</div>
                              </div>  
                            </div>
                            <div class="goods-price">
                              <div class="fl_left">
                                  <div class="price">${this.data[i].price}</div>
                              </div>
                            </div>
                </div>`
            }
            this.goods_list.innerHTML = html;
      }
      go(id) {
            location.href = "./Detail.html#id=" + id;
      }
      PriceDown() {
            data.sort(function (a, b) {
                  // console.log(Number(a) - Number(b));
                  return Number(a.price.split("￥")[1]) - Number(b.price.split("￥")[1]);

            })
            this.render(data);
      }
      PriceUp() {
            // data.sort(function (a, b) {
            //       // console.log(Number(a) - Number(b));
            //       return Number(b.price.split("￥")[1]) - Number(a.price.split("￥")[1]);

            // })
            // this.render(data);

      }
      paixu(active) {
                  data.sort(function (a, b) {
                        if (active) {
                              return Number(b.price.split("￥")[1]) - Number(a.price.split("￥")[1]);
                        } else {
                              return Number(a.price.split("￥")[1]) - Number(b.price.split("￥")[1]);
                        }
                  })
                  this.render(data);
            
      }


      renderBullet() {
            let html = "";

            html += "<em>上一页</em>"
            html += "<strong>开头</strong>"

            let start = this.index - 1;
            let end = this.index + 3;

            if (start < 1) {
                  start = 1;
                  end = start + 5;
            }


            if (end >= this.total_page_num) {
                  end = this.total_page_num;
                  start = end - 5;
            }

            if (this.index >= 3) {

                  html += "<span>1</span>"
                  html += "<b>...</b>"
            }

            // 带有省略号的渲染; 
            for (let i = start; i <= end; i++) {
                  html += `<span ${i - 1 === this.index ? "class='active'" : ""}>${i}</span>`
            }

            if (this.index <= this.total_page_num - 4) {

                  html += "<b>...</b>"
                  html += "<span>" + this.total_page_num + "</span>"
            }

            html += "<strong>结尾</strong>"
            html += "<em>下一页</em>"

            this.pagination.innerHTML = html;
      }
}
let pagination = new fenyeqi(data, {
      show_num: 24
});