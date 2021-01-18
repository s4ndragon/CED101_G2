<?php
session_start();  //啟用session
try{
  require_once("./connect.php");
  $sql = "select * from member where MEM_NO = 5"; 
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
    $sql = "insert into garden_msg (GARD_ID, MEM_NO, MSG_DATE, MSG_CONTENT, MSG_CONTENT_STATUS)
            values (:GARD_ID, :MEM_NO, NOW(), :MSG_CONTENT, 1)";
    $words = $pdo->prepare($sql);
	$MEM_NO = $_SESSION["MEM_NO"];
	$words->bindValue(":MEM_NO", $MEM_NO);
    $words->bindValue(":GARD_ID", $_POST["GARD_ID"]);
    $words->bindValue(":MSG_CONTENT", $_POST["MSG_CONTENT"]);
	$words->execute();

	

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>