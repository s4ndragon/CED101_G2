<?php
    $arno = isset($_POST["arno"])?$_POST["arno"]:""; 
    
    //------------------
try{
    require_once("./connect.php");
    $sql = "INSERT INTO art_favorite(
                ART_NO,
                MEM_NO
            ) 
            VALUES('$arno',2)";

    $article = $pdo->prepare($sql);
    $article->execute();
// -------------------------------------------------------------------------------------------------


}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    // $error.= $e->getLine() . '<br>' . $e->getMessage() ;
    echo json_encode($error);
}
?>
