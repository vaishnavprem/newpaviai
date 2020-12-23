/* global $ OT SAMPLE_SERVER_BASE_URL */

var apiKey;
var sessionId ;
var token;
var archiveID;
var publisher;
var SAMPLE_SERVER_BASE_URL = 'https://d1iruxeyl67hmv.cloudfront.net/web/index.php';
/*(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();*/
function initVonge() {

  // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
  $.get(SAMPLE_SERVER_BASE_URL + '/session', function get(res) {
    apiKey = res.apiKey;
    sessionId = res.sessionId;
    token = res.token;

    initializeSession();
    
  });
}

function initializeSession() {
  $('.loader').show();
  var session = OT.initSession(apiKey, sessionId);
//alert("dafdaf");

  // Subscribe to a newly created stream
  session.on('streamCreated', function streamCreated(event) {
    var subscriberOptions = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    session.subscribe(event.stream, 'subscriber', subscriberOptions, function callback(error) {
      if (error) {
        console.log('There was an error publishing: ', error.name, error.message);
      }

    });
  });

  session.on('archiveStarted', function archiveStarted(event) {
	//alert(event.id);												   
    archiveID = event.id;
    console.log('Archive started ' + archiveID);
    $('.loader').hide();
  });

  session.on('archiveStopped', function archiveStopped(event) {
    archiveID = event.id;
    console.log('Archive stopped ' + archiveID);
    $('.loader').hide();
  });

  session.on('sessionDisconnected', function sessionDisconnected(event) {
    console.log('You were disconnected from the session.', event.reason);
  });

  // Connect to the session
  session.connect(token, function connectCallback(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (!error) {
      var publisherOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };
       publisher = OT.initPublisher('publisher', publisherOptions, function initCallback(err) {
        if (err) {
          console.log('There was an error initializing the publisher: ', err.name, err.message);
          return;
        }
        session.publish(publisher, function publishCallback(pubErr) {
          if (pubErr) {
            console.log('There was an error publishing: ', pubErr.name, pubErr.message);
          }
        });
		$('.loader').hide();
      });
    } else {
      console.log('There was an error connecting to the session: ', error.name, error.message);
    }
  });
	$('.loader').hide();
}

// Start recording
function startArchive() { // eslint-disable-line no-unused-vars

  $.ajax({	
    url: SAMPLE_SERVER_BASE_URL + '/archive/start',
    type: 'POST',
    contentType: 'application/json', // send as JSON
    data: JSON.stringify({'sessionId': sessionId}),

    complete: function complete() {
      // called when complete
      console.log('startArchive() complete');
    },

    success: function success() {
      // called when successful
      console.log('successfully called startArchive()');
    },

    error: function error() {
      // called when there is an error
      console.log('error calling startArchive()');
    }
  });

}

// Stop recording
function stopArchive(answer_id) { // eslint-disable-line no-unused-vars
  $.post(SAMPLE_SERVER_BASE_URL + '/archive/' + archiveID + '/stop');
 // alert("adfafasdf");
 //alert(answer_id);
  var posting = $.post('https://d39smmql2m03vn.cloudfront.net/webservice/v1/companies/save-answer-recording', {
    answer_id: answer_id,
    answer_string: archiveID
  });
  /* Alerts the results */
  posting.done(function(data) {
   // alert('success');
  });
  posting.fail(function() {
   // alert('failed');
  });
}
function closeWebCam(){
console.log("session close");

publisher.destroy();




}
// Get the archive status. If it is  "available", download it. Otherwise, keep checking
// every 5 secs until it is "available"
function viewArchive() { // eslint-disable-line no-unused-vars
  $('#view').prop('disabled', true);
  window.location = SAMPLE_SERVER_BASE_URL + /archive/ + archiveID + '/view';
}
 async function testAudioVideo(){

  navigator.mediaDevices.getUserMedia({ audio: true, video: true})
  .then(function(stream) {
    $('#media-device').modal('show');
      return true;
  })
  .catch(function(err) {
    alert("audio or video device no found");
    return false;
  });
  
  
  
}

