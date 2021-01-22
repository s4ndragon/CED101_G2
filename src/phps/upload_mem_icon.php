<?php 
try {
    session_start();
    require_once("./connect.php");

    if ($_FILES["upFile"]["error"] == UPLOAD_ERR_OK) {
        // 設定要存照片的路徑(以php檔案為出發點)
        $dir = "../Images/member";
        //取出檔案副檔名(.PNG ...等等)
        $fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
        // 創造不會重複的亂碼
        $imageNo = uniqid();
        //決定檔案名稱
        $fileName = "{$imageNo}.{$fileInfoArr["extension"]}"; //312543544.gif
        //先檢查images資料夾存不存在
        if (file_exists($dir) == false) {
            mkdir($dir, 0777, true); //make directory
        }
        //將檔案copy到要放的路徑
        $from = $_FILES["upFile"]["tmp_name"];
        $to = "{$dir}/$fileName";
        if (copy($from, $to) === true) {

            $sql = "update member
            set MEM_IMG = :imgSrc
            where MEM_NO = :MEM_NO";
            $products = $pdo->prepare($sql);
            $products->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);
            $products->bindValue(":imgSrc", "./Images/member/{$fileName}");
            $products->execute();

        } else {
            echo "失敗~";
        }

    } else {
        echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
        // echo "新增失敗<br>";
    }
} catch (PDOException $e) {
    echo "修改失敗~!!";
}
?>