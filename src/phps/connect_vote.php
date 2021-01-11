<?php 
try {
	require_once("./connectBooks.php");
	$sql = "select * from garden where GARD_ID = ?";
	$garden = $pdo->prepare($sql);
	$garden->bindValue(1, $_GET["GARD_ID"]); //第一個問號綁定的值是form表單傳來的資料$_GET["psn"]
	$garden->execute();
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>