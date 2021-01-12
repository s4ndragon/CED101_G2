<?
try {
    require_once("./connect.php");
    $sql = "select * from product_f where mem_no = :mem_no";
    $FavoriteList = $pdo->prepare($sql);
    $FavoriteList->bindValue(":mem_no", $_GET['mem_no']);
    $FavoriteList->execute();
    if ($FavoriteList->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        //取回一筆資料
        $productRow = $FavoriteList->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        echo json_encode($productRow);
    }
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};?>