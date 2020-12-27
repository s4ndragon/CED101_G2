/*
 * data-star 所需star數
 * data-hp hp 當前血量
 * data-HP 總血量
 * data-defense 防御力
 * data-damage 攻擊力
 * data-speed 攻速
 */
/* star 星星數
 * starTimer  星星降落間
 * map 地圖
 * road 路
 * starNumber 展示分數的標籤
 * props 道具欄
 * plant 當前要種的植物 圖片
 * plantArr 全體植物
 * bullet 發射的子彈
 * zombies 僵屍數組
 * score 計分 初始值0
 */
var star = 25,
  score=0,
  starTimer = 3000,
  map = document.getElementById("map"),
  road = document.getElementById("road"),
  starNumber = document.getElementById("star-number"),
  props = document.getElementById("props"),
  plant = null,
  plantArr = [],
  bullet = [],
  wormArr = [],

  leaf_i=-1
  leaf=[],
  demo = {score:0}
  demo2={score:0};
  var init_worm,
  init_walk,
  init_Bullet,
  init_shot;
var sp_,
  time_b_,
  bb__,
  zom_,zarr_;
var tm= new TimelineMax();
//事件委托
map.onclick = function(e) {
  //選擇道具，傳入事件tag名稱 和類別名稱 和 檢查能源是否足夠
  if(e.target.tagName === "IMG" && e.target.className === "plant"&& e.target.dataset.star <= star) {
      clearStyle();
      e.target.className = "action plant";
      plant = e.target.cloneNode();
  }
  //當點擊時给star能源
  if(e.target.tagName === "IMG" && e.target.className === "star") {
    setStar(10);
    //誰被點擊 this就是誰 parentNode 就是 this的 父節點
    e.target.parentNode.removeChild(e.target);
  }
}
//放置植物
road.onclick = function(event) {
  //植物可擺放的區間
  if(event.offsetX > 25 && event.offsetX + 50 < this.offsetWidth) {
    if(!!plant && event.target.className !== "action plant") {
      plant.style.left = event.offsetX - 25 + 'px';
      //購買植物减去相應star
      setStar(-plant.dataset.star);
      //放置植物
      this.appendChild(plant);
      //植物數组
      plantArr.push(plant);console.log(plantArr)
      //戰鬥力為零 不發射子彈
      if(parseInt(plant.dataset.damage) !== 0) {
        //創建子彈
        bullet.push(createBullet(plant.dataset.speed, plant.dataset.damage, event.offsetX + 25));
      }
      //清除道具選中樣式
      clearStyle();
      //清除選中道具
      plant = null;
    }
  }
}
//清除道具選中樣式
function clearStyle() {
  var t = props.getElementsByTagName("img");
  for(var i = 0; i < t.length; i++) {
    t[i].className = "plant";
  }
}
//設置星星數 减去傳回負數、加则傳回正數
function setStar(n) {
  star += n;
  starNumber.innerText = star;
}
// 生成僵屍蟲子
function createworm(damage, defense, hp, speed) {
  var img = document.createElement("img");
  img.className = 'createZombies';
  img.src = '../dist/images/game/worm.gif';
  img.dataset.damage = damage;
  img.dataset.defense = defense;
  img.dataset.speed = speed;
  img.dataset.HP = hp;
  img.dataset.hp = hp;
  img.dataset.speed = speed;
  road.appendChild(img);
  return img;
}

function zarr(){
  wormArr.push(createworm(20, 5, 30, 1));
}

// 生成子彈
function createBullet(speed, damage, left) {
  /*
   * speed 射速
   * damage 傷害
   */
  var img = document.createElement("img");
  img.className = 'bullet';
  //設置到創建的子彈標籤上
  img.dataset.speed = speed;
  img.dataset.damage = damage;
  img.style.left = left + 'px';
  img.src = '../dist/images/game/6.gif';
  road.appendChild(img);
  return img;
}
//降落星星
function sp(){				//創建一个img標籤
        var img = document.createElement("img");
        //给img標籤赋值上我们写的star class
        img.className = "star";
        //将圖片地址赋值给src
        img.src = "../dist/images/game/giphy.webp";
        map.appendChild(img);
        //随機生成img的水平位置 而且不能超出地圖
        img.style.left = Math.random() * (map.offsetWidth - img.offsetWidth) + 'px';

        // leaf_i++;

        leaf[leaf.length]=setInterval(function(){
          let objs = document.querySelectorAll('img[src="../dist/images/game/giphy.webp"]');
          for(var img of objs){
            img.style.top = img.offsetTop + 2 + "px";        //
              if(img.offsetTop >= map.offsetHeight - img.offsetHeight) {
                map.removeChild(img);
              }
          }},100);

        // leaf=setInterval(function() {
        //   img.style.top = img.offsetTop + 5 + "px";
        //   // 碰到地圖边界 删除img
        //   if(img.offsetTop >= map.offsetHeight - img.offsetHeight) {
        //     map.removeChild(img);
        //   }
        // }, 100);
      }
