<?php
 

function osetri($co) {
	return addslashes(trim(strip_tags($_POST[$co])));
  }
  
function spravneOdpovede($nazov){
    if($nazov =="ArchimedovZakon"){
      $data = array("Archimedov Zákon","archimed","ľahšie klesať ku dnu","áno","áno","budú sa vznášať v kvapaline","neplatí ani jedno z tvrdení");
      }
      if($nazov =="ArchimedovZakon2"){
      $data = array("Archimedov Zákon","archimedbonus","20462,40 N","0,52 m³","železo","224,91 N",
      "meď","železo sa potopí a ľahké drevo sa bude vznášať v kvapaline","obe telesá sa potopia","396,9 N","396,9 N","guma sa potopí a ľahké drevo sa bude vznášať v kvapaline");
         }
    if($nazov =="IzobarickyDej"){
        $data =  array("Izobarický Dej","izobar","so stúpajúcou teplotou sa mení objem a tlak zostáva konštantný","čím je počiatočný objem väčší ako počiatočná teplota, tým je experiment rýchlejší","áno","nemení sa","keď teplota stúpa a objem klesá, tak tlak rastie");
      }
      if($nazov =="IzobarickyDej2"){
        $data =  array("Izobarický Dej", "izobarbonus","273,05°C","1255°C","907,24 dm³","2050°C","1345°C");
      }
       if($nazov =="DvojstrbinovyExperiment"){
      $data =  array("Dvojštrbinový Experiment","dvojstrbina","3 pásy tesne pri sebe"
      ,"čím je väčšia, tým je na platni viac pásov","čim je väčšia, tým je na platni menej pásov",
      "čím je väčšia, tým sú pásy hrubšie","svetlo sa správa aj ako vlna aj ako častica");
      }
      if($nazov =="DvojstrbinovyExperiment2"){
        $data =  array("Dvojštrbinový Experiment","dvojstrbinabonus","3 pásy v strede","množstvo tenkých pásikov","1 hrubý pás","3 hrubé pásy","tyrkysovú","interferenčný","fotóny","pri druhom experimente sú pásy hrubšie");
      }
   return $data;
}
function cislaOdpovedi($nazov){
    if($nazov =="ArchimedovZakon"){
      $data = array(2,1,1,3,5);
      }
      if($nazov =="ArchimedovZakon2"){
      $data = array(2,3,1,2,2,2,2,3,2,3);
         }
    if($nazov =="IzobarickyDej"){
        $data =  array(2,1,1,5,3);
      }
      if($nazov =="IzobarickyDej2"){
        $data =  array(1,2,1,3,1);
      }
       if($nazov =="DvojstrbinovyExperiment"){
      $data =  array(1,3,1,1,2);
      }
      if($nazov =="DvojstrbinovyExperiment2"){
        $data =  array(3,1,2,1,1,2,2,2);
      }
   return $data;
}


