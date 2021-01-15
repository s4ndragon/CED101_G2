<?php
session_start();  //啟用session
try{
  require_once("./connect.php");
  $sql = "select * from MEMBER where MEM_NO = 8"; 
  $member = $pdo->prepare($sql);
  $member->execute();

  
  	$memRow = $member->fetch(PDO::FETCH_ASSOC);
  	//將登入者的資訊寫入session
  	$_SESSION["MEM_NO"] = $memRow["MEM_NO"];  //$memRow["MEM_NO"]是資料庫欄位名稱
  	$_SESSION["MEM_ID"] = $memRow["MEM_ID"];
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>

<?php 
 
try {
	require_once("./connect.php");
	$sql = "insert into garden_msg_rep (MEM_NO, MSG_NO, MSG_REP_DATE, MSG_REP_CONTENT, MSG_REP_STATUS)
			values (:MEM_NO, :MSG_NO, NOW(), :MSG_REP_CONTENT, 0)";
	$report = $pdo->prepare($sql);
	$MEM_NO = $_SESSION["MEM_NO"];
	$report->bindValue(":MEM_NO", $MEM_NO);
	$report->bindValue(":MSG_NO", $_POST["MSG_NO"]);
	$report->bindValue(":MSG_REP_CONTENT", $_POST["MSG_REP_CONTENT"]);
	$report->execute();
	

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>