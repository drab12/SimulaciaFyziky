var canvas = document.getElementById("canv");            
var ctx = canvas.getContext('2d');
var kadicka = new Image();
kadicka.src = "bater.png"; 
var slider = document.getElementById("slid") ;
var rychlost = document.getElementById("rychl") ;
var hodnota = document.getElementById("pohyb") ; 
var spust = false;
var pole = [];  
var pocet = 0;
var id =0;   
var chyba =0; 
var poles =[];
var polev =[];
var poleThety =[];
var polePravdepodobonost=[];                  
var kresliGulicky = false;
var kresliVlny = false;
var suc =0;
var spustac =  document.getElementById("spust");  
var stop =  document.getElementById("pauza");  
stop.style.display = "none";
var sur = 380;
var koniec = false;
var farba ;
var polomer = 50;
var zac = 580;
var vyskaPlatne = 0.5;            // 500 px
var vzdialenostPlatne =1;    // 460 px 
var sirkaStrbinyPx = 5;
var sirkaStrbinyNm = 380;
var vzdialenostPx = 50;
var vzdialenostNm = 1520
var plank = 6.62607004 *Math.pow(10, -34);
var plan = plank/(2*Math.PI)
var pppp =  plank/(sur*Math.pow(10, -9));
var pY = pppp;
var gulickaY = 0;
var gulickaX = 0;    
var vzdialenostVlnoploch = 0;
//kadicka.width = 50;
//kadicka.height = 50;

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




rychl.oninput = function(){
      if(spust){
        spusti();
        spusti();
        }
      }

hodnota.value = slider.value;     


 
slider.oninput = function(){
  hodnota.value = this.value;  
  pole.push(this.value); 
  zmenaVlnovejDlzky()
  moveDown();
}

function zmenaVlnovejDlzky(){
      slid.min = parseInt(hodnota.value);
      if(parseInt(slid.value) <= parseInt(slid.min)){  
        slid.value = parseInt(hodnota.value);
        pocTeplota.value = hodnota.value; 
        sirkaStrbinyNm = parseInt(hodnota.value);
        poles.push(hodnota.value); 
        zmenSirku();
      }  
      slide.min = parseInt(hodnota.value)*4; 
      if(parseInt(slide.value) <= parseInt(slide.min)){
          slide.value = parseInt(hodnota.value)*4;
          pocTlak.value =  parseInt(hodnota.value)*4
          vzdialenostNm =   parseInt(hodnota.value)*4
          polev.push(parseInt(hodnota.value)*4)
          zmenVzdialenost();
      }
}  
  
function moveDown() {   
      var posun = parseInt(pole[pole.length-1] - pole[pole.length-2]);              
      if(pole.length > 1){
          sur += posun;  
      }  
      else{
          sur += parseInt(pole[pole.length-1]) - sur ;  
      }
      pppp =  plank/(sur*Math.pow(10, -9));
      polePravdepodobonost=[];
      pocitaj()
      refresh(sur);
}    
                    
var slid = document.getElementById("slid2") ;
var pocTeplota = document.getElementById("pocTeplota") ;

slid.oninput = function(){
      pocTeplota.value = this.value;
      sirkaStrbinyNm = this.value 
      poles.push(this.value); 
      zmenSirku();    
}

function zmenSirku(){
      var posun = parseInt(poles[poles.length-1] - poles[poles.length-2]);           
      if(poles.length > 1){
          sirkaStrbinyPx+= (posun/76)/4; 
      }  
      else{
          sirkaStrbinyPx += parseInt(poles[poles.length-1])/76 - sirkaStrbinyPx  ;
      } 
       polePravdepodobonost=[];
       pocitaj()
       refresh(sur);        
}

var slide = document.getElementById("slid3") ;
var pocTlak = document.getElementById("pocTlak") ;

slide.oninput = function(){
      pocTlak.value = this.value;   
      vzdialenostNm = this.value
      polev.push(this.value)
      zmenVzdialenost();
}

