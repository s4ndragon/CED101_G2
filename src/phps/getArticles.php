<?php 
 
try {
	require_once("./connect.php");
	$sql = "select * from my_art a join member b on a.MEM_NO = b.MEM_NO where ART_STATUS = 1 order by ART_DATE desc";
	$articles = $pdo->prepare($sql);
	$articles->execute();
	$articlesRows = $articles->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($articlesRows);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>
