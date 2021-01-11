<?php 
	$dsn = "mysql:host=localhost;port=3306;dbname=ced101g2;charset=utf8";
	$user = "root";
	$password = "root";
	$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
	// $pdo = new PDO($dsn, $user, $password, $options);
?>
<?php 
try {
    // require_once("./connectBooks.php");
    $sql = "select * from member where MEM_ID = 1";
    $member = $pdo->prepare($sql);
    $member->execute();
    $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($memberRows);
} 
catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
     // echo "系統錯誤, 請通知系統維護人員<br>";
}
echo 'hi';
?>
<input type="text" name="MEM_NICKNAME" value="<?=$memRow["MEM_NICKNAME"]?>">
<input type="text" name="MEM_EMAIL" value="<?=$memRow["MEM_EMAIL"]?>">
<input type="text" name="MEM_ID" value="<?=$memRow["MEM_ID"]?>">