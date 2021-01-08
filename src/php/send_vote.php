<?php 
 
try {
	require_once("./connectBooks.php");
	$sql = "update garden set GARD_VOTE = GARD_VOTE + 1 where GARD_ID = 2";
    $garden = $pdo->prepare($sql);
    // $garden->bindValue(":GARD_VOTE", $_POST["GARD_VOTE"]);
	$garden->execute();

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>