
var aText;
var destination ;
var iArrLength; 
var iSpeed; 
var iIndex; 

var iScrollAt; 

var iTextPos; 
var sContents; 
var iRow;
var header;


function typewriterQuestion(params1,param2)
{
   
        //console.log("Employer");
        if(params1 == "Start"){
            //console.log("Employee");
             aText = new Array("Position, you will be asked a series of questions. You will be given 5 mins to answer each question.");
             //destination = document.getElementById("seekertext");
             iArrLength = aText[0].length; // the length of the text array
             iSpeed = 100; 
             iIndex = 0; 
            
             iScrollAt = 20; 
             header = 1;
             iTextPos = 0; 
             sContents = ''; 
             iRow;
             
        }
        if(params1 == "LastMinute"){
         //console.log("Employee");
          aText = new Array("Last Minute Checklist");
          //destination = document.getElementById("seekertext");
          iArrLength = aText[0].length; // the length of the text array
          iSpeed = 100; 
          iIndex = 0; 
         
          iScrollAt = 20; 
          header = 2;
          iTextPos = 0; 
          sContents = ''; 
          iRow;
          
     }
     if(params1 == "lastMinuteFinal"){
      //console.log("Employee");
       aText = new Array("Test your audio and video");
       //destination = document.getElementById("seekertext");
       iArrLength = aText[0].length; // the length of the text array
       iSpeed = 100; 
       iIndex = 0; 
      
       iScrollAt = 20; 
       header = 3;
       iTextPos = 0; 
       sContents = ''; 
       iRow;
       
      }
   
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 
 //console.log("Js Method Called>>>>>>>",params);
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 
    if(header == 1){
      destination = document.getElementById("startText");
    }
    if(header == 2){
      destination = document.getElementById("lastMinutText");
    }
    if(header == 3){
      destination = document.getElementById("lastMinuteFinalText");
    }
 
 
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos)+"<i class='hr-line'></i>";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriterQuestion()", 500);
  }
 } else {
  setTimeout("typewriterQuestion()", iSpeed);
 }
 //console.log("Method Last>>>",iIndex);
 
}
