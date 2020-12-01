

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


function typewriterSearch(params1,param2)
{
   
       // console.log("Employer");
       if(params1 == "Search"){
        //console.log("Employee");
         aText = new Array("I will help you find an opportunity in your area, please share your location");
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
 
    destination = document.getElementById("searchText");
 
 
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos)+"<i class='hr-line'></i>";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriterSearch()", 500);
  }
 } else {
  setTimeout("typewriterSearch()", iSpeed);
 }
 //console.log("Method Last>>>",iIndex);

 
}
