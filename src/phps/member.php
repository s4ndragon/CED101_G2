<?php 
    session_start();
	$dsn = "mysql:host=localhost;port=3306;dbname=ced101g2;charset=utf8";
	$user = "root";
	$password = "root";
	$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
	$pdo = new PDO($dsn, $user, $password, $options);
?>
<?php 
try {
    // require_once("./connectBooks.php");
    $MEM_ID = $_POST["MEM_ID"];
    $MEM_PW = $_POST["MEM_PW"];
    $sql = "select * from member where MEM_ID = 'amin'";
    $member = $pdo->prepare($sql);
    $member->execute();
    $memRows = $member->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($memRows);
    session_start();
        $_SESSION["MEM_NO"] = $memRows["MEM_NO"];
        $_SESSION["MEM_NICNAME"] = $memRows["MEM_NICNAME"];
        $_SESSION["MEM_ID"] = $memRows["MEM_ID"];
        $_SESSION["MEM_PW"] = $memRows["MEM_PW"];
        $_SESSION["MEM_EMAIL"] = $memRows["MEM_EMAIL"];
        $_SESSION["MEM_IMG"] = $memRows["MEM_IMG"];
} 
catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "系統錯誤, 請通知系統維護人員<br>";
}
?>