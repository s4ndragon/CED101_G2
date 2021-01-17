<?php
    // $reason = isset($_POST["size"])?$_POST["size"]:""; 
    $arno = isset($_POST["arno"])?$_POST["arno"]:""; 
    
    //------------------
try{
    require_once("./connect.php");
    $sql = "DELETE FROM art_favorite where ART_NO = $arno";


    $article = $pdo->prepare($sql);
    $article->execute();
// -------------------------------------------------------------------------------------------------


}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    // $error.= $e->getLine() . '<br>' . $e->getMessage() ;
    echo json_encode($error);
}
?>
