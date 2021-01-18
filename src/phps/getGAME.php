<?php
try {
    require_once("./connect.php");
    $sql = "select * from game";
    $recommends = $pdo->prepare($sql);

    $recommends->execute();
    if ($recommends->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        //取回一筆資料
        $productRow = $recommends->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        echo json_encode($productRow);
    }
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};?>



?>