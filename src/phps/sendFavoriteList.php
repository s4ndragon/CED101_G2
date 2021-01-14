<?
try {
    require_once("./connect.php");
    $sql = "DELETE FROM product_f WHERE MEM_NO = :mem_no ";
    $FavoriteList = $pdo->prepare($sql);
    $FavoriteList->bindValue(":mem_no", $_POST['mem_no']);
    $affectedRows=$FavoriteList->execute();
    echo "成功刪除了{$affectedRows}筆資料;";
} catch (PDOException $e) {
    echo  $e->getMessage() ;
}

try {
    $list=preg_split('/,/', $_POST['favoriteList'], -1, PREG_SPLIT_NO_EMPTY);
    $n=0;
    for($i=0 ; $i<count($list) ; $i++){
        require_once("./connect.php");
        $sql = "INSERT INTO product_f (MEM_NO, PSN) VALUES (:mem_no, :psn)";
        $FavoriteList = $pdo->prepare($sql);
        $FavoriteList->bindValue(":mem_no", $_POST['mem_no']);
        $FavoriteList->bindValue(":psn", $list[$i]);
        $affectedRows=$FavoriteList->execute();
        $n++; 
    }
    echo "成功新增了{$n}筆資料;";
}

 catch (PDOException $e) {
    echo  $e->getMessage() ;
};?>