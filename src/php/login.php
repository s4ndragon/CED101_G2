<?php 
try {
    // require_once("./connectBooks.php");
	$dsn = "mysql:host=localhost;port=3306;dbname=ced101g2;charset=utf8";
	$user = "root";
	$password = "root";
	// $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
	$pdo = new PDO($dsn, $user, $password, $options);

    $MEM_ID = $_POST["MEM_ID"];
    $MEM_PW = $_POST["MEM_PW"];
    $sql = "select * from member where MEM_ID='$MEM_ID' and MEM_PW='$MEM_PW'";
    $member = $pdo->query($sql);
} 
catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
     // echo "系統錯誤, 請通知系統維護人員<br>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登入/註冊</title>
</head>
<body>
    <?php
    if($member->rowCount()===0) { //rowCount()可取得這次select的總筆數
	// echo "error, plz <a href = '1204_pdo_login.html'>login</a> again";
	echo "<script>alert('id & pw error');location.href='../05_member_login_register.html'</script>";
    } else {
    $memRow = $member->fetch(PDO::FETCH_ASSOC);
    session_start();
        $_SESSION["MEM_NO"] = $memRow["MEM_NO"];
        $_SESSION["MEM_NICNAME"] = $memRow["MEM_NICNAME"];
        $_SESSION["MEM_ID"] = $memRow["MEM_ID"];
        $_SESSION["MEM_PW"] = $memRow["MEM_PW"];
        $_SESSION["MEM_EMAIL"] = $memRow["MEM_EMAIL"];
    echo $memRow["MEM_NICNAME"], "您好~<br>";
	echo "<script>location.href='../membership.html'</script>";
    }      
    ?>
</body>
</html>