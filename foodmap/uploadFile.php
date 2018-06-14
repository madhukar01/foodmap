<?php
    // Delete existing file and save the uploaded file on disk
    $target_file = $_FILES["jsonFile"]["name"];
    if(file_exists($target_file))
        unlink($target_file);
    
    move_uploaded_file($_FILES["jsonFile"]["tmp_name"],"restaurant_data.json");

    // Show alert and redirect to homepage
    echo("<script>alert(\"Upload successful, Redirecting...\");window.location.href=\"http://madhukar.online/foodmap\";</script>");
?>