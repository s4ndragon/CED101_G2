<?
try {
    require_once("./connect.php");
    $sql = "INSERT INTO product_f (MEM_NO, PSN) VALUES (:mem_no, :psn)";
    $FavoriteList = $pdo->prepare($sql);
    $FavoriteList->bindValue(":mem_no", $_GET['mem_no']);
    $FavoriteList->bindValue(":psn", $_GET['psn']);
    $affectedRows=$FavoriteList->execute();
    echo "成功異動了{$affectedRows}筆資料";

} catch (PDOException $e) {
    echo  $e->getMessage() ;
};?>