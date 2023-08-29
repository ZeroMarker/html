window.addEventListener("load", () => {
      class Login {
            constructor() {

                  this.username = document.getElementById("username");
                  this.password = document.getElementById("password");
                  this.login_btn = document.getElementById("login_btn");
                  this.alert = document.getElementById("login-alert");

                  this.bindEvent();
                  this.usermsg = JSON.parse(sessionStorage.getItem("usermsg"));
                  if (this.usermsg !== null) {
                        this.writeUserMsg();
                  }
                  console.log(this.usermsg);
            }

            writeUserMsg() {
                  this.username.value = this.usermsg.username;
                  this.password.value = this.usermsg.password;
            }
            bindEvent() {
                  on(this.login_btn, "click", async () => {
                        let res = await this.login();

                        switch (res.code) {
                              case 1:
                                    this.success(res);
                                    break;
                              case 0:
                                    this.error(res);
                                    break;
                        }
                  });
            }
            login() {
                  let options = {
                        type: "POST",
                        url: "http://127.0.0.1:8888/users/login",
                        data: {
                              username: this.username.value,
                              password: this.password.value,
                        },
                        dataType: "json"
                  };

                  return ajax(options);
            }
            success(res) {
                  this.alert.classList.remove("alert-success", "alert-danger");
                  this.alert.classList.add("alert-success");
                  this.alert.innerHTML = "恭喜登陆成功稍后我们将为您跳转到首页";

                  setTimeout(() => {

                        cookie("TOKEN", res.token);
                        cookie("ID", res.user.id);

                        location.href = "./index.html";
                  }, 2000);
            }
            error(res) {
                  this.alert.classList.remove("alert-success", "alert-danger");
                  this.alert.classList.add("alert-danger");
                  this.alert.innerHTML = "抱歉登录失败 : " + res.message;

                  setTimeout(() => {
                        this.alert.classList.remove("alert-success", "alert-danger");
                  }, 2000)
            }
      }

      new Login;
});

