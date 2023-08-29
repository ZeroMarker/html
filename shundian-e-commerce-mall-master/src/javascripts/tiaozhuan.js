window.addEventListener("load", () => {
    class GoodsDetail {
        constructor() {
            this.goods_detail = document.querySelector(".goods-detail")
            this.img = document.querySelector(".img-box img");
            this.big_img = document.querySelector(".big-img img");
            this.title = document.querySelector(".title");
            this.action_price = document.querySelector(".action-price");
            this.rigbox = document.querySelector(".rigbox");

            this.id = location.hash.split("=")[1];
            this.data = null;
            this.load = axios.create({
                baseURL: "http://localhost:3000/static/data"
            })
            this.loadListData()
            this.cart_data = this.getCartData();
            // this.bindEvent();
            if (!this.id) {
                return this.abort();
            }
        }
        loadListData() {
            let options = {
                url: "/list.json",
            }
            this.load(options)
                .then((res) => {
                    this.render(res);

                    new Magnifier({
                        el: ".goods-detail",
                        img: ".img-box",
                        focus: ".focus",
                        big: ".big-img",
                        big_img: ".big-img img"
                    });
                    on(this.rigbox, "click", "button", e => {
                        this.rigbox = res.data.data[this.id-1].goods_id;
                        this.addCart(this.rigbox , res.data.data[this.id-1]);
                    });
                })
        }
        abort() {
            alert("数据错误，请重新点击商品");
            location.href = "./goods-list.html";
        }
        render(res) {
            this.img.src = res.data.data[this.id - 1].src;
            this.big_img.src = res.data.data[this.id - 1].src;
            this.title.innerHTML = res.data.data[this.id - 1].title;
            this.action_price.innerHTML = res.data.data[this.id - 1].price;
            // for (var i = 0; i < 5; i++) {
            //     var x = res.data.data[this.id - 1].smallphoto[i];
            // }
            // document.querySelectorAll(".img1 img").innerHTML += x;
        }
        go(id) {
            location.href = "./shopcart.html#id=" + id;
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
            console.log(id,data);
            if (id in this.cart_data) {
                this.cart_data[id].count++;
            } else {
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
    new GoodsDetail;
});