
    
// set up text to print, each item in array is new line
    
    var aText;
    var destination ;
    var iArrLength; // the length of the text array
    var iSpeed; 
    var iIndex; 

    var iScrollAt; 

    var iTextPos; 
    var sContents; 
    var iRow;
    var header;
    //console.log("Arr>>>>>",aText);
    
    // let iSpeed = 100; // time delay of print out
    // let iIndex = 0; // start printing array at this posision
    
    // let iScrollAt = 20; // start scrolling up at this many lines
    
    // let iTextPos = 0; // initialise text position
    // let sContents = ''; // initialise contents variable
    // let iRow; // initialise current row
    
     
    function typewriter(params1,param2)
    {
        //console.log("Js Method Called>>>>>>>",params1);
        if(params1 == "Employee"){
            //console.log("Employee");
             aText = new Array("Can I help you explore new opportunities?");
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
             aText = new Array("Can I help you find a New Employee?");
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
        destination = document.getElementById("seekertext");
     }else{
        destination = document.getElementById("employertext");
     }
     
     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos)+"<i class='hr-line'></i>";
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != aText.length ) {
       iArrLength = aText[iIndex].length;
       setTimeout("typewriter()", 500);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
     //console.log("Method Last>>>",iIndex);
     
    }
    //typewriter(); 
	
	function initialize() {
        var  earth = new WE.map('earth_div');
    earth.setView([46.8011, 8.2266], 1);
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
   
    }).addTo(earth);

    // Start a simple rotation animation
    var before = null;
    requestAnimationFrame(function animate(now) {
        var c = earth.getPosition();
        var elapsed = before? now - before: 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1*(elapsed/5)]);
        requestAnimationFrame(animate);
    });
      }


    
    