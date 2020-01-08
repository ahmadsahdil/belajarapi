<?php
 
//  $mahasiswa = [
//     [
//         "nama" => "ahmad",
//         "kelas" => 1
//     ],
//     [
//         "nama" => "muhammad",
//         "kelas" => 1
//     ]
//  ];
$dbh = new PDO('mysql:host=localhost;dbname=phpdasar','root','');
$db = $dbh->prepare('select * from mahasiswa');
$db->execute();
$mahasiswa = $db->fetchAll(PDO::FETCH_ASSOC);
$data = json_encode($mahasiswa);

echo $data;