function zmenVzdialenost(){
      var posun = parseInt(polev[polev.length-1] - polev[polev.length-2]);              
      if(polev.length > 1){
       vzdialenostPx+= posun/30;  
      }  
      else{
      vzdialenostPx += parseInt(polev[polev.length-1])/30 -vzdialenostPx ;  
      } 
       polePravdepodobonost=[];
       pocitaj()
       refresh(sur);       
}

function pocitajThetu(){
      var y = vyskaPlatne/535;
      var theta = 0;
      for(i = 1; i <536 ; i++){
        y=((vyskaPlatne/535)*i) -0.25;
        theta = Math.atan(y/vzdialenostPlatne)
        poleThety.push(theta);
      }
        
} 
/*var sucet = 0; 
var sucet1=0;
var sucet2=0; */

function pocitaj(){ 
 /*sucet = 0; 
 sucet1=0;
 sucet2=0;
 */
      suc =0;
      var prav = 0;
      var theta = 0;
      var cos =0;
      var sin =0;
      var cislo =0
      var cislo2 =0;
      var podiel = 0;
      
      
      for(i = 0; i <535 ; i++){
          theta = poleThety[i];
          pY = pppp*Math.sin(theta)
          cislo = (pY * (vzdialenostNm* Math.pow(10,-9))  )  /plan; 
          cislo2 = Math.sin((pY* (sirkaStrbinyNm * Math.pow(10,-9)) )  /(2*plan));
          cos = 1+Math.cos(cislo);
          sin = Math.pow(cislo2,2)
          podiel =  (Math.PI*  (sirkaStrbinyNm * Math.pow(10,-9)) *Math.pow(pY,2))
          //prav = ( (4*Math.pow(plan,2)) *( (1+Math.cos((pY*(vzdialenostNm* Math.pow(10,-9)))/plan))  * (Math.pow(Math.sin((pY*(sirkaStrbinyNm * Math.pow(10,-9)))/(2*plan)),2)) ) )/ (Math.PI*(sirkaStrbinyNm * Math.pow(10,-9))*Math.pow(pY,2))
          prav = ((4*Math.pow(plan,2)) *(cos*sin))/podiel
          if(podiel !=0){
            polePravdepodobonost.push(prav)
            suc += prav 
          }
          else{
              prav = (8*Math.pow(plan,2))/ Math.PI*  (sirkaStrbinyNm * Math.pow(10,-9))
              polePravdepodobonost.push(prav)
              suc += prav 
          }
    
      } 
      for (i = 0; i <535 ; i++){
            polePravdepodobonost[i] = polePravdepodobonost[i]/suc;
      /*      sucet += polePravdepodobonost[i]
            if(i<250){
              sucet1+= polePravdepodobonost[i]
      }
      else{
       sucet2 +=polePravdepodobonost[i]
      } */ 
     
      }
      /*console.log(suc,"sucet")
      console.log(sucet,"novy suc ")
      console.log(sucet1,"prva polka ")
      console.log(sucet2,"druha polka")
      console.log(poleThety,"polethety")              
      console.log(polePravdepodobonost,"pole")*/
}

function generuj(){ 
      var minX = canvas.width-335
      var minY =   (canvas.height/2)-435
      var random = Math.random();
      var pom = 0;
      var pom2 =0;
      
      for (i = 0; i <535 ; i++){
          pom2 += polePravdepodobonost[i];
          if(i==0){
            if(random <polePravdepodobonost[i] ){
                gulickaY =  minY +i+1;
                break;
            }
          }
          else{
              pom+= polePravdepodobonost[i-1];
              if(random > pom && random < pom2 ){
                  gulickaY =  minY +i+1;
                  break;
              }
      
         }
      }
      gulickaX = Math.floor(Math.random() * ((minX+325) - minX)) + minX; 
      
}    



