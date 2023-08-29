function on(dom, event_name, handler_selector, delegation_handler) {
      if (typeof handler_selector === "string" && typeof delegation_handler === "function") {
            return delegation(dom, event_name, handler_selector, delegation_handler);
      }
      // 在dom对象里面建立一个事件名 : 事件处理函数对应的数组; 
      // 判定当前事件处理函数是否在dom对象之中;
      var event_type = "_" + event_name;
      if (event_type in dom) {
            dom[event_type].push(handler_selector);
      } else {
            dom[event_type] = [handler_selector];
      }
      // 如果直接用事件名当成对象之中的key值，那么会和原有的dom功能名称冲突; 
      // 因为特殊的事件名会导致事件无法触发，所以我们在这里要对事件名进行拆分处理; 
      dom.addEventListener(event_name.split(".")[0], handler_selector)
}
function off(dom, event_name) {
      // 获取到dom对象里面事件名对应的一组事件处理函数; 
      var callback_list = dom["_" + event_name];
      // 根据列表里面的所有函数进行事件移除 ; 
      callback_list.forEach(function (event_handler) {
            dom.removeEventListener(event_name.split(".")[0], event_handler);
      })
      // 清空dom对象里面的事件处理函数组; 
      dom["_" + event_name].length = 0;
}

function trigger(dom, event_type) {
      dom.dispatchEvent(new Event(event_type));
}

function delegation(dom, event_name, selector, event_handler) {
      dom.addEventListener(event_name, function (e) {
            e = e || event;
            var target = e.target || e.srcElement;

            try {
                  while (target !== dom) {
                        e.origin = target;
                        switch (selector[0]) {
                              case ".":
                                    if (selector.slice(1) === target.className) {

                                          event_handler.call(target, e)
                                          return;
                                    }
                              case "#":
                                    if (selector.slice(1) === target.id) {
                                          event_handler.call(target, e)
                                          return;
                                    }
                              default:
                                    if (selector.toUpperCase() === target.nodeName) {
                                          event_handler.call(target, e)
                                          return;
                                    }
                        }
                        target = target.parentNode;
                  }
            } catch (e) {
            }

      })
}


function animate(dom, attrs, callback, transition = "buffer", speed = 10) {
      // transition : 有两种动画方式 "buffer" , "liner"
      var _style = getComputedStyle(dom);

      // - 1. 数据变形 ; 
      for (var attr in attrs) {
            attrs[attr] = {
                  target: attrs[attr],
                  now: _style[attr]
            }
            // - 2. 速度 : 匀速运动速度正负 ; 
            if (transition === "liner") {
                  attrs[attr].speed = attrs[attr].target > attrs[attr].now ? speed : - speed;
            }

            if (attr === "opacity") {
                  attrs[attr].target *= 100
                  attrs[attr].now *= 100
            } else {
                  attrs[attr].now = parseInt(attrs[attr].now)
            }
      }
      // - 关闭开启定时器;    
      clearInterval(dom.interval);
      dom.interval = setInterval(function () {
            for (var attr in attrs) {
                  // 取出当前值和属性值 ; 
                  // attrs[attr].target : 目标值; 
                  // attrs[attr].now    : 当前值; 

                  let { target, now } = attrs[attr];

                  // 缓冲运动时候的速度; 
                  if (transition === "buffer") {
                        var speed = (target - now) / 10;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                  } else if (transition === "liner") {
                        var speed = attrs[attr].speed;
                  }


                  if (Math.abs(target - now) <= Math.abs(speed)) {

                        if (attr === "opacity") {
                              dom.style[attr] = target / 100;
                        } else {
                              dom.style[attr] = target + "px";
                        }

                        delete attrs[attr];
                        for (var attr in attrs) {
                              // 如果有数据循环会执行至少一次; 
                              return false;
                        }
                        clearInterval(dom.interval);
                        typeof callback === "function" ? callback() : "";
                  } else {
                        now += speed;

                        if (attr === "opacity") {
                              dom.style[attr] = now / 100;
                        } else {
                              dom.style[attr] = now + "px";
                        }
                        // 给对象赋值; 
                        attrs[attr].now = now;
                  }
            }
      }, 30)
}
var throttling = (function () {
      var t = null;
      return function (callback, delay = 200) {
            // 如果t不是null那么我们就不允许代码执行; 
            if (t !== null) {
                  return;
            }
            t = setTimeout(function () {
                  // 放入你想要执行的代码; 
                  callback();
                  // 重置t;
                  t = null;
            }, delay)
      }
})();


