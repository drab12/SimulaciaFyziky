var canvas = document.getElementById("canv");            
var ctx = canvas.getContext('2d');
var kadicka = new Image();
kadicka.src = "valec6.png"; 
var piest = new Image();
piest.src = "piestskoro.png"; 
var ohen0 = new Image();
ohen0.src = "ohne/fire0.png" ;
var ohen1 = new Image();
ohen1.src = "ohne/fire1.png" ;
var ohen2 = new Image();
ohen2.src = "ohne/fire2.png" ;

var slider = document.getElementById("slid") ;
var hodnota = document.getElementById("pohyb") ; 
var objem = document.getElementById("objem");
var teplota = document.getElementById("teplota");
var konstanta = 0;
var zmenaVyskyObjemu = 0;
var staraZmena = 0;
var resetujGraf = false;
var spustac =  document.getElementById("spust");  
var reset =  document.getElementById("reset"); 
reset.style.display = "none"; 
var stop =  document.getElementById("pauza");  
stop.style.display = "none";
var extrapol =  document.getElementById("extrapol"); 
var pocTlak = document.getElementById("pocTlak") ;
var typPlynu =  document.getElementById("Druh") ; 
extrapol.style.display = "none";
typPlynu.value = "Vodik";    


var kresliPrvy = true;
var pocTeplota = document.getElementById("pocTeplota") ;
var zmenaTeploty = 5;
var spust = false;
var pole = [];  
var id =0;  
var ohnik =0;  
var startzberu = true;
var graf =0; 
var sur = (canvas.height/2)-2;
var obj = sur;
var koniec = false; 
var p = -1;
var poley = [];
var polex = [];
var polek = []; 
var polet = [];
var poleExtrapol = [];
var vyskaOkna = window.innerHeight;

var r = 8.314472;
var n = 0;
var hustotaPlynu = 0;  
var molova = 0;  



$(window).resize(function() {
        location.reload();
});



    if((window.innerHeight/2) + 100 < window.innerHeight){  
        document.getElementById("chart").style.height = (window.innerHeight/2 +100)  +'px' 
        }






function bezMenu(){
 const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const menu = urlParams.get('menu');
    console.log(menu);
    if (menu == 'off') 
        {
      document.getElementById("navigacia").style.display = "none";
      document.getElementById("tlacidla").style.position = "relative";
      }
      else{
       document.getElementById("navigacia").style.display = "block";
      }
}
bezMenu();



var layout = {
    title: 'Graf',
    xaxis: {
    //title: 'Teplota [°C]'
  },
  yaxis: {
   // title: 'Objem [m³]'
    
  },
  showlegend: true,
  legend: {
  xanchor:"center",
    yanchor:"top",
    y:-0.1, 
    x:0.5  
   
  
  
  },
  annotations: [{
   // xref: 'paper',
    yref: 'paper',
    x: 0,
    xanchor: 'right',
    y: 1,
    yanchor: 'bottom',
    text: 'Objem (dm³)',
    showarrow: false
  }, {
    xref: 'paper',
   // yref: 'paper',
    x: 1,
    xanchor: 'left',
    y: 0,
    yanchor: 'top',
    text: 'Teplota/°C',
    showarrow: false
  }] 
  
};


kresligraf();
 

function kresligraf(){
   
  if( p==-1 || resetujGraf == true){
    Plotly.newPlot('chart',[],layout);
     resetujGraf = false; 
    }
  p++;  
  Plotly.addTraces('chart', {x: [],y: [],name: typPlynu.value + ' ' + pocTlak.value +' Pa, [ ' + hodnota.value +' °C , ' + pocTeplota.value +' dm³ ]' ,mode: 'lines'}); 
  poleExtrapol.push(p); 
  
}

function kresli() {
    Plotly.extendTraces('chart',{ y:[[objem.value]],x:[[teplota.value]]}, [p]); 
    if (spust == false ){
        clearInterval(graf); 
    }    
}
 


  
hodnota.value = slider.value; 
    
piest.height= 100;
piest.width= 289;
kadicka.height =  600  ;
kadicka.width =  306 ;
ohen0.width = 300;
ohen0.height = 200;
ohen1.width = 300;
ohen1.height = 200;
ohen2.width = 300;
ohen2.height = 200;
objem.value = parseFloat(hodnota.value).toFixed(2); 
var zaciatok = (canvas.height/2) +1;

 
  slider.oninput = function(){
          hodnota.value = this.value;  
          pole.push(this.value); 
          objem.value = parseFloat(hodnota.value).toFixed(2); 
          teplota.value =parseFloat(pocTeplota.value).toFixed(2);
          
          pocTlak.value=  parseInt( ( (parseFloat(teplota.value)  +273.15  )*r*n)/ (  parseFloat(objem.value)/1000   ) )
          slide.value = pocTlak.value;  
                 
          obj = sur
          konstanta = parseFloat(  (parseFloat(hodnota.value)*0.001 ) / (parseFloat(teplota.value)+273.15) );   
          moveDown();
}  
  
  function moveDown() { 
         
          var posun = parseFloat(pole[pole.length-1] - pole[pole.length-2]);        
          if(pole.length > 1){
              sur -= parseFloat((posun/(289/12.34))*12.34); 
              
          }  
          else{
              sur -= parseInt((parseInt(pole[pole.length-1])/(289/12.34))*12.34) -(100/(289/12.34))*12.34    ;
          } 
          obj = sur;
           console.log(sur,"sur")              
          refresh(sur);
          ctx.drawImage(piest,(canvas.width/2)+7,sur,piest.width,piest.height) ;   
 }    
                    
