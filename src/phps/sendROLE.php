<!-- 主要表單，移除&修改更新 -->
<!-- 尚缺資料驗證可否被刪除、被修改 -->
<?php 
 try {
    require_once("./connect_game.php");
if(isset($_POST['update'])){
    $game=$_POST["NO[]"];
    foreach($game as $i => $data){
	$sql = "update `role` SET IMG= :IMG,DATA_HPS = :hps,DATA_HP = :hp,DATA_SPEED = :speed,DATA_DAMAGE = :damage,DATA_DEFENSE = :defense from ROLE   where ROLE_NO = :ROLE_NO ";
    $gamerole = $pdo->prepare($sql);
    $gamerole->bindValue(":IMG", $_POST["pic[]"][$i]);
    $gamerole->bindValue(":star", $_POST["star[]"][$i]);
    $gamerole->bindValue(":hp", $_POST["hp[]"][$i]);
    $gamerole->bindValue(":hps", $_POST["hps[]"][$i]);
    $gamerole->bindValue(":speed", $_POST["speed[]"][$i]);
	$gamerole->bindValue(":damage", $_POST["damage[]"][$i]);
	$gamerole->bindValue(":defense", $_POST["defense[]"][$i]);
	$gamerole->execute();
    }
    echo "操作完成";
}else{
    $game=$_POST["NO[]"];
    foreach($game as $i => $data){
	$sql = "delete from `role` where `ROLE_NO` = :ROLE_NO";
    $gamerole = $pdo->prepare($sql);
    $gamerole->bindValue(":ROLE_NO", $_POST["NO[]"][$i]);
	$gamerole->execute();
    }
    echo "刪除成功";
}
} catch (PDOException $e) {
	$pdo->rollBack();
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>