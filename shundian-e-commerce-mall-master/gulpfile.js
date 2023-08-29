const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
// const babel = require("gulp-babel");
const sass = require("gulp-sass")(require('sass'));
const browsersync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const uglify  = require("gulp-uglify");
const cleancss = require("gulp-clean-css");
const del = require('del');
const header = require("gulp-header");

const banner = ['/*!\n',
  ' * GP-NB-CLI - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2010-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> \n',
  ' */\n',
  '\n'
].join('');

let project_msg = {
      pkg : {
            title : "PC-WEB",
            version : "0.0.1",
            homepage : "http://www.mobiletrain.org/",
            author : "gongyangwuyi",
            license : "MIT"
      }
};

gulp.task("html" , async ()=>{
      // 带有规则的字符串路径; 
      // * 表示所有 ; 
      gulp.src(["./src/*.html"])
      // 对html多增加一个插件处理; 
      .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
      }))
      .pipe(gulp.dest("./dist"))
});

// - 我们使用babel进行编译; 
gulp.task("js" , async ()=>{
      gulp.src(["./src/javascripts/*.js"])
      // 把ES6语法转义成ES5语法; 
      // .pipe(babel({
      //       presets: ['@babel/env']
      // }))
      .pipe(gulp.dest("./dist/javascripts"))
});


gulp.task("scss" , async ()=>{
      gulp.src(["./src/scss/*.scss"])
      // sass : 把scss文件编译成css文件; 
      // 添加 error 事件，让scss报错不终止gulp监听; 
      .pipe(sass().on("error" , sass.logError))
      .pipe(gulp.dest("./dist/css"))
});

gulp.task("watch" , async ()=>{
      gulp.watch(["./src/*.html"] , gulp.series("html" , browserSyncReload));
      gulp.watch(["./src/javascripts/*.js"] , gulp.series("js" ,  browserSyncReload));
      gulp.watch(["./src/scss/*.scss"] , gulp.series("scss" ,  browserSyncReload));
});

gulp.task("browserSync" , async () => {
      browsersync.init({
        server: {
          baseDir: "./"
        },
        port: 3000
      });
});

function browserSyncReload(done) {
      browsersync.reload();
      done();
}

function clearDir(done){
      del(["./dist/**/*"]);
      setTimeout( function(){
            done();
      } , 1000)
}

gulp.task("min" , async () => {
      await gulp.src("./src/*.html")
            .pipe(fileinclude({
                  prefix: '@@',
                  basepath: '@file'
            }))
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest("./dist/"));

      await gulp.src("./src/javascripts/*.js")
            .pipe(babel({
                  presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(header( banner , project_msg))
            .pipe( gulp.dest("./dist/javascripts"))

      await gulp.src(["./src/scss/*.scss"])
            // sass : 把scss文件编译成css文件; 
            // 添加 error 事件，让scss报错不终止gulp监听; 
            .pipe(sass().on("error" , sass.logError))
            .pipe(cleancss({compatibility: 'ie8'}))
            .pipe(header( banner , project_msg))
            .pipe(gulp.dest("./dist/css"));
});

var build = gulp.series(clearDir , "min");
exports.build = build;
// default指令 :  gulp default( default 可以省略);
gulp.task("default" , gulp.series(clearDir, "html" , "js" , "scss", "watch" , "browserSync"));

