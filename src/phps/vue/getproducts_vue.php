<?
try {
    require_once("./connect.php");
    $orderby =htmlspecialchars($_GET['orderby']);
    if(strlen($orderby)<20){
        $sql = "select * from product  where ONSALE = 1 order by $orderby";
        $products = $pdo->prepare($sql);
        $products->execute();
    }else{
            echo '篩選條件錯誤，請重新設定。';
    }

    if ($products->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        $productRow = $products->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        echo json_encode($productRow);
    }
} catch (PDOException $e) {
    echo "錯誤行號 : " . $e->getLine() . "<br>"; //"->"唸成"的"
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
};?>