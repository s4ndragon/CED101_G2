<?php 
 
try {
	require_once("./connectBooks.php");
	$sql = "update garden set GARD_VOTE = GARD_VOTE + :GARD_VOTE, GARD_CLICK = GARD_CLICK + 1 where GARD_ID = :GARD_ID";
    $garden = $pdo->prepare($sql);
	$garden->bindValue(":GARD_VOTE", $_POST["GARD_VOTE"]);
	$garden->bindValue(":GARD_ID", $_POST["GARD_ID"]);
	$garden->execute();

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>