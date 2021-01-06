<?php 
 
try {
	require_once("./connectBooks.php");
	$sql = "select * , GARD_VOTE/GARD_CLICK 'GARD_AVG' from garden";
	$products = $pdo->prepare($sql);
	$products->execute();
	$prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($prodRows); //把陣列編碼成json字串傳到前端 echo印出json字串
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>