<?php
try {
    session_start();
    require_once("./connect.php");

	$sql = "select t.TOUR_ID, t.TOUR_TITLE, t.TOUR_SETOFFTIME, t.NUM_OF_PARTICIPANTS, t.TOUR_PEOPLE, j.mem_no
            from tour t join tour_join J 
            on t.tour_id = j.tour_id 
            where j.mem_no = :MEM_NO
            and t.DEADLINE_DATE < t.CURRENT_DATE() 
            and t.NUM_OF_PARTICIPANTS < t.TOUR_PEOPLE
            and TOUR_STATUS = 2 ;
            ";

    $get_mine_tour = $pdo->prepare($sql);
    $get_mine_tour->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);


    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    // $per_ord_data->bindValue(":ADMIN_NO", $add_no);
    // $per_ord_data->bindValue(":ADMIN_ID", $add_id);
    // $per_ord_data->bindValue(":ADMIN_NAME", $add_name);
    // $per_ord_data->bindValue(":ADMIN_PW", $add_psw);


    $get_mine_tour->execute();

    // echo "修改成功~!!";
    if ($get_mine_tour->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_mine_tour = $get_mine_tour->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_mine_tour);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
