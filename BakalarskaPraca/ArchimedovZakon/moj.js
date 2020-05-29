var canvas = document.getElementById("canv");    
var ctx = canvas.getContext('2d');
var kadicka = new Image();
var kvader = new Image();
var vektorVztlaku = new Image();
var vektorVzduchu = new Image();
var slider = document.getElementById("slid") ;
var hodnota = document.getElementById("pohyb") ; 
var druhKvapaliny =  document.getElementById("Druh2") ; 
var druhTelesa =  document.getElementById("Druh") ; 
var objem = document.getElementById("objem");
var ponorenyObjem = document.getElementById("objemp");
var hustotaTelesa = document.getElementById("hustotaTelesa");    
var hustotaKvapaliny = document.getElementById("hustotaKvapaliny");
var tiazovaSila = document.getElementById("tiazova");
var vztlakovaSila = document.getElementById("vztlakova");
var vyslednaSila =  document.getElementById("vysledna");
var spustac =  document.getElementById("spust");  
var stop =  document.getElementById("pauza");  
stop.style.display = "none";
var koniec = false;

var zmenaVyskyVody = 0;
var g = 9.80;  
var pole = [];
var polev =[];  
var poles = [];      
var sur = 0;
var spust = false;
var id =0;    
var rychlost = 0;
var zrychlenie =0;
var draha = 0;
var odporvzduchu = 0.5*(kvader.width/10)*1.204*1.05 * rychlost;
var odporvody = 0;
var hust = 1.204
var velkostVektora =0;

var sirkaVody = 334/100
var vyskaVody = 180/100 

vektorVzduchu.src = "ArchimedovZakon/vzduch.png"
vektorVztlaku.src = "ArchimedovZakon/vztlak.png"
kadicka.src = "ArchimedovZakon/kad3.png"; 
kvader.src = "ArchimedovZakon/zelezo.png"; 
hodnota.value = (slider.max - slider.value).toFixed(2);      
kvader.height= 50;              
kvader.width= 50;
kadicka.height =  300  ;
kadicka.width =  350 ;
var vyskaKvadra = (kvader.height)/100;
var sirkaKvadra = (kvader.width)/100;
var stredKvadra = (kadicka.width/2)-(kvader.width/2) 


function bezMenu(){
 const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const menu = urlParams.get('menu');
    if (menu == 'off') 
        {
      document.getElementById("navigacia").style.display = "none";
     

}
}
bezMenu();

// ************************     POLOHA A ROZMERY TELESA *******************************************************

function vektor(){
         if(parseInt(vztlakovaSila.value) < parseInt(tiazova.value) ){
          velkostVektora= parseInt(vztlakovaSila.value) / parseInt(tiazova.value);
          }
          else{
              velkostVektora= parseInt(vztlakovaSila.value) / parseInt(tiazova.value);
              if(velkostVektora > 2){
                  velkostVektora = 1 + (velkostVektora-1)/2
              }
          }
            
          if (sur + kvader.height  > canvas.height/2 + 100 - zmenaVyskyVody) {
            ctx.drawImage(vektorVztlaku,(canvas.width/2)+stredKvadra ,(sur + kvader.height/2) - (kvader.height/2)* velkostVektora  ,kvader.width,(kvader.height/2)* velkostVektora) ; 
            ctx.drawImage(vektorVzduchu,(canvas.width/2) +stredKvadra ,sur + kvader.height/2,kvader.width,kvader.height/2) ;
          
                   
          }
          else{   
              ctx.drawImage(vektorVzduchu,(canvas.width/2) +stredKvadra ,sur+kvader.height/2,kvader.width,kvader.height/2) ;
         }   
 }                

slider.oninput = function(){
        hodnota.value = (slider.max - this.value).toFixed(2) ;  
        pole.push(this.value);    
        moveDown();
}  
  
