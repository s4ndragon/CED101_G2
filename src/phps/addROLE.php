<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Examples</title>
</head>
<body>
<?php
$errMsg = "";
try {
    require_once("./connect_game.php");
    $sql="select ROLE_NO form ROLE where ROLE_NO = :no";
    $gamerole = $pdo->prepare($sql);
    $gamerole->bindValue(":no", $_POST["no"]);
    $res=$gamerole->execute();
    if(empty($res)){
    $sql="insert into ROLE (`ROLE_NO`, `IMG`,`DATA_HPS`,`DATA_HP`,`DATA_DEFENSE`,`DATA_DAMAGE`,`DATA_SPEED`,`DATA_STAR`)
        values ( :no , :IMG ,:hps , :hp,:defense ,:damage , :speed , :star);
    ";
    $gamerole = $pdo->prepare($sql);
    $gamerole->bindValue(":no", $_POST["no"]);
    $gamerole->bindValue(":IMG", $_POST["pic"]);
    $gamerole->bindValue(":hps", $_POST["hps"]);
    $gamerole->bindValue(":hp", $_POST["hp"]);
    $gamerole->bindValue(":defense", $_POST["defense"]);
    $gamerole->bindValue(":damage", $_POST["damage"]);    
    $gamerole->bindValue(":speed", $_POST["speed"]);
    $gamerole->bindValue(":star", $_POST["star"]);    
    $gamerole->execute();
    echo '新增成功';
    }else{
    echo '值已經存在，不准複寫';
    }
    
} catch (PDOException $e) {
	// $pdo->rollBack();
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
	echo $errMsg;
}


?>    
</body>
</html>