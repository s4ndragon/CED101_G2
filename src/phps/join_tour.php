<?php
session_start();  //啟用session
try{
  require_once("./connectBooks.php");
  $sql = "select * from MEMBER where MEM_NO = 2"; 
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
    $sql = "insert into TOUR_JOIN (TOUR_ID, MEM_NO) values (:TOUR_ID,:MEM_NO)";
    $jtour = $pdo->prepare($sql);
    //取得欲報名的揪團編號
    $jtour->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
    //取得會員資料
    $MEM_NO = $_SESSION["MEM_NO"];
    $jtour->bindValue(":MEM_NO", $MEM_NO);

	$jtour->execute();

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>