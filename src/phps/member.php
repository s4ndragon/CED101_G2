<?php 
try {
    session_start();
    require_once("./connect.php");
    // $MEM_ID = $_POST["MEM_ID"];
    // $MEM_PW = $_POST["MEM_PW"];
    // $sql = "select * from member where MEM_ID = 'amin' and MEM_PW = '0000'";
    if(isset($_SESSION["MEM_ID"])){
    $sql = "select * from member where MEM_ID=:MEM_ID and MEM_PW=:MEM_PW";
    $member = $pdo->prepare($sql);

    $member->bindValue(":MEM_ID", $_SESSION["MEM_ID"]);
    $member->bindValue(":MEM_PW", $_SESSION["MEM_PW"]);

    $member->execute();
    // $memRows = $member->fetch(PDO::FETCH_ASSOC);
    // echo json_encode($memRows);
    // session_start();
    //     $_SESSION["MEM_NO"] = $memRows["MEM_NO"];
    //     $_SESSION["MEM_NICNAME"] = $memRows["MEM_NICNAME"];
    //     $_SESSION["MEM_ID"] = $memRows["MEM_ID"];
    //     $_SESSION["MEM_PW"] = $memRows["MEM_PW"];
    //     $_SESSION["MEM_EMAIL"] = $memRows["MEM_EMAIL"];
    //     $_SESSION["MEM_IMG"] = $memRows["MEM_IMG"];
	    $result = array("MEM_NO"=>$_SESSION["MEM_NO"], "MEM_ID"=>$_SESSION["MEM_ID"], "MEM_NICNAME"=>$_SESSION["MEM_NICNAME"], "MEM_IMG"=>$_SESSION["MEM_IMG"]);
        echo json_encode($result);
    } else {
        echo "[]";
    }
} 
catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "系統錯誤, 請通知系統維護人員<br>";
}
?>