function kresli(){
      ctx.strokeStyle= 'black'; 
      ctx.beginPath();   
      ctx.lineWidth = 5;
      ctx.moveTo(600, 40 );
      ctx.lineTo(600, 320 - sirkaStrbinyPx -vzdialenostPx/2);
      ctx.moveTo(600, 320 -vzdialenostPx/2);
      ctx.lineTo(600, 320+vzdialenostPx/2);
      ctx.moveTo(600, 320 + vzdialenostPx/2 + sirkaStrbinyPx);
      ctx.lineTo(600, 600 );
      
      
      ctx.moveTo(993, 60);
      ctx.lineTo(993, 600 );  
      
      /* ctx.moveTo(200, 280);
      ctx.lineTo(200, 360 );  
      
      ctx.moveTo(610, 280);
      ctx.lineTo(610, 360 ); */ 
      
      ctx.stroke();                                
      ctx.strokeRect((canvas.width)-340,(canvas.height/2)-440,330,540);
      //gulicka()                                  
}

var polomerVlny =400;
var pom = 0;
var druhe = false;
var prve = false;
function luce(){  
      vzdialenostVlnoploch = parseFloat(sur/20) 
      pocet =  parseInt(480 /vzdialenostVlnoploch) +1 
      chyba = (480 /vzdialenostVlnoploch)+1 
      pocet =  parseInt(480 /vzdialenostVlnoploch) +1
      chyba = chyba - pocet;
      chyba = parseInt(chyba* vzdialenostVlnoploch)               
      convert();
      ctx.fillStyle='blue';
      ctx.strokeStyle= farba; 
     // ctx.beginPath();   
      ctx.lineWidth = 2;
     /* for (i = 0; i < 38; i++) {
         ctx.moveTo((canvas.width/99) + (kadicka.width - 130), (canvas.height/3)+30);
         ctx.lineTo(598,(i*15)+40 );
      } 
      ctx.closePath();            
      ctx.stroke();*/ 
   // refresh()  
   if(spust){  
    polomerVlny += 2;
    if(prve){
    pom +=2;
    } 
    }    
    console.log(polomerVlny,"pololm") 
    console.log(pom,"pol")  
    for (i = 1; i <pocet ; i++){
      if(polomerVlny > (50 +i*vzdialenostVlnoploch)  && (polomerVlny -(i*vzdialenostVlnoploch) < 530)){
       vlnoplochy(polomerVlny-(i*vzdialenostVlnoploch),false)
       }
       else{
          if(prve){
              vlnoplochy(pom-(i*vzdialenostVlnoploch),false)
                  }
          }
     }    
    ctx.clearRect( 600 , 0, 200, canvas.height);
    if(polomerVlny > 470){
       kresliVlny = true;
       } 
    if(polomerVlny > 540){
       
        if(druhe){
          prve = false;
          }
        if(prve== false){
          pom = 62 + chyba;
          }
        prve = true;
        druhe = false;   
      
      }
    if(pom > 550){
      if(druhe== false){
          polomerVlny = 70 + chyba;
          druhe = true;
      }
    }     
}

function vlnoplochy(polom,druha){
      ctx.lineWidth = 2;
      ctx.strokeStyle= farba; 
      ctx.beginPath();
       if (druha){ 
      ctx.arc(580, 319 - (vzdialenostPx/2) - sirkaStrbinyPx/2 , polom, 5.7, 0.2 * Math.PI); 
      ctx.stroke()
      ctx.beginPath();
      ctx.arc(580, 319 + (vzdialenostPx/2) + sirkaStrbinyPx/2 , polom, 5.7, 0.2 * Math.PI);
      }
      else{
     
        ctx.arc((canvas.width/99) + (kadicka.width - 130), 285 + 34 , polom, 5.65, 0.2 * Math.PI);
      }
      
      ctx.stroke();     
}

