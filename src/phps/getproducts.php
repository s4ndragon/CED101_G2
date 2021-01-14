<?
try {
    require_once("./connect.php");
    if($_GET['type']=='所有商品'){
        if($_GET['orderby']=='PRICE'){
            $sql = "select * from product  order by PRICE ASC";
        }else if($_GET['orderby']=="DATE_DESC"){
            $sql = "select * from product  order by DATE DESC";

        }else if($_GET['orderby']=="PRICE_DESC"){
            $sql = "select * from product  order by PRICE DESC";

        }else if($_GET['orderby']=="SOLD_DESC"){
            $sql = "select * from product  order by SOLD DESC";
        }
    }
      else { if($_GET['orderby']=='PRICE'){
            $sql = "select * from product where type= :type order by PRICE ASC";
        }else if($_GET['orderby']=="DATE_DESC"){
            $sql = "select * from product where type= :type order by DATE DESC";

        }else if($_GET['orderby']=="PRICE_DESC"){
            $sql = "select * from product where type= :type order by PRICE DESC";

        }else if($_GET['orderby']=="SOLD_DESC"){
            $sql = "select * from product where type= :type order by SOLD DESC";
        }}
        // $sql = "select * from product  order by :orderby";
        // $orderby=str_replace("_"," ",$_GET['orderby']);
        $products = $pdo->prepare($sql);
        // $products->bindValue(":orderby", $orderby,PDO::PARAM_STR);
        if($_GET['type']=='所有商品'){
        }else{
            $products->bindValue(":type", $_GET['type']);
        }
        // $products->bindValue(':orderby',$orderby,PDO::PARAM_STR);
        // $products->bindValue(":orderby", "PRICE",PDO::PARAM_STR);
        $products->execute();

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