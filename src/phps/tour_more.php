<?php 
 
try {
	require_once("./connectBooks.php");
	$sql = "select * from TOUR join GARDEN on TOUR.GARD_ID = GARDEN.GARD_ID";
	$tour = $pdo->prepare($sql);
	$tour->execute();
	$tourRows = $tour->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($tourRows); //把陣列編碼成json字串傳到前端 echo印出json字串

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>