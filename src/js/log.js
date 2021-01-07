// 正臉，證件照，不要太嚴肅
// 聯絡資訊很重要必須寫在前面
// 第一印象
// 不要畢業照
// 如果想要生活照，背景不要雜亂， 
// 技能可以塞logo，技能用專有名詞
// html5 + css3 + js 
// vue + ajax
// php + mysql
// 要請教人
//檔案名稱分為主檔名、副檔名用split()分割
var filename='gicce.thtdtr.tcc';var filearr=filename.split('.');console.log(filearr);var lastname=filearr.pop();var firstname=filearr.join('.');
console.log(firstname);
console.log(lastname);
// [...(document.querySelectorAll('.checkAll'))].foreach(function(obj){
//     obj.onclick=function(){
//         var check=this.prop('checked');
//         $(obj).closest("table").find("tr").find("td").find(input:checkbox).first.prop('checked',check);
//     }   }
// checkbox預設沒選，按鈕文字編輯，按下時會勾選並且readonly="false"，按鈕文字="送出"
// 按下時變成不勾選時發出submit()，readonly="true"
// 勾了全選→如何讓被勾選的那一行屬性透過按鈕(編輯、submit())改變？