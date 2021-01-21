<?php
session_start();
// var_dump($_SESSION["MEM_NO"]);die;
require_once("./connect.php");
try {
    if(isset($_SESSION["MEM_ID"])){
    $mem_no=$_SESSION["MEM_NO"];
    $sqlE = "select GAME_POINT from `member`
    where MEM_NO = :MEM_NO";
    $query = $pdo->prepare($sqlE);
    $query->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);
	$query->execute();
    $return =$query->fetchAll(PDO::FETCH_ASSOC);
	$par=$return["GAME_POINT"];
    $sql = "update `member` SET GAME_POINT = :GAME_P where MEM_NO= :MEM_NO";
    $locations = $pdo->prepare($sql);
    $locations->bindValue(":MEM_NO", $mem_no);
    $locations->bindValue(":GAME_P", $_GET["score"]  + $par);
	$locations->execute();
	echo "已經獲得點數";
    }else{
    echo "您沒有登入，想要折扣請先登入。";
    }
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>