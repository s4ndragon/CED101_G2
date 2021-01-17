<?php
session_start();  //啟用session
try{
  require_once("./connect.php");
  $sql = "select * from MEMBER where MEM_NO = 7"; 
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
	$sql = "select * from TOUR join GARDEN on TOUR.GARD_ID = GARDEN.GARD_ID where TOUR_ID = :TOUR_ID";
	$tour = $pdo->prepare($sql);
	$tour->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
	$tour->execute();
	$tourRows = $tour->fetchAll(PDO::FETCH_ASSOC);
	

	$MEM_NO = $_SESSION["MEM_NO"];
	$sql = "select TOUR_ID from TOUR_JOIN where MEM_NO = $MEM_NO";
	$tour2 = $pdo->prepare($sql);
	$tour2->execute();
	$memRows = $tour2->fetchAll(PDO::FETCH_ASSOC);
	
	$sql = "select * from TOUR join HOTEL on TOUR.HOTEL_ID = HOTEL.HOTEL_ID where TOUR_ID = :TOUR_ID";
	$hotel = $pdo->prepare($sql);
	$hotel->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
	$hotel->execute();
	$hotelRows = $hotel->fetchAll(PDO::FETCH_ASSOC);

	$sql = "select * from TOUR_RESTAURANT join RESTAURANT on TOUR_RESTAURANT.RESTAURANT_ID = RESTAURANT.RESTAURANT_ID where TOUR_ID = :TOUR_ID";
	$food = $pdo->prepare($sql);
	$food->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
	$food->execute();
	$foodRows = $food->fetchAll(PDO::FETCH_ASSOC);

	$sql = "select * from TOUR_MSG join MEMBER on TOUR_MSG.MEM_NO = MEMBER.MEM_NO where TOUR_MSG.TOUR_ID = :TOUR_ID";
	$msg = $pdo->prepare($sql);
	$MEM_NO = $_SESSION["MEM_NO"];
	$msg->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
	$msg->execute();
	$msgRows = $msg->fetchAll(PDO::FETCH_ASSOC);

	$dataRows=[$tourRows,$memRows,$hotelRows,$foodRows,$msgRows];
	echo json_encode($dataRows);

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>