<?php
try {
    require_once("./connect.php");
    session_start();

    if(isset($_SESSION["MEM_ID"])){
        $MEM_NICKNAME = $_POST["MEM_NICKNAME"];
        $MEM_EMAIL = $_POST["MEM_EMAIL"];
        $new_password = $_POST["new_password"];
        $sql = 
        "update member 
        set MEM_NICKNAME = $MEM_NICKNAME, MEM_EMAIL = $MEM_EMAIL, MEM_PW = $MEM_PW
        where MEM_ID='$MEM_ID' 
        and MEM_PW='$MEM_PW' ";

    $get_mine_info = $pdo->prepare($sql);
    $get_mine_info->bindValue(":MEM_ID", $_SESSION["MEM_ID"]);

    $get_mine_info->execute();

    // echo "修改成功~!!";
    if ($get_mine_info->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_mine_info = $get_mine_info->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_mine_info);
        // echo $managerdatarow;
    }
}else{
    echo "[]";
}
} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