class LazyLoad {
      constructor(selector) {
            this.imgs = Array.from(document.querySelectorAll(selector));
            this.top_list = this.imgs.map(ele => this.getAbsTop(ele));
            //BUG 只要页面不滚动，首屏图片是无法显示的; 
            this.bindEvent();
            window.dispatchEvent(new Event("scroll"));
      }
      getAbsTop(ele) {
            // 你当前的定位元素是不是body; 
            if (ele.offsetParent !== document.body) {
                  return ele.offsetTop + this.getAbsTop(ele.offsetParent)
            }
            return ele.offsetTop;
      }
      bindEvent() {
            // 给页面绑定卷动事件; 
            window.addEventListener("scroll", () => {
                  throttling(this.toggleAttr.bind(this));
            })
      }

      toggleAttr() {
            for (let i = 0; i < this.top_list.length; i++) {
                  if (this.top_list[i] <= scrollY + innerHeight) {
                        // 图片如果已经加载了那就直接删除掉这个图片就可以了; 
                        let loadImg = new Image();
                        loadImg.src = this.imgs[i].getAttribute("data-src");

                        let img = this.imgs[i]

                        loadImg.onload = () => {
                              img.src = img.getAttribute("data-src");
                        }
                        this.imgs.splice(i, 1)
                        this.top_list.splice(i, 1)
                        i--;
                        // 删除掉对应的元素和高度信息; 

                  }
            }
      }

}

function ajax(options) {
      var xhr = new XMLHttpRequest();
      // 处理data数据; 
      // 遍历data数据把data数据变成一个字符串; 
      // "key=value&key2=value"

      options = Object.assign({
            type: "GET"
      }, options);


      var data = "";
      for (var key in options.data) {
            data += "&" + key + "=" + options.data[key];
      }
      data = data.slice(1);

      // 什么时候我们想url拼接请求数据 ; 
      // 为GET的请情况下把数据拼接到url上面 ;
      if (options.type.toUpperCase() === "GET") {
            options.url += (/\?/.test(options.url) ? "&" : "?") + data;
      }

      if(options.credentials){
            xhr.withCredentials = true;
      }

      xhr.open(options.type, options.url, true);
      if (options.type.toUpperCase() === "POST") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      }

      // 判定 this.headers 是对象; 
      if( typeof options.headers === "object" && options.headers !== null && !(options.headers instanceof Array)){
            for(var attr in options.headers){
                  xhr.setRequestHeader(attr , options.headers[attr]);
            }
      }     
      


      // 如果是post请求，数据用send放在请求体之中; 
      xhr.send(options.type.toUpperCase() === "POST" ? data : null);

    

      return new Promise(function (fulfill, reject) {
            xhr.onreadystatechange = function () {
                  // 根据xhr状态码和http状态码，对回调函数进行调用处理; 
                  // - 成功 ; 
                  // - 失败 ; 
                  if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                        // 获取响应结果; 
                        var res = xhr.responseText;
                        // 判定结果处理类型; 
                        switch (options.dataType) {
                              case "json":
                                    // 把json字符串转换成对象类型
                                    res = JSON.parse(res);
                                    break;
                              case "text":
                                    res = res.replace(/([<>])/g, function ($1) {
                                          // 这个函数的返回值去替换我们查询到的字符; 
                                          switch ($1) {
                                                case "<":
                                                      return "&lt;";
                                                case ">":
                                                      return "&gt;";
                                          }
                                    });
                                    break;
                              case "html": break;
                        }
                        fulfill(res);
                        typeof options.success === "function" ? options.success(res) : "";
                  } else if (xhr.readyState === 4) {
                        typeof options.error === "function" ? options.error() : "";
                        reject(xhr.status);
                  }
            }
      })
}

function cookie(name, value, options = {}) {

      // setCookie 
      if (typeof name === "string" && (typeof value === "string" || typeof value === "number")) {
         
            // 因为日期对象比较特殊所以我们需要先创建日期对象; 
            // 传入的数据要求是number 类型, 代表的涵义是cookie在几天之后过期; 
            if (typeof options.expires === "number") {
                  var d = new Date();
                  d.setDate(d.getDate() + options.expires);
                  options.expires = d;
            }
            // 把所有的参数拼接成符合cookie规则的字符串;
            return document.cookie = [
                  name, "=", value,
                  typeof options.path === "string" ? ";path=" + options.path : "",
                  typeof options.domain === "string" ? ";domain=" + options.domain : "",
                  typeof options.expires === "object" ? ";expires=" + options.expires : ""
            ].join("");
      }
      // removeCookie 
      if (typeof name === "string" && value === null) {
            return cookie(name, "delete", Object.assign({
                  expires: - 1
            }, options))
      }
      // getCookie 
      if (typeof name === "string") {
            // 拆分的依据一定是 : 分号*空格*; 一定要记住是有空格的;
            var cookie_array = document.cookie.split("; ");
            // 遍历cookie数组查询正确的cookie数据; 
            for (var i = 0; i < cookie_array.length; i++) {
                  var item = cookie_array[i].split("=")
                  if (item[0] === name) {
                        return item[1];
                  }
            }
            return "";
      }
}