function moveDown() {      
        var posun = parseFloat(pole[pole.length-1] - pole[pole.length-2]);        
        if(pole.length > 1){
            sur += (posun*100);  
        }  
        else{
            sur += (parseFloat(pole[pole.length-1])*100) ;  
        }  
        refresh();       
        ctx.drawImage(kvader,(canvas.width/2)+stredKvadra,sur,kvader.width,kvader.height) ;
        vektor()
 }
                 
 // Vyska telesa
var slid = document.getElementById("slid2") ;
var vyska = document.getElementById("vyska") ;

slid.oninput = function(){
        vyska.value = this.value;
        polev.push(this.value); 
        zmenVysku()
}

function zmenVysku() {             
        var posun = parseInt(polev[polev.length-1] - polev[polev.length-2]); 
        if(polev.length > 1){
            kvader.height += posun;  
        }
        else{
            kvader.height += (parseInt(polev[polev.length-1])) - kvader.height;    
        } 
        vyskaKvadra = (kvader.height)/100;  
        restart();  
        refresh();
        if(sur/100 > parseFloat(slider.max) ){
            sur = (parseFloat(slider.max)*100)
            slider.value = slider.max;
            hodnota.value = (slider.max - slider.value).toFixed(2);
            pole.push(slider.value);
        } 
        refresh();
        ctx.drawImage(kvader,(canvas.width/2)+stredKvadra,sur,kvader.width,kvader.height);
        vektor()   
}  
 
// Sirka telesa
var slide = document.getElementById("slid3") ;
var sirka = document.getElementById("sirka") ;

slide.oninput = function(){
        sirka.value = this.value;   
        poles.push(this.value);
        zmenSirku()
}    

function zmenSirku() {              
        var posun = parseInt(poles[poles.length-1] - poles[poles.length-2]);   
        if(poles.length > 1){
            kvader.width += posun;  
        }  
        else{
           kvader.width += (parseInt(poles[poles.length-1])) - kvader.width;
        } 
        stredKvadra = (kadicka.width/2)-(kvader.width/2)  
        sirkaKvadra = (kvader.width)/100; 
        restart(); 
        refresh();     
        ctx.drawImage(kvader,(canvas.width/2)+stredKvadra,sur,kvader.width,kvader.height);
        vektor()
        } 
 // *******************************************************************************


  

