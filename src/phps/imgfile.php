<?php
echo $_FILES["file"]["error"];
$errMsg = "";
try {
	require_once("./connect_g.php");
    //.......確定是否上傳成功//決定檔案名稱    	
       echo $_FILES["file"]["error"];
		$fileInfoArr = pathinfo($_FILES["my_file"]["name"]);
		$imageNo = uniqid();
		$fileName = "{$imageNo}.{$fileInfoArr["extension"]}";  //312543544.gif
		//先檢查images資料夾存不存在
		if( file_exists("images") === false){
			mkdir("images");
		}
		//將檔案copy到要放的路徑
		$from = $_FILES["my_file"]["tmp_name"];
		$to = "images/$fileName";
		if(copy( $from, $to)===true){
			$sql = "INSERT INTO `imgfile` (`IMG_NO`, `IMG`) values(:pname, :image )";
			$products = $pdo->prepare( $sql );
			$products -> bindValue(":pname", $_POST["up_no"]);
			$products -> bindValue(":image", $fileName);
			$products -> execute();
			echo "新增成功~";
		}else{
			echo "失敗~";
		}
	if( $_FILES["my_file"]["error"] == UPLOAD_ERR_OK){

	}else{
		echo "錯誤代碼 : {$_FILES["my_file"]["error"]} <br>";
		echo "新增失敗<br>";
	}
} catch (PDOException $e) {

	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
	echo $errMsg;
}


?>