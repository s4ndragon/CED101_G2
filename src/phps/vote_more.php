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
	$sql = "select * , round(GARD_VOTE/GARD_CLICK,1) 'GARD_AVG' from GARDEN where GARD_ID = :GARD_ID order by GARD_AVG desc";
	$garden = $pdo->prepare($sql);
	$garden->bindValue(":GARD_ID", $_POST["GARD_ID"]);
	$garden->execute();
	$gardenRows = $garden->fetchAll(PDO::FETCH_ASSOC);
	

	$sql = "select VOTE_DATE from MEMBER where MEM_NO = :MEM_NO";
	$date = $pdo->prepare($sql);
	$MEM_NO = $_SESSION["MEM_NO"];
	$date->bindValue(":MEM_NO", $MEM_NO);
	$date->execute();
	$pastDate = $date->fetchAll(PDO::FETCH_ASSOC);

	$sql = "select * from TOUR join GARDEN on TOUR.GARD_ID = GARDEN.GARD_ID where GARDEN.GARD_ID = :GARD_ID";
	$tour = $pdo->prepare($sql);
	$tour->bindValue(":GARD_ID", $_POST["GARD_ID"]);
	$tour->execute();
	$tourRows = $tour->fetchAll(PDO::FETCH_ASSOC);

	//抓這個茶園的 留言 | 留言會員資料
	$sql = "select MEMBER.MEM_NICNAME, MEMBER.MEM_IMG, GARDEN_MSG.MSG_DATE, GARDEN_MSG.MSG_CONTENT, GARDEN_MSG.MSG_NO from
				 MEMBER join GARDEN_MSG on MEMBER.MEM_NO = GARDEN_MSG.MEM_NO where GARDEN_MSG.GARD_ID = :GARD_ID";
	$mem = $pdo->prepare($sql);
	$MEM_NO = $_SESSION["MEM_NO"];
	$mem->bindParam(":GARD_ID", $_POST["GARD_ID"]);
	$mem->execute();
	$msgRows = $mem->fetchAll(PDO::FETCH_ASSOC);
	

	$dataRows = [$gardenRows,$pastDate,$tourRows,$msgRows];
	echo json_encode($dataRows);  //把陣列編碼成json字串傳到前端 echo印出json字串

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>