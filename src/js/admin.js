//按左側換右側
window.addEventListener("load", function (e){
    e.preventDefault();
	function go(i){
		let program = ["admin_admin.html", "admin_member.html","admin_custom.html","admin_shop.html","admin_report.html"];
		location.href = program[i];
	}
	let menuUl = document.querySelectorAll("ul.nav_list li a");
	for(let i=0; i<menuUl.length;i++){
		menuUl[i].onclick = function(){
			go(i);
		}
	}



})	
