<?php
session_start();  //啟用session
try{
  require_once("./connectBooks.php");
  $sql = "select * from MEMBER where MEM_NO = 1"; 
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
	require_once("./connectBooks.php");
	$sql = "update garden set GARD_VOTE = GARD_VOTE + :GARD_VOTE, GARD_CLICK = GARD_CLICK + 1 where GARD_ID = :GARD_ID";
    $garden = $pdo->prepare($sql);
	$garden->bindValue(":GARD_VOTE", $_POST["GARD_VOTE"]);
	$garden->bindValue(":GARD_ID", $_POST["GARD_ID"]);
	$garden->execute();

	$sql = "update member set VOTE_DATE = NOW() where MEM_NO = :MEM_NO";
    $time = $pdo->prepare($sql);
	$MEM_NO = $_SESSION["MEM_NO"];
	$time->bindValue(":MEM_NO", $MEM_NO);
	$time->execute();

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>