var slid = document.getElementById("slid2") ;
var pocTeplota = document.getElementById("pocTeplota") ;

  slid.oninput = function(){
          pocTeplota.value = this.value;
          teplota.value = parseFloat(this.value).toFixed(2);
          objem.value= parseFloat(hodnota.value).toFixed(2); 
          pocTlak.value=  parseInt( ( (parseFloat(teplota.value)  +273.15  )*r*n)/ (  parseFloat(objem.value)/1000   ) )
              
          slide.value = pocTlak.value;
          obj = sur
          konstanta = parseFloat(  (parseFloat(hodnota.value)*0.001 ) / (parseFloat(teplota.value)+273.15) );   
}

var slide = document.getElementById("slid3") ;
var pocTlak = document.getElementById("pocTlak") ;
var pom = 0;
  slide.oninput = function(){
          //pocTlak.value = this.value;   
          objem.value = parseFloat(hodnota.value).toFixed(2);
          teplota.value =parseFloat(pocTeplota.value).toFixed(2);
          obj = sur 
          pocTlak.value = this.value;
          pom = pocTeplota.value = parseInt((  (  (parseFloat(objem.value)/1000)*parseFloat(pocTlak.value))   /(n*r)) -273.15);
          if((parseFloat(pocTeplota.value)>slid.min || pom > slid.min) && (parseFloat(pocTeplota.value)<slid.max || pom < slid.max) ){
          pocTeplota.value = parseInt((  (  (parseFloat(objem.value)/1000)*parseFloat(pocTlak.value))   /(n*r)) -273.15);
          teplota.value = pocTeplota.value;
          slid.value =   pocTeplota.value;
          }
          else{
          if(parseFloat(pocTeplota.value) >= slid.max){
           pocTeplota.value =slid.max;
           teplota.value = pocTeplota.value;
          slid.value =   pocTeplota.value;
          
          }
          else{
           pocTeplota.value =0;
           teplota.value = pocTeplota.value;
          slid.value =   pocTeplota.value;
          }
          hodnota.value =  (parseFloat(((parseFloat(pocTeplota.value)+273.15)*n*r)/parseFloat(pocTlak.value)).toFixed(2))*1000;
          objem.value =  hodnota.value;
          slider.value =  hodnota.value;
          obj = sur
          pole.push(hodnota.value);
          moveDown();
          
          }
          konstanta = parseFloat(  (parseFloat(hodnota.value)*0.001 ) / (parseFloat(teplota.value)+273.15) );   
          
           
}