function gulicka(){
      ctx.beginPath();
      ctx.arc(gulickaX, gulickaY, 1, 0, 2 * Math.PI);
      ctx.fillStyle= '#808080'; 
      ctx.strokeStyle= '#808080'; 
      ctx.fill();
      ctx.stroke();  

}
 function init() { 
      luce()             
      ctx.drawImage(kadicka,-20,(canvas.height/3)-140);
      kresli();
         
      slider.max = 780;
      pocitajThetu()
      pocitaj()
              /*console.log(vzdialenostNm,"vzdialenostNm")
              console.log(sirkaStrbinyNm,"sirkaStrbinyNm")
              console.log(vzdialenostNm* Math.pow(10,-9),"vzdialenost")
              console.log(plan,"plan")
              console.log(pppp,"p")
              console.log(pY,"py")
              console.log(pppp*Math.sin(0.4636476090008061),"pys")
              console.log(sirkaStrbinyNm * Math.pow(10,-9),"sirka")
              console.log(4*Math.pow(plan,2),"4x h 2")
              console.log((1+Math.cos((pY*(vzdialenostNm* Math.pow(10,-9)))/plan)),"cos")
              console.log((Math.pow(Math.sin((pY*(sirkaStrbinyNm * Math.pow(10,-9)))/(2*plan)),2)),"sinus")
              console.log((Math.PI*(sirkaStrbinyNm * Math.pow(10,-9))*Math.pow(pY,2)),"podiel")
            /*  console.log(suc,"sucet")
              console.log(sucet,"novy suc ")
              console.log(sucet1,"prva polka ")
              console.log(sucet2,"druha polka")
              console.log(poleThety,"polethety")              
              console.log(polePravdepodobonost,"pole")   */
                                           
           }
            window.onload = init;

 
 function refresh(par){   
      ctx.clearRect(0, 0, canvas.width -345, canvas.height);     
      luce()  
      ctx.drawImage(kadicka,-20,(canvas.height/3)-140); 
      kresli();
           
 }
 
 function paus(){

    spust=false;
    spustac.src="play.png" ;
    clearInterval(id);
    koniec = true;
    stop.style.display = "none";
   spec = 0; 
   polomer = 50;
   jest = false;  
   pol = false;
   kresliGulicky = false; 
   polomerVlny =400;
   pom = 0;
   druhe = false;
   prve = false;
   kresliVlny = false
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   luce()
   ctx.drawImage(kadicka,-20,(canvas.height/3)-140); 
   kresli();
    
        
   disable();
    
   
 } 
 function spusti(){  
 if (spust== false){  
 
  koniec = false;
  stop.style.display = "none";
  id = setInterval(frame, (100-parseInt(rychlost.value)));
  spust=true;
  spustac.src="pause.png" ;
  
  disable();
  
 
 }
 else{
   spustac.src="play.png" ;
   spust = false;  
   clearInterval(id);
   stop.style.display = "";
   
 }
 }
 function disable(){
  if(koniec == false){
  slider.disabled = true;
  slide.disabled = true;
  slid.disabled = true;
  
  slider.style.opacity = "0.4";
  slide.style.opacity = "0.4";
  slid.style.opacity = "0.4";
 
  }
  else{
  slider.disabled = false;
  slide.disabled = false;
  slid.disabled = false;
  slider.style.opacity = "0.7";
  slide.style.opacity = "0.7";
  slid.style.opacity = "0.7";
    
  }
 }      
 
 
 
var spec = 0; 
var jest = false;  
var pol = false;

