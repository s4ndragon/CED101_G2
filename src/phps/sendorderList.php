<?
try {
    require_once("./connect.php");
    $sql = "INSERT INTO orders (ORDERS_NO ,MEMBER ,DEL_STATE ,ORD_DATA, DELIVERY, PAY, DISCOUNT ,TOTAL, RECEIVER_NAME ,RECEIVER_ADDRESS ,RECEIVER_TEL)
            VALUES (NULL,:MEMBER, :DEL_STATE, :ORD_DATA, :DELIVERY, :PAY, :DISCOUNT, :TOTAL, :RECEIVER_NAME, :RECEIVER_ADDRESS, :RECEIVER_TEL)";
    // $sql = "INSERT INTO orders (ORDERS_NO ,MEMBER ,DEL_STATE ,ORD_DATA, DELIVERY, PAY, DISCOUNT ,TOTAL, RECEIVER_NAME ,RECEIVER_ADDRESS ,RECEIVER_TEL)
    //         VALUES (NULL, '1', '123', '2021-01-05', '12321', '123', '1241', '124', '125', '125', '125')";
    $orderList = $pdo->prepare($sql);
    $orderList->bindValue(":MEMBER",  $_POST['mem_no']);
    $orderList->bindValue(":DEL_STATE",  $_POST['DEL_STATE']);
    $orderList->bindValue(":ORD_DATA",  date('Y/m/d'));
    $orderList->bindValue(":DELIVERY",  $_POST['DELIVERY']);
    $orderList->bindValue(":PAY",  $_POST['pay']);
    $orderList->bindValue(":DISCOUNT",  $_POST['discount']);
    $orderList->bindValue(":TOTAL",  $_POST['total']);
    $orderList->bindValue(":RECEIVER_NAME",  $_POST['reciever']);
    $orderList->bindValue(":RECEIVER_ADDRESS",  $_POST['address']);
    $orderList->bindValue(":RECEIVER_TEL",  $_POST['phone']);
    $affectedRows=$orderList->execute();
    echo "成功異動了{$affectedRows}筆資料";

    require_once("./connect.php");
    
    header("Location:../04_orders.html");
    exit();

} catch (PDOException $e) {
    echo  $e->getMessage() ;
};?>