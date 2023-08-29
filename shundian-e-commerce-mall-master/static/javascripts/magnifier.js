class Magnifier{
      constructor( options ){
            this.img = document.querySelector(options.img);
            this.focus = document.querySelector(options.focus);
            this.big_img = document.querySelector(options.big);
            this.big_bg = document.querySelector(options.big_img);
            this.scale = 0.6;
            // - 为了获取元素的偏移距离，计算正确的focus位置; 
            this.container = document.querySelector( options.el );
            // 找到按钮元素; 
            // 切换行为核心数据; 
            this.index = 0 ; 
         
            this.init();

            this.c_off = {
                  left : this.container.offsetLeft,
                  top  : this.container.offsetTop,
            }
            // offset 家族是没办法测量 display 为none 的元素; 
            this.f_style = getComputedStyle( this.focus ),
            this.i_style = getComputedStyle( this.img ) 

            // 边界数据对象; 
            this.boundary = {
                  x : {
                        min : 0,
                        max : parseInt(this.i_style.width) - parseInt(this.f_style.width)
                  },
                  y : {
                        min : 0 ,
                        max : parseInt(this.i_style.height) - parseInt(this.f_style.height)
                  }
            }
            this.bindEvent();
      }
      init(){     

            this.focus.style.width  = 350 * this.scale + "px";
            this.focus.style.height = 350 * this.scale + "px";

            this.big_img.style.width  = 800 * this.scale + "px";
            this.big_img.style.height = 800 * this.scale + "px";
      }
      
      bindEvent(){
            this.img.addEventListener("mouseover" , ()=>{
                  this.show();
            })
            this.img.addEventListener("mouseout" , ()=>{
                  this.hide();
            })
            this.img.addEventListener("mousemove" , ( e ) => {
                  this.move(e.pageX , e.pageY);
            })
      }
      show(){
            this.focus.style.display = "block";
            this.big_img.style.display = "block";
      }     
      hide(){
            this.focus.style.display = "none";
            this.big_img.style.display = "none";
      }
      move( x , y ){
            // 如果使用offset会出现 鼠标获取位置的参照物和focus元素定位的参照物不一致; 
            // - 导致元素位移位置不正确; 

            x =  x - this.c_off.left - parseInt(this.f_style.width) / 2;
            y =  y - this.c_off.top - parseInt(this.f_style.height) / 2;

            //  边界检测 
            x = x <= this.boundary.x.min ? this.boundary.x.min : x ; 
            x = x >= this.boundary.x.max ? this.boundary.x.max : x ; 

            y = y <= this.boundary.y.min ? this.boundary.y.min : y ; 
            y = y >= this.boundary.y.max ? this.boundary.y.max : y ; 
            
            this.focus.style.left = x + "px";
            this.focus.style.top  = y + "px";


            this.big_bg.style.left = - x * ( 800 / 350 ) + "px";
            this.big_bg.style.top  = - y * ( 800 / 350 ) + "px";
      }
      change(){
            this.btns.forEach( ele => ele.classList.remove("active") );

            this.btns[this.index].classList.add("active");

            this.img.children[0].src = this.img_list[this.index].small;
            this.big_bg.src = this.img_list[this.index].big;
      }
}
