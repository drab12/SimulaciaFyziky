<?php
include('funkcie.php'); 
?>
<!DocType html>
<html>
<head>
<meta charset="utf-8">
<link href="style.css" rel="stylesheet" media="all">
<title> Spätná väzba</title>
</head>
<body>
<section>
<?php
  $mysqli = new mysqli("localhost", "root", "usbw", "test");
  if ($mysqli->connect_errno) {
    echo "neviem sa pripojit k db: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    die;
  }
  $mysqli->set_charset("utf8");
  
  // tu by bolo fajn testovat navratove hodnoty, ci niekde nedojde k chybe
  $ip = osetri('ip');
  $cas =  osetri('c');
  $datum =  osetri('d');
  $prva = osetri('prva');
  $druha = osetri('druha');
  $tretia = osetri('tretia');
  $stvrta = osetri('stvrta');
  $piata = osetri('piata');
  $siesta = osetri('siesta');
  $vek = osetri('vek');
  
 // $sql = "INSERT INTO feedback SET ip ='$ip', datum='$datum', cas='$cas', odpoved1='$prva', odpoved2='$druha', odpoved3='$tretia', odpoved4='$stvrta', odpoved5='$piata', odpoved6='$siesta', vek='$vek'";
 //$sql = "INSERT INTO feedback SET ip='$ip', datum='$datum', cas='$cas', vek='$vek', odpoved1='$prva', odpoved2='$druha', odpoved3='$tretia', odpoved4='$stvrta', odpoved5='$piata', odpoved6='$siesta'";
   $stmt = $mysqli->prepare("INSERT INTO feedback (ip, datum, cas, odpoved1, odpoved2, odpoved3, odpoved4, odpoved5, odpoved6, vek) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
   $stmt->bind_param('sssisisisi', $ip, $datum, $cas, $prva, $druha, $tretia, $stvrta, $piata, $siesta, $vek);
   
  if ($result = $stmt->execute()) {  // vykonaj dopyt
 	    echo '<h2> Ďakujeme Vám za vyplnenie spätnej väzby';
       $stmt->close(); 
       $mysqli->close(); 
      
    }
    elseif ($mysqli->errno) {
      echo $sql;
			echo '<p> Nastala chyba ' . $mysqli->errno . ' pri komunikacii so serverom </p>';
		} 
      
?>



</section>
</body>
</html> 