function nacitaj() {  
       if(druhKvapaliny.value=="Olej"){ 
       ctx.fillStyle='yellow';
        ctx.strokeStyle='yellow';
        hustotaKvapaliny.value = 910;
       ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100,334,180);
       } 
        if(druhKvapaliny.value=="Voda"){ 
       ctx.fillStyle='#52bdf4';
        ctx.strokeStyle='#52bdf4';
       ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100,334,180);
       hustotaKvapaliny.value = 997;
       } 
       if(druhKvapaliny.value=="Morska voda"){ 
       ctx.fillStyle='#4db283';
        ctx.strokeStyle='#4db283';
       ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100,334,180);
       hustotaKvapaliny.value = 1024;
       }  
        if(druhKvapaliny.value=="Etanol"){ 
       ctx.fillStyle='#e2e2cf';
        ctx.strokeStyle='#e2e2cf';
       ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100,334,180);
       hustotaKvapaliny.value = 789;
       }
        if(druhKvapaliny.value=="Nafta"){ 
       ctx.fillStyle='#fffe79';
        ctx.strokeStyle='#fffe79';
       ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100,334,180);
       hustotaKvapaliny.value = 820;
       }
       if(druhKvapaliny.value=="Peroxid vodika"){ 
       ctx.fillStyle='#f5f0d6';
        ctx.strokeStyle='#f5f0d6';
       ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100,334,180);
       hustotaKvapaliny.value = 1450;
       }
       if(druhKvapaliny.value=="Ropa"){ 
       ctx.fillStyle='#363636';
        ctx.strokeStyle='#363636';
       ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100,334,180);
       hustotaKvapaliny.value = 860;
       }
       
       
      
       
       if(druhTelesa.value == "Zelezo") {
          hustotaTelesa.value = 7870;
          kvader.src = "ArchimedovZakon/zelezo.png";    
          }  
        if(druhTelesa.value == "Med") {   
        hustotaTelesa.value = 8960; 
        kvader.src = "ArchimedovZakon/med.png";    
       }   
        if(druhTelesa.value == "Olovo") {  
        hustotaTelesa.value = 11340; 
        kvader.src = "ArchimedovZakon/olovo.png";    
       }   
        if(druhTelesa.value == "Drevo") { 
        hustotaTelesa.value = 100;  
        kvader.src = "ArchimedovZakon/drevo.png";   
       }  
        if(druhTelesa.value == "Dub") { 
        hustotaTelesa.value = 630;  
        kvader.src = "ArchimedovZakon/papier.png";   
       }
        if(druhTelesa.value == "Guma") { 
        hustotaTelesa.value = 1000;  
        kvader.src = "ArchimedovZakon/guma.png";   
   }    
       
       restart();
       refresh(); 
       kvader.onload = function(){            
       ctx.drawImage(kvader,(canvas.width/2)+stredKvadra,sur,kvader.width,kvader.height) ; 
       vektor()
   }  

}

 function init() {  
         ctx.drawImage(kadicka,canvas.width/2,canvas.height/2,kadicka.width,kadicka.height);
         ctx.fillStyle='#52bdf4';
         ctx.strokeStyle='#52bdf4';
         ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100,334,180);
         ctx.drawImage(kvader,(canvas.width/2)+stredKvadra,sur,kvader.width,kvader.height) ;   
         slider.max = ((((canvas.height/2) + kadicka.height) - parseInt(kvader.height)-20))/100;
         hodnota.value = (slider.max - slider.value).toFixed(2);       
         hustotaTelesa.value = 7870;
         hustotaKvapaliny.value = 997;
         objem.value =  (vyskaKvadra * sirkaKvadra).toFixed(2);
         tiazovaSila.value = (objem.value*g* hustotaTelesa.value) .toFixed(2); 
         vztlakovaSila.value = (ponorenyObjem.value*g*hustotaKvapaliny.value).toFixed(2);
         vyslednaSila.value =   (tiazovaSila.value  -  vztlakovaSila.value).toFixed(2);
         vektor()         
   }
