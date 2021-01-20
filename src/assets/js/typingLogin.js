
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

function typewriterlogin(params1,param2)
{
    //console.log("Js Method Called>>>>>>>",params1);
    if(params1 == "Employee"){
        //console.log("Employee");
         aText = new Array("Login as an Interviewer");
         //destination = document.getElementById("seekertext");
         iArrLength = aText[0].length; // the length of the text array
         iSpeed = 100; 
         iIndex = 0; 
        
         iScrollAt = 20; 
         header = 1;
         iTextPos = 0; 
         sContents = ''; 
         iRow;
    } else if(params1 == "Employer") {
        //console.log("Employer");
         aText = new Array("Login as an Employer");
         //destination = document.getElementById("employertext");
         iArrLength = aText[0].length; // the length of the text array
         iSpeed = 100; 
         iIndex = 0; 
        
         iScrollAt = 20; 
         header = 2;
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
    destination = document.getElementById("employeetext");
 }else{
    destination = document.getElementById("employertext");
 }
 
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos)+"<i class='hr-line'></i>";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriterlogin()", 500);
  }
 } else {
  setTimeout("typewriterlogin()", iSpeed);
 }
 //console.log("Method Last>>>",iIndex);
 
}
