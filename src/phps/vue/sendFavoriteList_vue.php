<?
session_start();
$MEM_NO=$_SESSION['MEM_NO'];
// $MEM_NO=1;
try {
    require_once("../connect.php");
    $sql = "DELETE FROM product_f WHERE MEM_NO = :mem_no ";
    $FavoriteList = $pdo->prepare($sql);
    $FavoriteList->bindValue(":mem_no", $MEM_NO);
    $affectedRows=$FavoriteList->execute();
    // echo "成功刪除了所有資料;";
    $list=preg_split('/,/', $_POST['favoriteList'], -1, PREG_SPLIT_NO_EMPTY);
    $n=0;
    for($i=0 ; $i<count($list) ; $i++){
        require_once("../connect.php");
        $sql = "INSERT INTO product_f (MEM_NO, PSN) VALUES (:mem_no, :psn)";
        $FavoriteList = $pdo->prepare($sql);
        $FavoriteList->bindValue(":mem_no", $MEM_NO);
        $FavoriteList->bindValue(":psn", $list[$i]);
        $affectedRows=$FavoriteList->execute();
        $n++; 
    }
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};
?>