<?php
try {
    require_once "./connect.php";

	$sql = "select f.art_no, f.mem_no, m.art_title, m.art_img, m.art_content 
            from art_favorite f join my_art m
            on f.art_no = m.art_no
            where f.MEM_NO = 1
            ";

    // $get_mine_tour->bindValue(":MEM_NO", $MEM_NO);
    $get_fav_art = $pdo->prepare($sql);

    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    // $per_ord_data->bindValue(":ADMIN_NO", $add_no);
    // $per_ord_data->bindValue(":ADMIN_ID", $add_id);
    // $per_ord_data->bindValue(":ADMIN_NAME", $add_name);
    // $per_ord_data->bindValue(":ADMIN_PW", $add_psw);


    $get_fav_art->execute();

    // echo "修改成功~!!";
    if ($get_fav_art->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_fav_art = $get_fav_art->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_fav_art);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
