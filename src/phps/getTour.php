<?php 
 
try {
	require_once("./connect.php");
	$sql = "select *
    from tour a join garden b on a.gard_id = b.gard_id 
    order by TOUR_ID desc ";
	$tours = $pdo->prepare($sql);
	$tours->execute();
	$tours = $tours->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($tours);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "系統錯誤, 請通知系統維護人員<br>";
}
?>