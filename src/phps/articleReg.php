<?php
    $article_cate = isset($_POST["article_cate"])?$_POST["article_cate"]:""; 
    $title = isset($_POST["title"])?$_POST["title"]:"";
    $content = isset($_POST["content"])?$_POST["content"]:"";
   


    switch ( $_FILES["img"]["error"]){
        case 0:
            $dir = "./images/discuss";
            //檢查資夾是否存在
            if(file_exists($dir) === false){ //不存在
                // mkdir($dir);
                console.log
            }
            $from = $_FILES['img']['tmp_name']; //暫存區路徑
            $to = "$dir/{$_FILES['img']['name']}";

            if(copy($from, $to)){
                echo "上傳成功 <br>";
                echo $_FILES['img']['tmp_name'];
            }else{
                echo "拷貝失敗 <br>";
            }
        break;
    }

    
    $article_cate = $_POST["article_cate"];
            if ($article_cate == "揪團心得") {
                $category = "tour";
            } else if ($article_cate == "茶園討論") {
                $category = "garden";
            } else {
                $category = "leaf";
            }
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
                1,
                '$article_cate',
                '$title',
                '$content',
                '',
                now(),
                1,
                0,
                '$category')";

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