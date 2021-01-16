<?php 
session_start();
try {
    require_once("./connect.php");
    
    $MEM_ID = $_POST["MEM_ID"];
    $MEM_PW = $_POST["MEM_PW"];
    $sql = "select * from member where MEM_ID='$MEM_ID' and MEM_PW='$MEM_PW'";
    // $sql = "select * from member where MEM_ID=:MEM_ID and MEM_PW=:MEM_PW";
    $member = $pdo->prepare($sql);
    // $member->bindValue(":MEM_ID", $_POST["MEM_ID"]);
    // $member->bindValue(":MEM_PW", $_POST["MEM_PW"]);
    $member->execute();

    if($member->rowCount()===0) { //rowCount()可取得這次select的總筆數
        // echo "error, plz <a href = '1204_pdo_login.html'>login</a> again";
        echo "<script>alert('id & pw error');location.href=' '";
        } else {
        $memRow = $member->fetch(PDO::FETCH_ASSOC);
            $_SESSION["MEM_NO"] = $memRow["MEM_NO"];
            $_SESSION["MEM_NICNAME"] = $memRow["MEM_NICNAME"];
            $_SESSION["MEM_ID"] = $memRow["MEM_ID"];
            $_SESSION["MEM_PW"] = $memRow["MEM_PW"];
            $_SESSION["MEM_EMAIL"] = $memRow["MEM_EMAIL"];
        // echo $_SESSION["MEM_NICNAME"], "您好~<br>", $_SESSION["MEM_EMAIL"];
            $result = array("MEM_NO"=>$_SESSION["MEM_NO"], "MEM_ID"=>$_SESSION["MEM_ID"], "MEM_NICNAME"=>$_SESSION["MEM_NICNAME"], "MEM_EMAIL"=>$_SESSION["MEM_EMAIL"]);
            echo json_encode($result);


        echo "<script>location.href='../member.html'</script>";
        }      
} 
catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
     // echo "系統錯誤, 請通知系統維護人員<br>";
}
?>