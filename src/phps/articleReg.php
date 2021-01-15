<?php
    $reason = isset($_POST["size"])?$_POST["size"]:""; 
    $artNo = isset($_POST["art_reg"])?$_POST["art_reg"]:""; 
    
    //------------------
try{
    require_once("./connect.php");
    $sql = "INSERT INTO art_rep(
                MEM_NO,
                ART_NO,
                AR_DATE,
                AR_REASON,
                AR_STATUS,
            ) 
            VALUES(
                1,
                '$artNo',
                now(),
                '$reason',
                1)";

    $article = $pdo->prepare($sql);
    $article->execute(); //程式執行到這結束
    // $diaryNo = $pdo->lastInsertId();  //接收到剛剛的日誌流水號


// -------------------------------------------------------------------------------------------------


}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    // $error.= $e->getLine() . '<br>' . $e->getMessage() ;
    echo json_encode($error);
}
?>