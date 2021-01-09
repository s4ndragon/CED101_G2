function maxlength(obj, lg = 10) {    
    for (let i in document.querySelectorAll(obj)) {
        if (i.value.length > lg) {        i.value = i.value.slice(0, lg);    }
}
}
maxlength('input');
// 長度限制
// 全選帶有change事件
function chkAll(obj){
    var ischecked = obj.checked;
    $("input:checkbox[child]").each(function () {
        $(this).prop('checked',ischecked).change();
    });
};
// 表格內全選，DOM路徑table>tr>td>input:checkbox，移動到table>tr>td:first>input:checkbox
// <input type="checkbox" onclick="checkAll(this)">
function checkAll(obj) {
    $(obj).parent.parent.find('tr').each(function () {
        $(this).first.first.checked = obj.checked;
    });
}