<?php
// 要去哪抓會員id
    $command = isset($_POST["command"])?$_POST["command"]:"";
    $artNo =   isset($_POST["artNo"])?$_POST["artNo"]:"";

try{
    require_once("./connect.php");
    
    $sql = "INSERT INTO art_msg(
                MEM_NO,
                ART_NO,
                MSG_CONTENT,
                MSG_DATE,
                MSG_STATUS
            ) 
            VALUES(
                1,
                '$artNo',
                '$command',
                now(),
                1)";

    $article = $pdo->prepare($sql);
    $article->execute(); //程式執行到這結束

    $sql = "Update my_art set ART_REPLYS = ART_REPLYS +1 where ART_NO= ?";
    $msg = $pdo->prepare($sql);
    $msg->bindValue(1, $_POST["artNo"]);
    $msg->execute();


    $sql = "select * from art_msg where ART_NO = ?";
    $msg = $pdo->prepare($sql);
    $msg->bindValue(1, $_POST["artNo"]);
    $msg->execute();
    $msgRows = $msg->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($msgRows);
    // $diaryNo = $pdo->lastInsertId();  //接收到剛剛的日誌流水號



}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    // $error.= $e->getLine() . '<br>' . $e->getMessage() ;
    echo json_encode($error);
}
?>