function nacitaj() {  
       if(typPlynu.value=="Vodik"){
        molova = 1/1000; 
        hustotaPlynu = 0.08895;
        n = (hustotaPlynu*(parseInt(slider.min)/1000))/molova;
        slide.min=  parseInt( ( (parseFloat(slid.min)+273.15  )*r*n)/(parseFloat(slider.max)/1000  )) 
        slide.max=  parseInt( (  (parseFloat(slid.max) +273.15 )*r*n)/ (parseFloat(slider.min)/1000)  )     
        pocTlak.value=  parseInt( ( (parseFloat(teplota.value)  +273.15  )*r*n)/ (  parseFloat(objem.value)/1000   ) )
        slide.value = pocTlak.value; 
        
       } 
        if(typPlynu.value=="Dusik"){ 
          molova = 7/1000;
          hustotaPlynu = 1.234;
          n = (hustotaPlynu*(parseInt(slider.min)/1000))/molova;
          slide.min=  parseInt( ( (parseFloat(slid.min)+273.15  )*r*n)/(parseFloat(slider.max)/1000  )) 
          slide.max=  parseInt( (  (parseFloat(slid.max) +273.15 )*r*n)/ (parseFloat(slider.min)/1000)  )     
          pocTlak.value=  parseInt( ( (parseFloat(teplota.value)  +273.15  )*r*n)/ (  parseFloat(objem.value)/1000   ) )
          slide.value = pocTlak.value; 
          
       } 
       if(typPlynu.value=="Helium"){
          hustotaPlynu = 0.1762;
          molova = 2/1000;
          n = (hustotaPlynu*(parseInt(slider.min)/1000))/molova
          slide.min=  parseInt( ( (parseFloat(slid.min)+273.15  )*r*n)/(parseFloat(slider.max)/1000  )) 
          slide.max=  parseInt( (  (parseFloat(slid.max) +273.15 )*r*n)/ (parseFloat(slider.min)/1000)  )     
          pocTlak.value=  parseInt( ( (parseFloat(teplota.value)  +273.15  )*r*n)/ (  parseFloat(objem.value)/1000   ) )
          slide.value = pocTlak.value; 
          
       }  
       
}    

  function init() {             
          ctx.drawImage(kadicka,canvas.width/2,(canvas.height/4)-180,kadicka.width,kadicka.height);
          ctx.drawImage(piest,(canvas.width/2)+7,(canvas.height/2)-2,piest.width,piest.height) ;     
          ctx.drawImage(ohen0,(canvas.width/2)+5,(canvas.height/4)+410,ohen0.width,ohen0.height) ;     
          ctx.fillStyle= '#86e1ff' //rgb(134, 225, 255);
          ctx.strokeStyle= '#86e1ff' //rgb(134, 225, 255);         
           molova = 1/1000; 
          hustotaPlynu = 0.08895;
          n = (hustotaPlynu*(parseInt(slider.min)/1000))/molova;
          slide.min=  parseInt( ( (parseFloat(slid.min)+273.15  )*r*n)/(parseFloat(slider.max)/1000  )) 
          slide.max=  parseInt( (  (parseFloat(slid.max) +273.15 )*r*n)/ (parseFloat(slider.min)/1000)  )     
          pocTlak.value=  parseInt( ( (parseFloat(teplota.value)  +273.15  )*r*n)/ (  parseFloat(objem.value)/1000   ) )
          slide.value = pocTlak.value; 
                                  
}
          window.onload = init;

 
  function refresh(par){     
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(kadicka,canvas.width/2,(canvas.height/4)-180,kadicka.width,kadicka.height); 
          if(ohnik==0){
            ctx.drawImage(ohen0,(canvas.width/2)+5,(canvas.height/4)+410,ohen0.width,ohen0.height) ; 
          }   
          if(ohnik==1){
            ctx.drawImage(ohen1,(canvas.width/2)+5,(canvas.height/4)+410,ohen1.width,ohen1.height) ; 
          }   
          if(ohnik==2){
            ctx.drawImage(ohen2,(canvas.width/2)+5,(canvas.height/4)+410,ohen2.width,ohen2.height)
            ohnik =0;
          }
          ohnik++;                            
          zmenPiest(par);                        
 }

  function zmenPiest(par){
          if(par < zaciatok) {
             ctx.fillRect((canvas.width/2)+7,par+piest.height -1,287,(zaciatok-par));
             //console.log(zaciatok-par,"vyska")                                 
          }     
} 
 
  function frame() {
       
          
          if (obj < (canvas.height/4)-226) {
              clearInterval(id);
              refresh(obj);   
              ctx.drawImage(piest,(canvas.width/2)+7,obj,piest.width,piest.height) ;
              obj = sur;         
              spustac.src="play.png" ; 
              spust = false
              koniec = true;
              startzberu = true;
              konstanta =0;
              disable();  
              reset.style.display = "";
              extrapol.style.display = "";
              Plotly.restyle('chart',{name: typPlynu.value +' ' + pocTlak.value +' Pa, [ ' + hodnota.value +' °C , ' + pocTeplota.value +' dm³ ] --> [ ' + teplota.value + ' °C , ' + objem.value + ' dm³ ]'}, [p]);    
            
          } 
          else {
              spustac.src="pause.png" ;
             //console.log(konstanta,"konst")
              teplota.value = (parseFloat(teplota.value)  +zmenaTeploty).toFixed(2) ;
              if(konstanta==0 || konstanta =='Infinity' ){
                konstanta = parseFloat(  (parseFloat(hodnota.value)*0.001 ) / (parseFloat(pocTeplota.value)+273.15) );   
                if(konstanta =='Infinity'){
                  konstanta = parseFloat(  (parseFloat(hodnota.value)*0.001 ) / (parseFloat(teplota.value)+273.15) );
                }
               
              }
              if(startzberu){
                  poley.push(parseInt(objem.value))
                  polex.push(parseInt(teplota.value))
                  polek.push(parseFloat(konstanta)) 
                  startzberu = false;
                  if(konstanta <0.00099){
                  zmenaTeploty = 5;
                  } 
                 
              }  
              staraZmena =  (parseInt(objem.value)/(289/12.34))*12.34
              objem.value = parseFloat(((parseFloat(teplota.value)+273.15) * konstanta)*1000).toFixed(2);
              zmenaVyskyObjemu = ((parseInt(objem.value)/(289/12.34))*12.34) - staraZmena ;
              console.log(konstanta,"konstanta")           
              obj-=zmenaVyskyObjemu;
              /*ohen.src="ohne/ohen-"+ ohnik + ".png";
              console.log(ohen.src);
              ohnik++;
              if(ohnik==){
              ohnik=0;
               } */ 
              refresh(obj);
              ctx.drawImage(piest,(canvas.width/2)+7,obj,piest.width,piest.height) ;           
            }
  
}

  function spusti(){  
          if(kresliPrvy){
            kresliPrvy = false;
            Plotly.deleteTraces('chart', p);
            Plotly.addTraces('chart', {x: [],y: [],name: typPlynu.value + ' ' + pocTlak.value +' Pa, [ ' + hodnota.value +' °C , ' + pocTeplota.value +' dm³ ]' ,mode: 'lines'});  
          
          }
          if (spust== false){
            
            if(koniec){
              
              kresligraf();
              objem.value = parseFloat(hodnota.value).toFixed(2); 
              teplota.value = parseFloat(pocTeplota.value).toFixed(2);
              
               
              refresh(sur);
              ctx.drawImage(piest,(canvas.width/2)+7,sur,piest.width,piest.height) ; 
            }
             
            koniec = false;
            extrapol.style.display = "none";
            stop.style.display = "none";
            reset.style.display = "none"; 
            graf =setInterval(kresli,100);
            id = setInterval(frame, 100);
            
            spust=true;
            disable();                        
          }
          else{
            spustac.src="play.png" ;
            spust = false;  
            clearInterval(id);
            extrapol.style.display = "none";
            reset.style.display = "none"; 
            stop.style.display = "";
          }
 }
  function paus(){
          spust=false;
          spustac.src="play.png" ;
          clearInterval(id);
          koniec = true;
          stop.style.display = "none";
          reset.style.display = ""; 
          extrapol.style.display = "";
          obj=sur;
          konstanta =0;
          startzberu = true
          Plotly.restyle('chart',{name: typPlynu.value + ' ' + pocTlak.value +' Pa, [ ' + hodnota.value +' °C , ' + pocTeplota.value +' dm³ ] --> [ ' + teplota.value + ' °C , ' + objem.value + ' dm³ ]'}, [p]);
          disable();   
 }
 
  function disable(){
      if(koniec == false){
          slider.disabled = true;
          slide.disabled = true;
          slid.disabled = true;
          typPlynu.disabled = true;
          slider.style.opacity = "0.4";
          slide.style.opacity = "0.4";
          slid.style.opacity = "0.4";
      }
      else{
          slider.disabled = false;
          slide.disabled = false;
          slid.disabled = false;
          typPlynu.disabled = false;
          slider.style.opacity = "0.7";
          slide.style.opacity = "0.7";
          slid.style.opacity = "0.7";
      }
 }
 