function vratTextOtazky($nazov){
if($nazov =="ArchimedovZakon"){
$data =  array("<p>Čím je hustota telesa vyššia, tým viac bude v morskej vode teleso:</p>",
    "<p>Zistite, či sa guma potopí v oleji.</p>",
    "<p>Zistite, či sa železo potopí v peroxide vodíka.</p>",
    "<p>Zistite, čo majú spoločné guma a dubové drevo pri ponorení do peroxidu vodíka.</p>",
   "<p>Zväčšením telesa sa zvýši aj jeho hmostnosť a teda vytlačí viac kvapaliny. Preto:</p>");
   }
   if($nazov =="ArchimedovZakon2"){
   $data =  array("<p>Nastavte si v aplikácii typ telesa na meď, typ kvapaliny na peroxid vodíka a 
    výšku,šírku telesa nastavte na 120 cm. Aká veľká bude vztlaková sila, keď bude celé teleso ponorené pod vodou ?</p>",
   "<p>Nastavte si typ telesa na dubové drevo a typ kvapaliny na olej. Potom nastavte výšku telesa na 100 cm 
    a šírku na 75 cm. Zistite, aká veľká bude časť ponoreného objemu telesa.</p>",
   "<p>Máme dve telesá. Jedno železné s výškou 120 cm a šírkou 120 cm a druhé olovené
    s výškou 90 cm a šírkou 110 cm. 
    Zistite, na ktoré teleso pôsobí väčšia tiažová sila.</p>",
   "<p>Zistite, aký je rozdiel medzi výslednými silami. Ak ponoríme ľahké drevo s výškou 100 cm 
   a šírkou 85 cm do vody a následne ho ponoríme do morskej vody.</p>",
   "<p>Máme olovené teleso so šírkou 70 cm a výškou 70 cm a
   medené teleso s šírkou 100 cm a výškou 100 cm. Zistite, ktoré teleso má väčšiu výslednú silu pri ponorení do nafty.</p>",
    "<p>Zistite, čo sa stane, ak ponoríme ľahké drevo a železo do ropy.</p>",
    " <p>Zistite, čo sa stane, ak ponoríme gumu a meď do etanolu.</p>",
    "<p>Zistite, aký je rozdiel medzi výslednými silami, ak ponoríme teleso z olova s výškou 90 cm a šírkou 90 cm do oleja a následne do ropy.</p>",
    "<p>Zistite, aký je rozdiel medzi výslednými silami, ak ponoríme teleso z medi s výškou 90 cm a šírkou 90 cm do oleja a následne do ropy.</p>",
    "<p>Zistite, aký je rozdiel pri ponorení ľahkého dreva a gumy do oleja.</p>");

}
  if($nazov =="IzobarickyDej"){
      $data =  array("<p>Čo je základná vlastnosť izobarického deja ?</p>",
    "<p>Zistite, ako závisí rýchlosť experimentu od počiatočného objemu a počiatočnej teploty.</p>",
    "<p>Bude pre počiatočné hodnoty  100 dm³ a 50°C najvyššia nameraná teplota vyššia ako 2000°C ?</p>",
    "<p>Pomer objemu a teploty počas jedného experimentu so zvyšujúcou teplotou:</p>",
    "<p>Zistite, v akom pomere musí byť počiatočný objem a počiatočná teplota, aby bol tlak maximálny.</p>");    
      }
     if($nazov =="IzobarickyDej2"){
    $data =  array("<p>Zistite, akú teplotu bude mať plyn s objemom 500 dm³, ktorého počiatočný objem je 100 dm³ a počiatočná teplota je 10°C.</p>",
    "<p>Zistite akú hodnotu dosiahne teplota na konci experimentu. Pri počiatočnom objeme 225 dm³ a počiatočnej teplote 70°C.</p>",
    "<p>Zistite, aký veľký bude objem plynu pri počiatočnom objeme 400 dm³ a počiatočnej teplote 200°C v momente, keď dosiahne teplotu 800°C.</p>",
    "<p>Zistite, aký je teplotný rozdiel po ukončení dvoch experimentov. Prvý experiment má počiatočný objem 100 dm³ a počiatočnú teplotu 
   0°C. Druhý experiment má počiatočný objem 400 dm³ a počiatočnú teplotu  0°C.</p>",
    "<p>Zistite, aká bude maximálna teplota pri nastavení experimentu s počiatočným objemom 200 dm³ a počiatočnou teplotou 50°C.</p>");

      }
    if($nazov =="DvojstrbinovyExperiment"){
      $data =  array("<p>Čo vidíme, ak nastavíme v experimente vlnovú dĺžku svetla na minimum a  šírku štrbín spolu s vzdialenosťou štrbín na maximum ?</p>",
      "<p>Ako ovplyvňuje experiment vzdialenosť štrbín ?</p>",
      "<p>Ako ovplyvňuje experiment šírka štrbín ?</p>",
       "<p>Ako ovplyvňuje experiment vlnová dĺžka svetla ?</p>",
       "<p>Čo dokazuje dvojštrbinový experiment o svetle ?</p>");
       }
      
      if($nazov =="DvojstrbinovyExperiment2"){
        $data =  array("<p>Čo môžeme pozorovať, ak nastavíme vlnovú dĺžku svetla na 501 nm, šírku štrbiny na 2707 nm a vzdialenosť štrbín na 5037 nm ?</p>",
      " <p>Čo vidíme, ak nastavíme v experimente vlnovú dĺžku svetla na minimum, šírku štrbín na minimum a vzdialenosť štrbín na maximum ?</p>",
      "<p>Čo vidíme, ak nastavíme v experimente vlnovú dĺžku svetla na maximum, šírku štrbín na maximum a vzdialenosť štrbín na minimum ?</p>",
      "<p>Čo vidíme, ak nastavíme v experimente vlnovú dĺžku svetla na 428 nm, šírku štrbín na 1157 nm a vzdialenosť štrbín na 2237 nm ?</p>",
      "<p>Akú farbu budeme vidieť, ak nastavíme vlnovú dĺžku svetla na 490 ?</p>",
      "<p>Ako sa volá obrazec, ktorý sa zobrazuje na platni ?</p>",
      "<p>Ako sa voláju častice, ktoré dopadajú na fotografickú platňu ?</p>",
      "<p>Zistite, aký je rozdiel medzi dvomi experimentmi. Prvý experiment má vlnovú dĺžku svetla 600 nm, šírku štrbín 2000 nm a vzdialenosť štrbín 6008 nm.
   Druhý experiment má vlnovú dĺžku svetla 780 nm, šírku štrbín 2000 nm a vzdialenosť štrbín 6008 nm.</p>");

      }
return $data;

}
?>