window.onload = init;

 function restart(){
         slider.max = ((((canvas.height/2) + kadicka.height) - parseInt(kvader.height)-20))/100;
         objem.value =    (vyskaKvadra * sirkaKvadra).toFixed(2);
         tiazovaSila.value = (objem.value*g* hustotaTelesa.value).toFixed(2);                                    
 }
 
 function refresh(){
         zmenPonor(); 
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.drawImage(kadicka,canvas.width/2,canvas.height/2,kadicka.width,kadicka.height);
         vektor()
         ctx.fillRect((canvas.width/2)+8,(canvas.height/2)+100 - zmenaVyskyVody ,334,180 + zmenaVyskyVody);
         // Nit   
         ctx.beginPath(); 
         ctx.strokeStyle= 'black'; 
         ctx.moveTo((canvas.width/2)+ stredKvadra + kvader.width/2 ,0);
         ctx.lineTo((canvas.width/2)+ stredKvadra + kvader.width/2, sur);
         ctx.stroke();
   
         
                 
 }
 
 
 function zmenPonor(){ 
   if(sur + kvader.height  > canvas.height/2 +100 - zmenaVyskyVody) {
      if (sur <= canvas.height/2 +100 - zmenaVyskyVody){
          ponorenyObjem.value =(((((sur + kvader.height) - (canvas.height/2 + 100 - zmenaVyskyVody)))/100) * sirkaKvadra).toFixed(2);
      }
      else{      
          ponorenyObjem.value = objem.value;
      }          
   }
   else{  
      ponorenyObjem.value = 0;
   }
   zmenaVyskyVody = (((((sirkaVody*vyskaVody) +  parseFloat(ponorenyObjem.value))/sirkaVody)*100) - ((sirkaVody*vyskaVody)/sirkaVody)*100);
   vztlakovaSila.value =  (ponorenyObjem.value*g*hustotaKvapaliny.value) .toFixed(2);
   vyslednaSila.value = Math.abs( (tiazovaSila.value  -  vztlakovaSila.value).toFixed(2));
   
 }
 function myMove() {
  var rovnovaha = false;
  var ponorene = false; 
  id = setInterval(frame, 10);
  function frame() {
    
  if ((sur >= parseInt((((canvas.height/2) + kadicka.height) - parseInt(kvader.height)-19))) || (sur ==(parseFloat(slider.max)*100) && parseInt(hustotaTelesa.value) > parseInt(hustotaKvapaliny.value) )) {
      clearInterval(id);      
      refresh();       
      sur = (parseFloat(slider.max)*100)
      slider.value = slider.max;
      hodnota.value = (slider.max - slider.value).toFixed(2);
      pole.push(slider.value);       
      ctx.drawImage(kvader,(canvas.width/2)+ stredKvadra,sur,kvader.width,kvader.height) ;
      vektor()   
      spust = false
      spustac.src="ArchimedovZakon/play.png" ;
      koniec = true;
      disable();
  }
  else{ 
       spustac.src="ArchimedovZakon/pause.png" ; 
       odporvody = (0.5*1.05*hustotaKvapaliny.value*sirkaKvadra*(rychlost*rychlost)).toFixed(2);
       odporvzduchu = (0.5*1.05*hust*sirkaKvadra*(rychlost*rychlost)).toFixed(2); 
       if(rychlost ==0){
           zrychlenie= ((tiazovaSila.value - vztlakovaSila.value  -((ponorenyObjem.value /objem.value)*odporvody) -((1-(ponorenyObjem.value /objem.value))*odporvzduchu) )/ (objem.value *  hustotaTelesa.value)).toFixed(2);
       }
       else{    
           zrychlenie= ((tiazovaSila.value - vztlakovaSila.value  -((ponorenyObjem.value /objem.value)*(rychlost/ Math.abs(rychlost)) *odporvody) -((1-(ponorenyObjem.value /objem.value))*(rychlost/ Math.abs(rychlost)) *odporvzduchu) )/ (objem.value *  hustotaTelesa.value)).toFixed(2);
           }       
           console.log(tiazovaSila.value - vztlakovaSila.value  - odporvzduchu -odporvody,"suc") 
           rychlost += zrychlenie*0.01;
           draha = rychlost*0.01;
           sur+= draha*10;
           refresh();
           ctx.drawImage(kvader,(canvas.width/2)+ stredKvadra,sur,kvader.width,kvader.height) ;
           vektor() 
           console.log(ponorenyObjem.value /objem.value,"objemova konstanta")
           console.log(tiazovaSila.value,"tiaz")
           console.log(vztlakovaSila.value,"vztlak")
           console.log(odporvzduchu,"ovzduch")    
           console.log(hust,"hustota")                     
           console.log(-((rychlost/ Math.abs(rychlost)) *odporvzduchu),"znamienko"); 
           console.log(zrychlenie,"zrychlenie")
           console.log(rychlost,"rychlost")
           console.log(draha,"draha")
           console.log(zmenaVyskyVody,"vyskaVody")  
           pole.push((sur/100));
           slider.value = (sur/100);
           hodnota.value = (slider.max -   ((sur/100)).toFixed(2)).toFixed(2);  
      }            
      
      if( ((rychlost >= 0 && rychlost < 0.99) || (rychlost < 0 && rychlost > -0.8) )  && ((zrychlenie >= 0 && zrychlenie < 1.4) || (zrychlenie < 0 && zrychlenie > -1.4) ) && ((draha >= 0 && draha < 0.0095 )|| (draha < 0 && draha > -0.0095 )   )  ) {
      //if(rychlost >= 0 && rychlost < 0.8 && ((zrychlenie >= 0 && zrychlenie < 1.4) || (zrychlenie < 0 && zrychlenie < -1.4) ) && draha >= 0 && draha < 0.0095 ){
      var prem = 100
      if(parseInt(hustotaTelesa.value) == 1000){
        var prem = 50;
        }
         console.log(ponorenyObjem.value,"ponor") 
        if(Math.abs(vyslednaSila.value) <prem){      
            console.log(ponorenyObjem.value,"ponor") 
            refresh();   
            ctx.drawImage(kvader,(canvas.width/2)+ stredKvadra,sur,kvader.width,kvader.height) ; 
                 
            pole.push((sur/100));
            slider.value = (sur/100);
            hodnota.value = (slider.max - ((sur/100)).toFixed(2)).toFixed(2);
            vztlakovaSila.value = tiazovaSila.value;
            ponorenyObjem.value = (tiazovaSila.value/(hustotaKvapaliny.value*g)).toFixed(2);
            vyslednaSila.value = 0;
            vektor();
            clearInterval(id); 
            spustac.src="ArchimedovZakon/play.png" ; 
            spust = false
            koniec = true;
            disable();
        }            
    }
   
  }
}

