
let locationPoint = document.getElementsByClassName("location");
let locationImg = document.getElementsByClassName("locationImg");
// console.log(locationPoint[2]);
for (var i = 0; i < locationImg.length; i++) {
    locationImg[i].addEventListener("mouseover", changeImage);
};
function changeImage() {

    this.src = `./images/tour/tour1.jpg`;
    this.addEventListener("mouseout", removeChangeImage);
};
function removeChangeImage() {
    this.src = "./images/common/location.png";
    this.addEventListener("mouseover", changeImage);
};

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