// 間隔一段時間生成子彈
function time_b(){
  for(var i = 0; i < plantArr.length; i++) {
          //戰鬥力不為0
          if(parseInt(plantArr[i].dataset.damage) !== 0) {
            //創建子彈
            bullet.push(createBullet(plantArr[i].dataset.speed, plantArr[i].dataset.damage, plantArr[i].offsetLeft + 25));
          }
        }
      }
// 讓子彈飛
function bb_(){
  for(var i = 0; i < bullet.length; i++) {
          bullet[i].style.left = bullet[i].offsetLeft + parseInt(bullet[i].dataset.speed) + "px";
          for(var j = 0; j < wormArr.length; j++) {
            //打到蟲子身上了 -30的原因是 圖片有空白
            if(bullet[i].offsetLeft + bullet[i].offsetWidth - 30 >= wormArr[j].offsetLeft) {
              /*
               * data-star 所需star數
               * data-hp hp
               * data-defense 防禦力
               * data-damage 攻擊力
               * data-speed 攻速
               */
              if(bullet[i].offsetLeft - wormArr[j].offsetLeft - wormArr[j].offsetWidth < 5) {
                //計算傷害
                calcDamage(wormArr[j], bullet[i], '../dist/images/game/11.gif');
                //受傷狀態的
                wormState(j, wormArr[j], wormArr);
                //从地圖中删除
                road.removeChild(bullet[i]);
                //从數组中删除
                bullet.splice(i, 1);
                break;
              }
              //打到地圖外 删除子彈
              if(bullet[i].offsetLeft + bullet[i].offsetWidth > road.offsetWidth) {
                bullet[i].parentNode.removeChild(bullet[i]);
                //从數组中删除
                bullet.splice(i, 1);
              }
            }
          }
        }}
//tweenMax要求：產生蟲子後啟動動畫，觸發後刪除tweenMax
//產生→走路動畫→onUpdate(){if(wormArr[i].offsetLeft + wormArr[i].offsetWidth < 0){偵測}}→刪除
//用onUpdate(){}當watch監控偵測
// 蟲子走路
function zom(){
  for(var i = 0,th=wormArr.length; i < th; i++) {
  wormArr[i].style.left = wormArr[i].offsetLeft - parseInt(wormArr[i].dataset.speed) + "px";
  if(wormArr[i].offsetLeft + wormArr[i].offsetWidth < 0) {
    $("div.gameover").addClass("-on");//gameover開啟燈箱
        gamestop();//停止遊戲
    
    // location.reload();
  }
  for(var j = 0; j < plantArr.length; j++) {
    //蟲子和植物碰上了
    if(wormArr[i].offsetLeft <= plantArr[j].offsetLeft + plantArr[j].offsetWidth) {
      /*
       * data-star 所需star數
       * data-hp hp
       * data-defense 防御力
       * data-damage 攻擊力
       * data-speed 攻速
       */
      //植物在蟲子之后时 不卡主蟲子
      if(plantArr[j].offsetLeft + plantArr[j].offsetWidth - wormArr[i].offsetLeft < 5) {
        //讓蟲子止步
        wormArr[i].style.left = wormArr[i].offsetLeft + parseInt(wormArr[i].dataset.speed) + "px";
        calcDamage(plantArr[j], wormArr[i]);
        plantState(j, plantArr[j], plantArr);
        break;
      }
    }
  }
}}

//計算真實傷害
function calcDamage(keep, attack) {
  /*
   * kepp 被攻擊方
   * attack 攻擊方
   */
  //計算减免的傷害值 百分比*傷害
  //减血
  keep.dataset.hp = keep.dataset.hp - (attack.dataset.damage - (keep.dataset.defense / 100 * attack.dataset.damage));
}
function kill(index,role,roleArr){
  //如果生命值hp歸零，則刪除陣列中以及地圖上的角色，角色有plant、worm。
  if(parseInt(role.dataset.hp) <= 0) {
    if(!role.classList.contains("plant")){
      score+=role.dataset.HP*1;
      console.log(score);
    }
    roleArr.splice(index, 1);
    role.parentNode.removeChild(role);
  }
}

