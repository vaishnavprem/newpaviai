
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
        if(params1 == "Question"){
            //console.log("Employee");
             aText = new Array("Thank you for your interest in this role. Please read each question then click record answer to submit your response.");
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
 
    destination = document.getElementById("questionText");
 
 
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
