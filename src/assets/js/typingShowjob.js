
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


function typewriterShow(params1,param2)
{
   
        //console.log("Employer");
        if(params1 == "Show-job"){
            //console.log("Employee");
             aText = new Array("Great, if you like this job please click on the apply button below to be considered for this job.");
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
   
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 
 //console.log("Js Method Called>>>>>>>",params);
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 
    destination = document.getElementById("showText");
 
 
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos)+"<i class='hr-line'></i>";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriterShow()", 500);
  }
 } else {
  setTimeout("typewriterShow()", iSpeed);
 }
 //console.log("Method Last>>>",iIndex);
 
}