function resetuj(){ 
resetujGraf = true
kresligraf();
p=-1
Plotly.relayout('chart', {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
poley=[];
polex=[];
polek=[];
}

//line: {
   // color: 'rgb(128, 0, 128)',
   // width: 1
function extrapoluj(){
 var cislo =-1;
 var polx = []
 var poly = [];
 var x =0;
 var y = -1;
 var k = 0;
  console.log(poley,"y");
  console.log(polex,"x");
  console.log(polek,"k");
  
 for(i = 0; i <poley.length ; i++){
    cislo = poleExtrapol[i]; 
    polx=[];
    poly=[];
    k = polek[i];
    x = polex[i];
    x-=5;
    y = poley[i];
    polx.push(x);
    poly.push(y);
    p++;  
     x = -273.15
    polx.push(x);
    y = (parseFloat(k*x) + (273.15*k))*1000
    poly.push(y);  
    Plotly.addTraces('chart', {x: polx ,y: poly,mode: 'lines',name: 'Extrapolacia pokusu ' + cislo, line:{ width: 0.8,dash: 'dashdot'} });   
   /* x--
    while(y>-1){
    
    y= (parseFloat(k*x) + (273.15*k))*1000
    console.log(x,"x")
    console.log(y,"y")
    console.log(k,"k")
   
    x--;
    Plotly.extendTraces('chart',{ y:[[y]],x:[[x]]}, [p]);  
    }  */  
    
 }
  polek=[];
  polex=[];
  poley=[];
  poleExtrapol=[];



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
        var t = document.createTextNode("Izobarický dej"); 
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
       
      // document.getElementById("rychlostlabel").style.display='none';
        
       window.print();
      // document.getElementById("rychlost").style.display='none' ;
       document.body.removeChild(h);
       document.body.removeChild(tim);
       document.body.removeChild(dat);
    
   
   
 }        
     
   
