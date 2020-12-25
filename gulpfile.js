//開始開發時，請在終端機中寫 "gulp watch"
//最終生成的檔案都在dist中！

const {
    src,
    dest,
    series,
    parallel,
    watch
} = require("gulp"); //src=來源, dest=目的地, 引入套件
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const fileinclude = require("gulp-file-include");

//搬運圖片（src->dist）
function moveImg() {
    return src("src/images/**/*.*").pipe(dest("dist/images/"));
}
exports.moveImg = moveImg;

//搬運js（src->dist）
function moveJs() {
    return src("src/js/*.js").pipe(dest("dist/js/"));
}
exports.moveJs = moveJs;

//將css合併成一隻檔案
function concatCss() {
    return src("dist/css/*.css") // '*.css'是所有的css檔案 '*.*'是所有檔案（不管類型）
        .pipe(concat("all.css")) //合併成all.css這個檔案
        .pipe(dest("dist/css")); //目的地為app/css
}
exports.concat = concatCss;

//rename
// function change() {
//     return src("css/*.css")
//         .pipe(
//             rename(function (path) {
//                 path.basename += "-change";
//                 path.extname = ".css";
//             })
//         )
//         .pipe(dest("css"));
// }
// exports.renameCss = change;

//將js檔案壓縮至dist
function ugjs() {
    return src("src/js/*.js").pipe(uglify()).pipe(dest("dist/js"));
}
exports.ugjs = ugjs;

const sourcemaps = require('gulp-sourcemaps'); //追溯css的sass
//sass轉css
function sassStyle() {
    return src("src/sass/*.scss").pipe(sourcemaps.init()).pipe(sass().on("error", sass.logError)).pipe(sourcemaps.write()).pipe(dest("dist/css"));
}
exports.sass = sassStyle;

//壓縮圖片
// function img() {
//     return src("./images/*.*") //
//         .pipe(imagemin())
//         .pipe(
//             rename(function (path) {
//                 path.basename += "-min";
//             })
//         )
//         .pipe(dest("dist/images"));
// }
// exports.imagemin = img;

//刪除css
function cleanAll() {
    return src('dist', {
        read: false,
        force: true,
        allowEmpty: true,
    }).pipe(clean());
}
exports.cleanAll = cleanAll;


function clearCss() {
    return src("dist/css", {
        read: false,
        force: true, //force to delete
        allowEmpty: true,
    }).pipe(clean());
}
exports.del = clearCss;

//刪除html
function clearHtml() {
    //src  檔案路徑
    return src("dist/*.html", {
        read: false, //避免 gulp 去讀取檔案內容，讓刪除效能變好
        force: true, //強制刪除
        allowEmpty: true,
    }).pipe(clean());
}
exports.cleanHTML = clearHtml;

//刪除圖片
function clearImg() {
    //src  檔案路徑
    return src("dist/images", {
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
exports.html = includeHTML;

//babel (es6->es5)
// function babels() {
//     return src("js/*.js")
//         .pipe(
//             babel({
//                 presets: ["@babel/env"],
//             })
//         )
//         .pipe(dest("dist/js"));
// }
// exports.jsbabel = babels;

function zipImg() {
    return src("src/images/**/*.*") //
        .pipe(imagemin())
        .pipe(dest("dist/images"));
}
exports.imagemin = zipImg;

//watch
function watchFile() {
    watch("src/sass/*.scss", series(clearCss, sassStyle));
    watch("src/js/*.js", moveJs);
    watch(["src/*.html", "src/nav.html", "src/footer.html"], series(clearHtml, includeHTML));
    watch("src/images/**/*.*", series(clearImg, moveImg))
}
exports.watch = watchFile;


//上線版
function uploadFile() {
    watch("src/sass/*.scss", series(clearCss, sassStyle));
    watch("src/js/*.js", ugjs);
    watch(["src/*.html", "src/layout/*.html"], series(clearHtml, includeHTML));
    watch("src/images/**/*.*", series(clearImg, zipImg))
}
exports.upload = uploadFile;