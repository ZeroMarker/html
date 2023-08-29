class Pagination{
      constructor(count , options ){
            // 创建默认参数; 
            Object.assign(this , {
                  // 一页默认显示十条数据; 
                  show_num : 10 ,
                  // 当前的页码 ; 
                  index : 0 ,
                  // 分页内容总条数; 
                  count : count ,
                  // 中间显示的页码数量; 
                  show_page_count : 5 ,
                  el : "",
                  pagination : "",
                  callback : function(){}
            } , options )
            this.pagination = document.querySelector( this.pagination );
            // 计算总页数;
            this.total_page_num = Math.ceil(  this.count / this.show_num);
            // show_page_count 数据必须是奇数;
            if( this.show_page_count % 2 !== 1 ){
                  this.show_page_count ++;
            }

            this.renderBullet();
            this.bindEvent();
      }
      bindEvent(){
            on( this.pagination, "click" , "span" , ( e )=>{
                  this.index = e.origin.innerText - 1;
                  this.renderBullet();
            })
            on( this.pagination, "click" , ".start" , ( e )=>{
                  this.index = 0;
                  this.renderBullet();
            })
            on( this.pagination, "click" , ".end" , ( e )=>{
                  this.index = this.total_page_num - 1;
                  this.renderBullet();
            })
            on( this.pagination, "click" , ".next" , ( e )=>{
                  this.add();
            })
            on( this.pagination, "click" , ".prev" , ( e )=>{
                  this.reduce();
            })

            this.pagination.addEventListener( "selectstart" , ( e )=>{
                  e.preventDefault();
            })
      }
      renderBullet(){
            //创建结构的核心在于，当前页面有多少条数据; 
            // - 总页数计算方式 : 总数量 / 每页显示数量 向上取整  
            let html = "";

            html += "<em class='prev'>上一页</em>"
            html += "<strong class='start'>开头</strong>"

            // start : 页码的起始点; 
            // end   : 页码的终点; 

            let start = this.index - 1;
            let end   = this.index + 3; 

            
            // - 判定分页的起始点; 
            if( this.index <= 2 ){
                  start = 1; 
                  end = start + this.show_page_count;
            }
            
            //  this.total_page_num > this.show_page_count + 1  && this.index   : 
            if( this.total_page_num > this.show_page_count + 1  && this.index  >= this.total_page_num - 2){
                  end = this.total_page_num ; 
                  start = end - 5 ;
            }     

            // - end 极值判断; 
            // - end 的最大值不能超过页码总数; 

            if( end >= this.total_page_num ){
                  end = this.total_page_num ; 
            }
            if(!( this.total_page_num > this.show_page_count + 1 )){
                  start = 1; 
            }
           
            if(  this.total_page_num > this.show_page_count + 1 && this.index >= 3 ){
                  html += "<span>1</span>"
                  html += "<b>...</b>"
            }

            // 带有省略号的渲染; 
            for(let i = start ; i <= end ; i ++){
                  html += `<span ${ i - 1 === this.index ? "class='active'" : ""}>${ i }</span>`
            }
            
            if( this.total_page_num > this.show_page_count + 1  && this.index <= this.total_page_num - 4){
                  html += "<b>...</b>"
                  html += "<span>" + this.total_page_num + "</span>"
            }

            html += "<strong class='end'>结尾</strong>"
            html += "<em class='next'>下一页</em>"

            this.pagination.innerHTML = html;

            // 调用新增的回调函数; 
            this.callback( this.index );
      }

      add(){
            if( this.index >= this.total_page_num - 1 ){
                  return false;
            }
            this.index ++
            this.renderBullet();
      }
      reduce(){
            if( this.index <= 0 ){
                  return false;
            }
            this.index --
            this.renderBullet();
      }
}
