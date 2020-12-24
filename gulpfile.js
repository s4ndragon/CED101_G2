//開始開發時，請在終端機中寫 "gulp watch"
//最終生成的檔案都在dist中！

const { src, dest, series, parallel, watch } = require("gulp"); //src=來源, dest=目的地, 引入套件
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const fileinclude = require("gulp-file-include");

//move
function move() {
    //有return就不用cb
    // return src("a").pipe(dest("b")); 從a搬到b
    return src("src/images/*.*").pipe(dest("dist/"));
}
exports.copyImg = move; //原檔案若做修改，再做執行時會覆蓋掉目的地的檔案（更新）

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
    return src("src/js/*.js").pipe(uglify()).pipe(dest("dist/js"));
}
exports.ugjs = ugjs;

//sass轉css
function sassStyle() {
    return src("src/sass/*.scss").pipe(sass().on("error", sass.logError)).pipe(dest("dist/css"));
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
        .pipe(dest("dist/images"));
}
exports.imagemin = img;

//clean
function clearCss() {
    return src("dist/css/*.css", {
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

function clearImg() {
    //src  檔案路徑
    return src("dist/images/*.*", {
        read: false, //避免 gulp 去讀取檔案內容，讓刪除效能變好
        force: true, //強制刪除
        allowEmpty: true,
    }).pipe(clean());
}
exports.cleanImg = clearImg;

//html template
function includeHTML() {
    return src("src/*.html")
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(dest("dist/"));
    done();
}
// exports.html = includeHTML;

//babel (es6->es5)
function babels() {
    return src("js/*.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(dest("dist/js"));
}
exports.jsbabel = babels;

//html template
// function includeHTML() {
//     return src("src/layout/*.html")
//         .pipe(
//             fileinclude({
//                 prefix: "@@",
//                 basepath: "@file",
//             })
//         )
//         .pipe(dest("dist/"));
//     done();
// }
exports.wholehtml = includeHTML;
// exports.html = series(clearHtml, includeHTML);

function zipImg() {
    return src("src/images/*.*") //
        .pipe(imagemin())
        .pipe(dest("dist/images"));
}
exports.imagemin = zipImg;

//watch
function watchFile() {
    watch("src/sass/*.scss", series(clearCss, sassStyle)); //control z停止watch
    watch("src/js/*.js", ugjs);
    watch(["src/*.html", "src/nav.html", "src/footer.html"], series(clearHtml, includeHTML));
    // watch("src/images/*.*"), series(clearImg, zipImg)
}
exports.watch = watchFile;
