<?
try {
    require_once("./connect.php");
    $sql = "select * from orders where ORDERS_NO = :orderNo";
    $orderInfo = $pdo->prepare($sql);
    $orderInfo->bindValue(":orderNo", $_POST['orderNo']);
    $orderInfo->execute();
    if ($orderInfo->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        //取回一筆資料
        $info = $orderInfo->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        require_once("./connect.php");
        // $sql = "select * from orderlist where ODRDER_NO = :orderNo";
        $sql = "select o.PSN, o.QUANTITY, p.PRICE from orderlist o join product p  where o.ODRDER_NO = :orderNo";
        $orderList = $pdo->prepare($sql);
        $orderList->bindValue(":orderNo", $_POST['orderNo']);
        $orderList->execute();
        $products=$orderList->fetchAll(PDO::FETCH_ASSOC);
        $v=[$info,$products];
        echo json_encode($v);
    }
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};?>