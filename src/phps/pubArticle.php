<?php
    session_start();
    
    $mem = $_SESSION['MEM_NO'];
    $article_cate = isset($_POST["article_cate"])?$_POST["article_cate"]:""; 
    $title = isset($_POST["title"])?$_POST["title"]:"";
    $content = isset($_POST["content"])?$_POST["content"]:"";
    $dirr = "./images/discuss";
    $img = $_FILES['img']['name'];


    switch ( $_FILES["img"]["error"]){
        case 0:
            $dir = "../images/discuss";
            //檢查資夾是否存在
            if(file_exists($dir) === false){ //不存在
                mkdir($dir);
            }
            $from = $_FILES['img']['tmp_name']; //暫存區路徑
            $to = "$dir/{$_FILES['img']['name']}";
            copy($from, $to);
        break;
    };


    $article_cate = $_POST["article_cate"];
            if ($article_cate == "揪團心得") {
                $category = "tour";
            } else if ($article_cate == "茶園討論") {
                $category = "garden";
            } else {
                $category = "leaf";
            };
    //------------------
try{
    require_once("./connect.php");
    $sql = "INSERT INTO my_art(
                MEM_NO,
                CAT,
                ART_TITLE,
                ART_CONTENT,
                ART_IMG,
                ART_DATE,
                ART_STATUS,
                ART_REPLYS,
                FILTER
            ) 
            VALUES(
                '$mem',
                '$article_cate',
                '$title',
                '$content',
                '$dirr/$img',
                now(),
                1,
                0,
                '$category')";

    $article = $pdo->prepare($sql);
    $article->execute(); 

// -------------------------------------------------------------------------------------------------


}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    echo json_encode($error);
}
?>


