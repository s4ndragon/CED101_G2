<?
try {
    require_once("./connect.php");
        if($_GET['orderby']=='PRICE'){
            $sql = "select * from product  order by PRICE ASC";
        }else if($_GET['orderby']=="DATE_DESC"){
            $sql = "select * from product  order by DATE DESC";

        }else if($_GET['orderby']=="PRICE_DESC"){
            $sql = "select * from product  order by PRICE DESC";

        }else if($_GET['orderby']=="SOLD_DESC"){
            $sql = "select * from product  order by SOLD DESC";
        }

        // $sql = "select * from product  order by :orderby";
        $products = $pdo->prepare($sql);
        // $orderby=str_replace("_"," ",$_GET['orderby']);
        // $products->bindValue(":order", $orderby);
        // $products->bindValue(":orderby", "PRICE");
        $products->execute();

    if ($products->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        //取回一筆資料
        $productRow = $products->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        echo json_encode($productRow);
    }
} catch (PDOException $e) {
    echo "錯誤行號 : " . $e->getLine() . "<br>"; //"->"唸成"的"
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
};?>