function spusti(){  
 if (spust== false){  
 stop.style.display = "none";
  myMove();
  koniec = false;
  spust=true;
  disable();
  
 
 }
 else{
   spustac.src="ArchimedovZakon/play.png" ;
   spust = false;  
   clearInterval(id);
   stop.style.display = "";
 }
 }
 function paus(){

    spust=false;
    spustac.src="ArchimedovZakon/play.png" ;
    clearInterval(id);
    koniec = true;
    stop.style.display = "none";
    disable();
    
   
 }
 
 
 function disable(){
  if(koniec == false){
  slider.disabled = true;
  slide.disabled = true;
  slid.disabled = true;
  slider.style.opacity = "0.4";
  slide.style.opacity = "0.4";
  slid.style.opacity = "0.4";
  druhKvapaliny.disabled = true;
  druhTelesa.disabled = true;
  }
  else{
  slider.disabled = false;
  slide.disabled = false;
  slid.disabled = false;
  slider.style.opacity = "0.7";
  slide.style.opacity = "0.7";
  slid.style.opacity = "0.7";
   druhKvapaliny.disabled = false;
  druhTelesa.disabled = false;
  rychlost = 0;
  draha =0;
  zrychlenie =0;
  
  }
 }
 
 function printni(){
        
        var dt = new Date();
        var ho = dt.getHours();
        var mi = dt.getMinutes();
        var se = dt.getSeconds(); 
        var tim = document.createElement("P")           
        var time = document.createTextNode("" +Math.floor(ho / 10) + "" + ho % 10 + ":" +
                                               Math.floor(mi / 10) + "" + mi % 10 + ":" +
                                               Math.floor(se / 10) + "" + se % 10); 
            
        y = dt.getFullYear();
        m = dt.getMonth() + 1;
        d = dt.getDate();
        var dat = document.createElement("P");
        var date = document.createTextNode("" +  Math.floor(d / 10) + '' + (d % 10) +'-'+ Math.floor(m / 10) + '' + (m % 10) +'-'+ y );         
        var h = document.createElement("H1")                
        var t = document.createTextNode("Archimedov zákon"); 
       dat.appendChild(date); 
       tim.appendChild(time);    
       h.appendChild(t);                                   
       document.body.appendChild(h); 
       document.body.appendChild(tim); 
       document.body.appendChild(dat);
       h.style.position = 'absolute';
       h.style.left ='270px';
       tim.style.position = 'absolute';
       tim.style.left = '40px';
       dat.style.position = 'absolute';
       dat.style.left = '670px'  
       window.print(); 
       document.body.removeChild(h);
       document.body.removeChild(tim);
       document.body.removeChild(dat);
    
   
   
 }      
