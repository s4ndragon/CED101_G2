<?php 
// session_start()
 
try {
	require_once("./connect.php");
	$sql = "select a.*, b.*, 
	(select count(*) from art_msg where a.ART_NO = ART_NO and MSG_STATUS = 1) 
	AS msg from my_art a join member b 
	on a.MEM_NO = b.MEM_NO 
	where a.ART_STATUS = 1 
	order by a.ART_DATE desc";
	$articles = $pdo->prepare($sql);
	$articles->execute();
	$articlesRows = $articles->fetchAll(PDO::FETCH_ASSOC);
	// echo json_encode($articlesRows);
	 



	$sql = "select * from art_favorite where MEM_NO=2";
	$art_favorite = $pdo->prepare($sql);
	// $sql = "select ART_NO from art_favorite where MEM_NO=:MEM_NO";
	// $art_favorite->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);
	$art_favorite->execute();
	$art_favoriteRows = $art_favorite->fetchAll(PDO::FETCH_ASSOC);
	// echo json_encode($art_favoriteRows);
	$result = [$articlesRows, $art_favoriteRows];
	echo json_encode($result);

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>