//植物狀態
function plantState(index, plant, plantArr) {
  //受傷啦 上绷带
  console.log(plant.dataset.hps);
  if(plant.dataset.hps * 0.5 > 　parseInt(plant.dataset.hp)) {
    if(parseInt(plant.dataset.damage) !== 0) {
      plant.src = '../dist/images/game/5.png';
    } else {
      plant.src = '../dist/images/game/Wallnut_cracked2.png';
    }
    kill(index,plant,plantArr);
  }
}
//蟲子狀態
function wormState(index, worm, wormArr) {
  //受傷啦 上绷带
  console.log(parseInt(worm.dataset.hp));
  if(worm.dataset.HP * 0.5 > 　parseInt(worm.dataset.hp)) {
    worm.src = '../dist/images/game/11-2.gif';
    kill(index,worm,wormArr);
  }
}
$(function() {
  $('.go').on('click', function () {
      sp_= setInterval("sp()", starTimer);//降落茶葉
  		time_b_=	setInterval("time_b()", 9000);//產生子彈
      bb__=setInterval("bb_()", 20);//移動子彈
      zom_=setInterval("zom()", 60);//生蟲
      zarr_ = setInterval("zarr()", 10000);//蟲子走路
      tween.play();
      init_Bullet=setInterval("Bullet_init()",9000);//生子彈
      init_shot=setInterval("shot()",20);//移動子彈
      init_worm=setInterval("wrom_init()",10000);//生蟲
    init_walk = setInterval("walk()", 60);//蟲子走路
    $('#pause').removeClass("none");
      $("div.overlay").addClass("-opacity-zero");
    // 設定隔一秒後，移除相關 class
    setTimeout(function(){
      $("div.overlay").removeClass("-on -opacity-zero");
    }, 1000); // 關閉 Modal
    document.getElementById('gotxt').innerText = `繼續驅蟲`;
  });
  $('#pause').on('click', function () {
    gamestop();
  tween.pause();
    $("div.overlay").addClass("-on");
    $(this).addClass("none");
  })
});

function gamestop(){
  document.getElementById('score-over').innerText = score;
  document.getElementById('score-win').innerText = score+1000;
  clearInterval(sp_);
  clearInterval(time_b_);
  clearInterval(bb__);
  clearInterval(zom_);
  clearInterval(zarr_);
  for(let i=0; i<leaf.length; i++){
  	clearInterval(leaf[i]);
  }
  clearInterval(init_Bullet);
  clearInterval(init_shot);
  clearInterval(init_worm);
  clearInterval(init_walk);
  leaf=[];
  leaf_i=-1;
  tween.pause();
  // tm.pause();
}
// 開啟 Modal 彈跳視窗
//時間到開啟通關燈箱
var tween = TweenLite.to(demo,300,{
  score:300,
  onUpdate(){
    // scoreDisplay.innerHTML = demo.score.toFixed(0);
  },onComplete:function(){
    gamestop();
    $(function () {
      $("div.gamewin").addClass("-on");
    });
  }
}).pause();
//現在要做：分四路，四路都生蟲子進攻而且隨機產生，四路皆能放植物守衛防守//因此要做三維陣列
//由上起算第二路有woromArr、plantArr
//單字有path way road
//降落星星茶葉打算用tweenMax下降以控制暫停pause(),繼續resume(),碰到邊界要自我刪除kill()
//用var img = document.createElement("img");產生得來的可否能用tweenLiteMax(img,2,{y:9});
/* 變數統一用k<3
完成三個道路放置植物

間隔一段時間生成子彈 time_b()包{createBullet()}
createBullet()注意road.appendChild要把road改成要針對的物件

改寫----
讓子彈飛
bb_()改成shot(){};for(var k=0;k<3;k++){};
產生子彈，改變 對象.appendChild
time_b()改成Bullet_init
createBullet()改成addBullet(){};
蟲子走路
zom()改成walk(){}
增加蟲子，改變 對象.appendChild
createworm()改成addworm(){}
增加蟲子外函式
zarr()改成worm_init(){addworm();}
*/
var path = {
    plantArr: [[], [], []], bullet: [[], [], []], wormArr: [[], [], []]
},
    way = document.getElementsByClassName('road');
