window.addEventListener("load", () => {

    class Piceorder {
        constructor() {
            this.priceorder1 = document.getElementById("priceorder1");
            this.priceorder2 = document.getElementById("priceorder2");
            this.bindEvent();
        }
        bindEvent() {
            let data = JSON.parse(localStorage.getItem("cart"));
            console.log(data);
           this.priceorder1.onclick=function(){
                console.log(1);
            }
        }
    }
})