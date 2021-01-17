<?php
try {
    require_once "./connect.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $reg_memId = $decoded["reg_memId"];
    $reg_memPw = $decoded["reg_memPw"];

    $sql = "insert into member(MEM_NO, MEM_NICNAME, MEM_PW, MEM_EMAIL)
            values (:MEM_NO, :MEM_NICNAME, :MEM_PW, :MEM_EMAIL)
            where empNo = :empNo
            ";

    $reg_mem = $pdo->prepare($sql);
    $reg_mem->bindValue(":MEM_NO", $MEM_NO);
    $reg_mem->bindValue(":MEM_NICNAME", $MEM_NICNAME);
    $reg_mem->bindValue(":MEM_PW", $MEM_PW);
    $reg_mem->bindValue(":MEM_EMAIL", $MEM_EMAIL);
    $reg_mem->execute();

    echo "註冊成功~!!";
    // if ($per_ord_data->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        // echo "{}";

    // } else { //找得到
        //取回一筆資料
        // $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

       
        //送出json字串
        // echo json_encode($per_ord_datarow);
        // echo $managerdatarow;
    

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}