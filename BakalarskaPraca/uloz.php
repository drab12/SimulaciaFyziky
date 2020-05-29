<?php
include('funkcie.php'); 
$id = osetri('id');
$data = spravneOdpovede($id);
$nazov = $data[0];
$databaza = $data[1];
$texty = vratTextOtazky($id); 
$cisla = cislaOdpovedi($id) 

?>
<!DocType html>
<html>
<head>
<meta charset="utf-8">
<link href="style.css" rel="stylesheet" media="all">
<title> <?php  echo $nazov;  ?>  </title>
</head>
<body>
<header> 
<?php  echo '<h1>'.$nazov.' </h1>';  ?>  
</header>


<section>
<?php 
  $mysqli = new mysqli("localhost", "root", "usbw", "test");
  if ($mysqli->connect_errno) {
    echo "neviem sa pripojit k db: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    die;
  }
  $mysqli->set_charset("utf8");
  
  // tu by bolo fajn testovat navratove hodnoty, ci niekde nedojde k chybe
  //$stmt = $mysqli->prepare("INSERT INTO pokus set odpoved=?");
/*  $stmt->bind_param('s', $_POST['odpoved']);
  $stmt->execute();
  $stmt->close(); 
  $mysqli->close();  */
  
  
  
  
  
  
  
 /* if (isset($_POST["submit"])) {
	$meno = osetri('meno');
	$pocet_dospelych = osetri('pocet_dospelych');
	$pocet_deti = osetri('pocet_deti');
	$zajazd = osetri('zajazd');
	if (isset($_POST['priplatok'])) $priplatok = $_POST['priplatok'];	// je to pole
	
	//if ($meno == '') $chyby['meno'] = 'Nezadali ste meno';
	if (!spravne_meno($meno)) $chyby['meno'] = 'Meno nie je v správnom formáte';
	if (empty($meno)) $chyby['meno'] = 'Nezadali ste meno';
	if (empty($pocet_dospelych)) $chyby['pocet_dospelych'] = 'Počet dospelých musí byť > 0';
	if (empty($zajazd)) $chyby['zajazd'] = 'Nezvolili ste zájazd';

	// tu budú ďalšie kontroly jednotlivých položiek formulára 
//	if (!spravne_meno($meno)) $chyby['meno'] = 'Meno nie je v správnom formáte';
}  */
  
  $ip = osetri('ip');
  $cas =  osetri('c');
  $datum =  osetri('d');
  $prva = osetri('prva');
  $druha = osetri('druha');
  $tretia = osetri('tretia');
  $stvrta = osetri('stvrta');
  $piata = osetri('piata');
  if($id != 'ArchimedovZakon' && $id != 'IzobarickyDej' && $id != 'IzobarickyDej2' && $id !='DvojstrbinovyExperiment'  ){
  $siesta = osetri('siesta');
  $siedma = osetri('siedma');
  $osma= osetri('osma');
  if($id !='DvojstrbinovyExperiment2'){    
  $deviata = osetri('deviata');
  $desiata = osetri('desiata');    
  }
  }
  $sucet = 0;
  
  //ip ='$ip', cas='$cas', datum='$datum', 
 /* $sql = "INSERT INTO $databaza SET ip ='$ip', datum='$datum', cas='$cas', odpoved1='$prva', odpoved2='$druha', odpoved3='$tretia' 
  , odpoved4='$stvrta', odpoved5='$piata'";  */
  
  if($id != 'ArchimedovZakon2' && $id != 'DvojstrbinovyExperiment2'){
  $stmt = $mysqli->prepare("INSERT INTO $databaza (ip, datum, cas, odpoved1, odpoved2, odpoved3, odpoved4, odpoved5) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param('sssiiiii', $ip, $datum, $cas, $prva, $druha, $tretia, $stvrta, $piata);
  
  }
  if($id == 'ArchimedovZakon2'){
   // $sql = "INSERT INTO $databaza SET ip ='$ip', datum='$datum', cas='$cas', odpoved1='$prva', odpoved2='$druha', odpoved3='$tretia' 
  //, odpoved4='$stvrta', odpoved5='$piata', odpoved6='$siesta', odpoved7='$siedma', odpoved8='$osma', odpoved9='$deviata', odpoved10='$desiata'"; 
  $stmt = $mysqli->prepare("INSERT INTO $databaza (ip, datum, cas, odpoved1, odpoved2, odpoved3, odpoved4, odpoved5,
  odpoved6, odpoved7, odpoved8, odpoved9, odpoved10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param('sssiiiiiiiiii', $ip, $datum, $cas, $prva, $druha, $tretia, $stvrta, $piata, $siesta, $siedma, $osma, $deviata, $desiata);
  } 
  if($id == 'DvojstrbinovyExperiment2'){
  //  $sql = "INSERT INTO $databaza SET ip ='$ip', datum='$datum', cas='$cas', odpoved1='$prva', odpoved2='$druha', odpoved3='$tretia' 
  //, odpoved4='$stvrta', odpoved5='$piata', odpoved6='$siesta', odpoved7='$siedma', odpoved8='$osma'"; 
   $stmt = $mysqli->prepare("INSERT INTO $databaza (ip, datum, cas, odpoved1, odpoved2, odpoved3, odpoved4, odpoved5, odpoved6, odpoved7, odpoved8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
   $stmt->bind_param('sssiiiiiiii', $ip, $datum, $cas, $prva, $druha, $tretia, $stvrta, $piata, $siesta, $siedma, $osma);
  } 
  
  if ($result = $stmt->execute()) {  // vykonaj dopyt
 	  $stmt->close(); 
  $mysqli->close();  
?>


<h2>Vyhodnotenie </h2>
<br><br>
<h4> 1. Úloha </h4> 
   
<?php
echo $texty[0];
 if($prva == $cisla[0]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[2].' </strong>  </p>'. "\n"; 
 $sucet +=1;
 }
?>
<h4> 2. Úloha </h4> 
  
<?php
echo $texty[1];

 if($druha == $cisla[1]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[3].' </strong>  </p>'. "\n"; 
 $sucet+=1;
 }
?>
<h4> 3. Úloha </h4> 
  
<?php
echo $texty[2];
 if($tretia == $cisla[2]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[4].' </strong>  </p>'. "\n";
 $sucet+=1; 
 }
?>
<h4> 4. Úloha </h4> 
  
<?php
echo $texty[3];
 if($stvrta == $cisla[3]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[5].' </strong>  </p>'. "\n"; 
 $sucet+=1;
 }
?>
<h4> 5. Úloha </h4> 
 
<?php
  echo $texty[4];
 if($piata == $cisla[4]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[6].' </strong>  </p>'. "\n"; 
 $sucet+=1;
 }
if($id != 'ArchimedovZakon' && $id != 'IzobarickyDej' && $id != 'IzobarickyDej2' && $id !='DvojstrbinovyExperiment' ){ 
?>
<h4> 6. Úloha </h4> 
  
<?php
echo $texty[5];
 if($siesta == $cisla[5]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[7].' </strong>  </p>'. "\n";
 $sucet+=1; 
 }
?>
<h4> 7. Úloha </h4> 
  
<?php
echo $texty[6];
 if($siedma == $cisla[6]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[8].' </strong>  </p>'. "\n";
 $sucet+=1; 
 }
 
?>
<h4> 8. Úloha </h4> 
  
<?php
echo $texty[7];
 if($osma == $cisla[7]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[9].' </strong>  </p>'. "\n";
 $sucet+=1; 
 }
 if($id !='DvojstrbinovyExperiment2' ){
?>
<h4> 9. Úloha </h4> 
  
<?php
echo $texty[8];
 if($deviata == $cisla[8]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[10].' </strong>  </p>'. "\n";
 $sucet+=1; 
 }
?>
<h4> 10. Úloha </h4> 
  
<?php
echo $texty[9];
 if($desiata == $cisla[9]){
 echo  '<p> <strong> Správna odpoveď: ' .$data[11].' </strong>  </p>'. "\n";
 $sucet+=1; 
 }
?>

<br>
<?php
echo '<h3>          Získali ste      ' . $sucet.'/10 bodov </h3>';  
?>
</section>
>
<?php
 
}
else{
   echo '<h3>          Získali ste      ' . $sucet.'/8 bodov </h3>'; 
} 
}
else{
   echo '<h3>          Získali ste      ' . $sucet.'/5 bodov </h3>'; 
}
 



?> 
 <br>
<?php
 if($id =="ArchimedovZakon"){
 
         echo    '  <a href="archimedform2.html">Chcem ešte
jednu výzvu</a> ';
 
 }
 if($id =="IzobarickyDej"){
 
         echo    '  <a href="izobarform2.html">Chcem ešte
jednu výzvu</a> ';
 
 }   
 
 if($id =="DvojstrbinovyExperiment"){
 
        echo    '<a href="dvojstrbinaform2.html">Chcem ešte
jednu výzvu</a>';

 }  


}
 elseif ($mysqli->errno) {
			echo '<p > Nastala chyba pri komunikacii so serverom </p>';
      $stmt->close(); 
      $mysqli->close();
		} 
?> 



</body>
</html>
