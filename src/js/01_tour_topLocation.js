

let locationArea = document.getElementsByClassName("location");
let allLocal = document.getElementById("allLocal");
let nLocal = document.getElementById("nLocal");
let cLocal = document.getElementById("cLocal");
let sLocal = document.getElementById("sLocal");
allLocal.addEventListener("click", removeStyle);
function removeStyle() {
    for (var i = 0; i < locationArea.length; i++) {
        locationArea[i].removeAttribute("style");
    };
};

nLocal.addEventListener("click", function () {
    removeStyle();
    for (var i = 3; i < locationArea.length; i++) {
        locationArea[i].style.display = "none";
    };
});
cLocal.addEventListener("click", function () {
    removeStyle();
    for (var i = 0; i < 3; i++) {
        locationArea[i].style.display = "none";
    };
    for (var i = 7; i < locationArea.length; i++) {
        locationArea[i].style.display = "none";
    };
});
sLocal.addEventListener("click", function () {
    removeStyle();
    for (var i = 0; i < 7; i++) {
        locationArea[i].style.display = "none";
    };
});