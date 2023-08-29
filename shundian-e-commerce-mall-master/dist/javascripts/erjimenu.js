window.addEventListener("load", () => {

    class Erjimenu {
        constructor() {
            this.category_item = document.querySelector(".category-item");
            this.bindEvent();
        }
        bindEvent() {
            on(this.category_item , "mouseover", ()=>{
                document.querySelector(".sub-box").style.display = "block";
            });
            on(this.category_item , "mouseout", ()=>{
                document.querySelector(".sub-box").style.display = "none";
            });
        }
    }
    new Erjimenu();
})