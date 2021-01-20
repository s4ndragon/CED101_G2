

<?php 
 session_start();
try {
	require_once("./connect.php");
	$sql = "select * , round(GARD_VOTE/GARD_CLICK,1) 'GARD_AVG' from garden where GARD_ID = :GARD_ID order by GARD_AVG desc";
	$garden = $pdo->prepare($sql);
	$garden->bindValue(":GARD_ID", $_POST["GARD_ID"]);
	$garden->execute();
	$gardenRows = $garden->fetchAll(PDO::FETCH_ASSOC);
	
	if(isset($_SESSION["MEM_NO"])){
		$sql = "select VOTE_DATE from member where MEM_NO = :MEM_NO";
		$date = $pdo->prepare($sql);
		$MEM_NO = $_SESSION["MEM_NO"];
		$date->bindValue(":MEM_NO", $MEM_NO);
		$date->execute();
		$pastDate = $date->fetchAll(PDO::FETCH_ASSOC);
	}else{
		$pastDate = "{}";
	}
	

	$sql = "select * from tour join garden on tour.GARD_ID = garden.GARD_ID where garden.GARD_ID = :GARD_ID or garden.GARD_ID = 6 limit 3";
	$tour = $pdo->prepare($sql);
	$tour->bindValue(":GARD_ID", $_POST["GARD_ID"]);
	$tour->execute();
	$tourRows = $tour->fetchAll(PDO::FETCH_ASSOC);

	//抓這個茶園的 留言 | 留言會員資料
	$sql = "select member.MEM_NICNAME, member.MEM_IMG, garden_msg.MSG_DATE, garden_msg.MSG_CONTENT, garden_msg.MSG_NO from
			 member join garden_msg on member.MEM_NO = garden_msg.MEM_NO where garden_msg.GARD_ID = :GARD_ID";
	$mem = $pdo->prepare($sql);
	$mem->bindParam(":GARD_ID", $_POST["GARD_ID"]);
	$mem->execute();
	$msgRows = $mem->fetchAll(PDO::FETCH_ASSOC);

	

	if(isset($_SESSION["MEM_NO"])){
		$sql = "select TOUR_ID from tour_collect where MEM_NO = :MEM_NO";
		$like = $pdo->prepare($sql);
		$MEM_NO = $_SESSION["MEM_NO"];
		$like->bindValue(":MEM_NO", $MEM_NO);
		$like->execute();
		$likeRows_1 = $like->fetchAll(PDO::FETCH_ASSOC);
		$likeRows = [];
		for($k=0;$k < count($likeRows_1);$k++){
			array_push($likeRows,$likeRows_1[$k]["TOUR_ID"]);
		};
	}else{
		$likeRows = "{}";
	}
	


	for($k=0;$k<count($tourRows);$k++){

		if(in_array($tourRows[$k]["TOUR_ID"],$likeRows)){
			$tourRows[$k]["img"] = "./images/common/like.png";
		}else{
			$tourRows[$k]["img"] = "images/common/heart.png";
		}
	}
	



	$dataRows = [$gardenRows,$pastDate,$tourRows,$msgRows,$likeRows];
	echo json_encode($dataRows);  //把陣列編碼成json字串傳到前端 echo印出json字串

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>