function frame() {
    refresh() 
    chyba = (420 /vzdialenostVlnoploch)+1 
    vzdialenostVlnoploch = parseFloat(sur/20) 
    pocet =  parseInt(420 /vzdialenostVlnoploch) +1
    chyba = chyba - pocet;
    chyba = parseInt(chyba* vzdialenostVlnoploch)
    if(kresliVlny==true){ 
    polomer += 2;
    if(jest){
    spec +=2;
    } 
    console.log(pocet,"poc")
    
    for (i = 1; i <pocet ; i++){
      if(polomer > (50 +i*vzdialenostVlnoploch)  && (polomer -(i*vzdialenostVlnoploch) < 470)){
       vlnoplochy(polomer-(i*vzdialenostVlnoploch),true)
       }
       else{
          if(jest){
              vlnoplochy(spec-(i*vzdialenostVlnoploch),true)
                  }
          }
     }    
    ctx.clearRect( canvas.width -410 , 0, 67, canvas.height);
    
    if(polomer > 480){
        kresliGulicky = true;
        if(pol){
          jest = false;
          }
        if(jest== false){
          spec = 62 + chyba
          }
        jest = true;
        pol = false;   
      
      }
    if(spec > 490){
      if(pol== false){
          polomer = 70 + chyba 
          pol = true;
      }
    }
    ctx.beginPath(); 
    ctx.lineWidth = 5;
    ctx.strokeStyle= 'black'; 
    ctx.moveTo(993, 60);
    ctx.lineTo(993, 600 );
    ctx.stroke();      
    if(kresliGulicky){  
      generuj();
      gulicka();
    }
    }
  
} 

  function convert(){
    

    var w = parseFloat(sur);

    if (w >= 380 && w < 440)
    {
        red   = -(w - 440) / (440 - 380);
        green = 0.0;
        blue  = 1.0;
    }
    else if (w >= 440 && w < 490)
    {
        red   = 0.0;
        green = (w - 440) / (490 - 440);
        blue  = 1.0;
    }
    else if (w >= 490 && w < 510)
    {
        red   = 0.0;
        green = 1.0;
        blue  = -(w - 510) / (510 - 490);
    }
    else if (w >= 510 && w < 580)
    {
        red   = (w - 510) / (580 - 510);
        green = 1.0;
        blue  = 0.0;
    }
    else if (w >= 580 && w < 645)
    {
        red   = 1.0;
        green = -(w - 645) / (645 - 580);
        blue  = 0.0;
    }
    else if (w >= 645 && w < 781)
    {
        red   = 1.0;
        green = 0.0;
        blue  = 0.0;
    }
    else
    {
        red   = 0.0;
        green = 0.0;
        blue  = 0.0;
    }
        // Let the intensity fall off near the vision limits

    if (w >= 380 && w < 420)
        factor = 0.3 + 0.7*(w - 380) / (420 - 380);
    else if (w >= 420 && w < 701)
        factor = 1.0;
    else if (w >= 701 && w < 781)
        factor = 0.3 + 0.7*(780 - w) / (780 - 700);
    else
        factor = 0.0;

    var gamma = 0.80;
    var R = (red   > 0 ? 255*Math.pow(red   * factor, gamma) : 0);
    var G = (green > 0 ? 255*Math.pow(green * factor, gamma) : 0);
    var B = (blue  > 0 ? 255*Math.pow(blue  * factor, gamma) : 0); 

    var hex = "#" + decimalToHex(R) + decimalToHex(G) + decimalToHex(B);
    var output = "RGB value: " + hex;
    farba = hex;
    
    }
    
    function decimalToHex(d) {
      d = Math.round(d);
      var hex = d.toString(16);
      while (hex.length < 2) {
          hex = "0" + hex;
      }
      return hex;
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
        var t = document.createTextNode("Dvojštrbinový experiment"); 
       dat.appendChild(date); 
       tim.appendChild(time);    
       h.appendChild(t);                                   
       document.body.appendChild(h); 
       document.body.appendChild(tim); 
       document.body.appendChild(dat);
       h.style.position = 'absolute';
       h.style.left ='230px';
       tim.style.position = 'absolute';
       tim.style.left = '40px';
       dat.style.position = 'absolute';
       dat.style.left = '670px' 
       
       document.getElementById("rychlostlabel").style.display='none';
        
       window.print();
      // document.getElementById("rychlost").style.display='none' ;
       document.body.removeChild(h);
       document.body.removeChild(tim);
       document.body.removeChild(dat);
       return false;
    
   
   
 }        
