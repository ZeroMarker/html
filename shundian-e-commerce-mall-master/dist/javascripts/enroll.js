window.addEventListener("load", () => {

      class Register {
            constructor() {
                  this.btn = document.getElementById("enroll_btn");
                  this.username = document.getElementById("username");
                  this.password = document.getElementById("password");
                  this.rpassword = document.getElementById("rpassword");
                  this.alert = document.getElementById("enroll-alert");
                  this.bindEvent();
            }

            bindEvent() {
                  on(this.btn, "click", () => {
                        this.register();
                  });
            }
            async register() {
                  let options = {
                        url: "http://127.0.0.1:8888/users/register",
                        data: {
                              username: this.username.value,
                              password: this.password.value,
                              rpassword: this.rpassword.value,
                              nickname: this.username.value 
                        },
                        type: "POST",
                        dataType: "json"
                  };
                  let res = await ajax(options);
                  console.log(res);

                  switch (res.code) {
                        case 0:
                              this.error(res);
                              break;
                        case 1:
                              this.success();
                              break;
                  }
            }
            error(res) {
                  this.alert.classList.remove("alert-success", "alert-danger");
                  this.alert.classList.add("alert-danger");
                  this.alert.innerHTML = "抱歉注册失败 : " + res.message;

                  setTimeout(() => {
                        this.alert.classList.remove("alert-success", "alert-danger");
                  }, 2000)
            }
            success() {
                  this.alert.classList.remove("alert-success", "alert-danger");
                  this.alert.classList.add("alert-success");
                  this.alert.innerHTML = "恭喜注册成功稍后我们将为您跳转页面";

                  setTimeout(() => {
                        location.href = "./login.html";
                        sessionStorage.setItem("usermsg", JSON.stringify({
                              username: this.username.value,
                              password: this.password.value
                        }));
                  }, 2000)
                  console.log(username,password);
            }
      }

      let r = new Register;

});