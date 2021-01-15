<?php
    $reason = isset($_POST["size"])?$_POST["size"]:""; 
    $msgNo = isset($_POST["msg_reg"])?$_POST["msg_reg"]:""; 
    
    //------------------
try{
    require_once("./connect.php");
    $sql = "INSERT INTO art_msg_rep(
                MEM_NO,
                MSG_NO,
                AMR_DATE,
                AMR_CONTENT,
                AMR_STATUS
            ) 
            VALUES(1,'$msgNo',now(),'$reason',1)";

    $article = $pdo->prepare($sql);
    $article->execute();
// -------------------------------------------------------------------------------------------------


}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    // $error.= $e->getLine() . '<br>' . $e->getMessage() ;
    echo json_encode($error);
}
?>