// random = gsap.utils.random([0,1,2,3], true);
//三個道路放置植物
for(let k=0;k<3;k++){
  way[k].onclick=function(event){
      //植物可擺放的區間
      if(event.offsetX > 25 && event.offsetX + 50 < this.offsetWidth) {
        if(!!plant && event.target.className !== "action plant") {
          plant.style.left = event.offsetX - 25 + 'px';
          //購買植物减去相應star
          setStar(-plant.dataset.star);
          //放置植物
          this.appendChild(plant);
          //植物數组
          path.plantArr[k].push(plant);
          //戰鬥力為零 不發射子彈
          if(parseInt(plant.dataset.damage) !== 0) {
            //創建子彈
            path.bullet[k].push(addBullet(plant.dataset.speed, plant.dataset.damage, event.offsetX + 25,way[k]));
          }
          //清除道具選中樣式
          clearStyle();
          //清除選中道具
          plant = null;
        }
      }
  }
}
//產生新子彈，本身不加上for(){}
function addBullet(speed, damage, left,o) {
  /*   * speed 射速   * damage 傷害   */
  var img = document.createElement("img");
  img.className = 'bullet';
  //設置到創建的子彈標籤上
  img.dataset.speed = speed;
  img.dataset.damage = damage;
  img.style.left = left + 'px';
  img.src = '../dist/images/game/6.gif';
  o.appendChild(img);
  //o換上way[k];
  return img;
}
//init要加上for(){}
function Bullet_init(){
  for(var k=0;k<3;k++){
    for(var i = 0; i < path.plantArr[k].length; i++) {
            //戰鬥力不為0
            if(parseInt(path.plantArr[k][i].dataset.damage) !== 0) {
              //創建子彈
              path.bullet[k].push(addBullet(path.plantArr[k][i].dataset.speed, path.plantArr[k][i].dataset.damage, path.plantArr[k][i].offsetLeft + 25,way[k]));
            }
          }
  }

}
//讓子彈飛;path.bullet[k];path.wormArr[k];way[k];
function shot(){
  for(var k=0;k<3;k++){
    for(var i = 0; i < path.bullet[k].length; i++) {
            path.bullet[k][i].style.left = path.bullet[k][i].offsetLeft + parseInt(path.bullet[k][i].dataset.speed) + "px";
            for(var j = 0; j < path.wormArr[k].length; j++) {
              //打到蟲子身上了 -30的原因是 圖片有空白
              if(path.bullet[k][i].offsetLeft + path.bullet[k][i].offsetWidth - 30 >= path.wormArr[k][j].offsetLeft) {
                /*
                 * data-star 所需star數
                 * data-hp hp
                 * data-defense 防禦力
                 * data-damage 攻擊力
                 * data-speed 攻速
                 */
                if(path.bullet[k][i].offsetLeft - path.wormArr[k][j].offsetLeft - path.wormArr[k][j].offsetWidth < 5) {
                  //計算傷害
                  calcDamage(path.wormArr[k][j], path.bullet[k][i]);
                  //受傷狀態的
                  wormState(j, path.wormArr[k][j], path.wormArr[k]);
                  //从地圖中删除
                  way[k].removeChild(path.bullet[k][i]);
                  //从數组中删除
                  path.bullet[k].splice(i, 1);
                  break;
                }
                //打到地圖外 删除子彈
                if(path.bullet[k][i].offsetLeft + path.bullet[k][i].offsetWidth > road.offsetWidth) {
                  path.bullet[k][i].parentNode.removeChild(path.bullet[k][i]);
                  //从數组中删除
                  path.bullet[k].splice(i, 1);
                }
              }
            }
          }
  }

}
function addworm(damage, defense, hp, speed,o){
  var img = document.createElement("img");
  img.className = 'createZombies';
  img.src = '../dist/images/game/worm.gif';
  img.dataset.damage = damage;
  img.dataset.defense = defense;
  img.dataset.speed = speed;
  img.dataset.HP = hp;
  img.dataset.hp = hp;
  img.dataset.speed = speed;
  o.appendChild(img);
  return img;
}
function wrom_init(){
  // random = gsap.utils.random([0,1,2,3], true);
  random=parseInt(Math.random()*3);
  path.wormArr[random].push(addworm(20, 5, 30, 1,way[random]));
  // for(var k=0;k<3;k++){
  //     }
}

function walk(){//蟲子走路
  for(let k=0;k<3;k++){
    for(var i = 0,th=path.wormArr[k].length; i < th; i++) {
    path.wormArr[k][i].style.left = path.wormArr[k][i].offsetLeft - parseInt(path.wormArr[k][i].dataset.speed) + "px";
    if(path.wormArr[k][i].offsetLeft + path.wormArr[k][i].offsetWidth < 0) {
  $("div.gameover").addClass("-on");
  gamestop();
      // location.reload();
    }
    for(var j = 0; j < path.plantArr[k].length; j++) {
      //蟲子和植物碰上了
      if(path.wormArr[k][i].offsetLeft <= path.plantArr[k][j].offsetLeft + path.plantArr[k][j].offsetWidth) {
        /*
         * data-star 所需star數
         * data-hp hp
         * data-defense 防御力
         * data-damage 攻擊力
         * data-speed 攻速
         */
        //植物在殭屍之后时 不卡主殭屍
        if(path.plantArr[k][j].offsetLeft + path.plantArr[k][j].offsetWidth - path.wormArr[k][i].offsetLeft < 5) {
          //讓殭屍止步
          path.wormArr[k][i].style.left = path.wormArr[k][i].offsetLeft + parseInt(path.wormArr[k][i].dataset.speed) + "px";
          calcDamage(path.plantArr[k][j], path.wormArr[k][i]);
          plantState(j, path.plantArr[k][j], path.plantArr[k]);
          break;
        }
      }
    }
    }
  }
}


