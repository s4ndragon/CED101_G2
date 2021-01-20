<?
try {
    //用來修改FEATURES資料的程式
    require_once("./connect.php");
    $psn=20;
    $IMG=9;
    $FEATURES="";
    for ($i=1; $i <= $IMG; $i++) { 
        $FEATURES.="./images/shopping/$psn-$i.jpg|";
    }
    $FEATURES=substr($FEATURES,0,-1);
    $sql="UPDATE product set FEATURES='$FEATURES' where PSN=100$psn";
    $product = $pdo->prepare($sql);
    $product->execute();
    echo 'update成功';
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};
?>