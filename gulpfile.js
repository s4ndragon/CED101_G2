const { src, dest, series, parallel, watch } = require("gulp"); //src=來源, dest=目的地, 引入套件
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const fileinclude = require("gulp-file-include");

//合併檔案
function concatCss() {
    return src("css/*.css") // '*.css'是所有的css檔案 '*.*'是所有檔案（不管類型）
        .pipe(concat("all.css")) //合併成all.css這個檔案
        .pipe(dest("css")); //目的地為app/css
}
exports.concat = concatCss;

//rename
function change() {
    return src("css/*.css")
        .pipe(
            rename(function (path) {
                path.basename += "-change";
                path.extname = ".css";
            })
        )
        .pipe(dest("css"));
}
exports.renameCss = change;

//uglify 壓縮
function ugjs() {
    return src("js/*.js").pipe(uglify()).pipe(dest("app/js"));
}
exports.ugjs = ugjs;

//sass轉css
function sassStyle() {
    return src("./sass/*.scss").pipe(sass().on("error", sass.logError)).pipe(dest("./css"));
}
exports.sass = sassStyle;

//壓縮圖片
function img() {
    return src("./images/*.*") //
        .pipe(imagemin())
        .pipe(
            rename(function (path) {
                path.basename += "-min";
            })
        )
        .pipe(dest("app/images"));
}
exports.imagemin = img;

//clean
function clearCss() {
    return src("app/css/*.css", {
        read: false,
        force: true, //force to delete
    }).pipe(clean());
}
exports.del = clearCss;
function clearHtml() {
    //src  檔案路徑
    return src("dist/*.html", {
        read: false, //避免 gulp 去讀取檔案內容，讓刪除效能變好
        force: true, //強制刪除
        allowEmpty: true,
    }).pipe(clean());
}
exports.cleanHTML = clearHtml;

//html template
function includeHTML() {
    return src("*.html")
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(dest("app/"));
    done();
}
exports.html = includeHTML;

//watch
function watchFile() {
    watch("sass/*.scss", series(clearCss, sassStyle)); //control z停止watch
    watch("js/*.js", ugjs);
    watch(["*.html", "layout/*.html"], series(clearHtml, includeHTML));
}
exports.watch = watchFile;

//babel (es6->es5)
function babels() {
    return src("js/*.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(dest("app/js"));
}
exports.jsbabel = babels;

//html template 
function includeHTML() {
    return src("*.html")
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(dest("app/"));
    done();
}
exports.html = series(clearHtml, includeHTML);