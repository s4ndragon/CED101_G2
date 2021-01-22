<?php 
try {
    session_start();
    require_once("./connect.php");
    
    //.......確定是否上傳成功
	if ($_FILES["profile_pic_input"]["error"] == UPLOAD_ERR_OK) {

        $dir = "../images/member";
		//決定檔案名稱
        $fileInfoArr = pathinfo($_FILES["profile_pic_input"]["name"]);
        
        $imageNo = uniqid();
        
		$fileName = "{$imageNo}.{$fileInfoArr["extension"]}";  //312543544.gif
        
        //先檢查images資料夾存不存在
		if( file_exists($dir) === false){
			mkdir($dir);
		}
        //將檔案copy到要放的路徑
		$from = $_FILES["profile_pic_input"]["tmp_name"];
        $to = "$dir/{$_FILES['profile_pic_input']['name']}";
        
		if (copy($from, $to) === true) {
            $sql = "update member
            set MEM_IMG = :MEM_IMG
            where MEM_NO = :MEM_NO
            )";
            $products = $pdo->prepare( $sql );
			$products -> bindValue(":MEM_NO", $_SESSION["MEM_NO"]);
			$products -> bindValue(":MEM_IMG", "./images/member/{$fileName}");
			$products -> execute();			
			echo "新增成功~";
		}else{
			echo "失敗~";
		}

	}else{
		echo "錯誤代碼 : {$_FILES["profile_pic_input"]["error"]} <br>";
		// echo "新增失敗<br>";
	}
} catch (PDOException $e) {
	$pdo->rollBack();
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
}
?>
