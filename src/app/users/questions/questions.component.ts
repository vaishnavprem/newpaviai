import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {CompaniesService} from '../../core/services/companies.service';
import {ToastrService} from 'ngx-toastr';
import { Subject ,Observable,timer, NEVER, BehaviorSubject, fromEvent, of } from 'rxjs';
import {API_URL,AVATAR_URL} from '../../core/constants/general';
import { map, tap, takeUntil,startWith,takeWhile, share,switchMap, filter} from 'rxjs/operators';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
declare var $: any;

//  startArchive
declare function typewriterQuestion(params1, param2): any;
declare function typingEffect(params1, param2): any;
declare function initVonge(): any;
declare function stopArchive(answerID): any;
declare function closeWebCam();
declare function startArchive();
declare function viewArchive();
declare function audiovideotest();
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit, AfterViewInit {
  id: number;
  public questionName;
  public questionNo;
  public totalQuestion;
  public question_id;
  private sub: any;
  public questions:any;
  public isLoder=false;
  public jobs;
  public companyName;
  public start:boolean;
  public lastminute:boolean=false;
  public lastminutefinal:boolean=false;
  public startTest:boolean=false;
  public result:boolean=false;
  public questionArrayKey;
  public interviewId;
  authUser;
  postParamas;
  public show = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  completionTime: number;
  timeLeft: number;
  timePerQuestion = 300;
  interval: any;
  localStream;
  minutes:number;
  seconds:number
  public startTestButton:boolean=true;
  public continueTestButton:boolean=false;
  public recordingClicked:boolean=false;
  public recordingStopClicked:boolean=true;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private companiesService: CompaniesService,
    private toastr: ToastrService,
    private getAuthUser: GetAuthUserPipe,
  ) { 
   
  }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });
   this.start=true;
   this.getQuestionData(this.id );
  //  typingEffect("Thank you for your interest in this role. Please read each question then click record answer to submit your response.", "questionText");
  
   this.timeLeft=this.timePerQuestion;
   //console.log("Audio Video Status22",audiovideotest());
   //audiovideotest().then(result=> console.log("Audio Video Status11",result))
  }
  ngAfterViewInit() {
    typewriterQuestion("Start", "startText");
  }
  gotoStart(){
    this.start=true;
    this.lastminute=false;
    setTimeout(()=>{ typewriterQuestion("Start", "startText"); },);
    
  }
  gotoLastMinut(){
    this.start=false;
    this.lastminute=true;
    this.lastminutefinal=false;
    setTimeout(()=>{ typewriterQuestion("LastMinute", "lastMinutText"); },);
  }
  gotoLastMinutFinal(){
    this.lastminute=false;
    this.lastminutefinal=true;
    setTimeout(()=>{ typewriterQuestion("lastMinuteFinal", "lastMinuteFinalText"); },);
    setTimeout(()=>{ audiovideotest() });
  }
  getQuestionData(job_id){
    $('.loader').show();
    let parmsa ={
      jobId:job_id,
      user_id:this.authUser.user_id
    }
    let JobData =  this.companiesService.showQuestionAnswer(parmsa)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response : any) => {
      $('.loader').hide();
      if (response.statusCode == 200) {
        console.log(response);
          this.questions = response['data']['question']; 
          this.jobs = response['data']['jobs'];
          this.companyName = this.jobs[0].company_name;
      } else {
        this.toastr.error(response.message);
      }
      
    });
  }
  calculateTotalElapsedTime(elapsedTimes) {
    return  elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

  private countdown(questionID) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.minutes = Math.floor(this.timeLeft / 60);
           this.seconds = Math.floor(this.timeLeft - this.minutes * 60);
        //  this.calculateTotalElapsedTime(elapsedTimes);
          if (this.timeLeft === 0 ) {  
         //   stopArchive(questionID);
            this.stopRecordingArchive(questionID,this.questions[questionID].id)
            
          }
        }
      }, 1000);

  }
  startRecording(questionID){
    $('.loader').show();
    if(this.startTest){
      clearInterval(this.interval);
      if(questionID=='start'){
        initVonge();   
        questionID=0;
      }
        this.questionArrayKey=questionID;
        this.questionNo = questionID +1;
        this.totalQuestion = Object.keys(this.questions).length;
        this.questionName =this.questions[questionID].question
        this.question_id = this.questions[questionID].id
        this.timeLeft=300;
        this.minutes = Math.floor(this.timeLeft / 60);
      this.seconds = Math.floor(this.timeLeft - this.minutes * 60);
   
        
        
    }
    
  }
  startRecordingArchive(questionID){
    this.recordingStopClicked=false;
    this.recordingClicked=true;
    startArchive();
    this.countdown(questionID);
  }

  stopRecordingArchive(questioKey,answerID){
    $('.loader').show();
    this.recordingStopClicked=true;
    this.recordingClicked=false;
    this.postParamas = {
      job_id:this.id,
      user_id:this.authUser.user_id,
      question_id:answerID,
      interview_id:this.interviewId,
     }
    let JobData =  this.companiesService.recordAnswer(this.postParamas)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response : any) => {
      $('.loader').hide();
      if (response.statusCode == 200) {
 
       let answerId = response['data']['record_id']; 
       stopArchive(answerId);
      } else {
        this.toastr.error(response.message);
      }  
    });
    
    
    let nextQuestion =  questioKey + 1;
    if(this.questions[nextQuestion]){
      // this.startRecording(nextQuestion);
      this.startRecording((questioKey +1));
     } else {
       this.updateInterview();
      clearInterval(this.interval);
      closeWebCam();
       this.startTest =false;
       this.result =true;
     } 
  }
  viewRecordingArchive(){
    viewArchive();
  }
  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }

  checkDevice(){
    /*navigator.mediaDevices.getUserMedia({ video: true,audio: true})
    .then(function(stream) {
      that.localStream = stream;
          $('#media-device').modal('show');
         
          setTimeout(function(){
            that.lastminutefinal=false;
            that.startTest=true; 
            that.startRecording('start');
          }, 2000);   
    })
    .catch(function(err) {
      alert("audio or video device no found");
    });*/
    $('.loader').show();
    this.postParamas = {
      job_id:this.id,
      user_id:this.authUser.user_id,
     }
    this.companiesService.saveInterview(this.postParamas)
    .subscribe((response : any) => {
      $('.loader').hide();
      if (response.statusCode == 200) {
      this.interviewId = response['data']['interview_id']; 
       $('.loader').hide();
       this.lastminutefinal=false;
       this.startTest=true; 
       this.startRecording('start'); 
      
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  updateInterview(){
    let JobData =  this.companiesService.updateInterview({interview_id:this.interviewId})
    .pipe(takeUntil(this.destroy$))
    .subscribe((response : any) => {
      $('.loader').hide();
      if (response.statusCode == 200) {
        this.toastr.success("Interview completed");
      } else {
        this.toastr.error(response.message);
      }  
    }); 
  }

  gotoSearchPage(){
  
      this.router.navigate(['jobs/search-job'])  

  }
  gotoVideoPage(){
    //console.log(questionId);
    window.open("https://demo.pavi.ai/vonage/index.php", "_blank");
  /* this.show=true;
   this.postParamas = {
    job_id:this.id,
    user_id:this.authUser.user_id,
    question_id:questionId
   }

   let JobData =  this.companiesService.recordAnswer(this.postParamas)
   .pipe(takeUntil(this.destroy$))
   .subscribe((response : any) => {
     if (response.statusCode == 200) {
      let answerId = response['data']['record_id']; 
      let obj = {
        answer_id:answerId
      }
      var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = "https://demo.pavi.ai/vonage/index.php";  
        Object.keys(obj).forEach(function(param){
          var mapInput = document.createElement("input");
          mapInput.type = "hidden";
          mapInput.name = param;
          mapInput.setAttribute("value", obj[param]);
          mapForm.appendChild(mapInput);
      });
      document.body.appendChild(mapForm);
      mapForm.submit();
     } else {
       this.toastr.error(response.message);
     }
     
   });*/
  }

  showRecordedAnswer(recordString){
    // let obj = {
    //   job_id:this.id
    // }
    
    // var mapForm = document.createElement("form");
    //   mapForm.target = "_blank";
    //   mapForm.method = "POST"; // or "post" if appropriate
    //   mapForm.action = "https://d1iruxeyl67hmv.cloudfront.net/web/index.php/archive/"+recordString+"/view";  
    //   Object.keys(obj).forEach(function(param){
    //   var mapInput = document.createElement("input");
    //   mapInput.type = "hidden";
    //   mapInput.name = param;
    //   mapInput.setAttribute("value", obj[param]);
    //   mapForm.appendChild(mapInput);
    //   });
    // document.body.appendChild(mapForm);
    // mapForm.submit();

    window.open("https://d1iruxeyl67hmv.cloudfront.net/web/index.php/archive/"+recordString+"/view?id="+this.id+"" , "_blank");
  }

  deleteRecordedAnswer(questionId,questionUrl){
    console.log("QuestionId>>>", questionId);
    var res = window.confirm("Are you sure want to delete this video?");
    if (res) {
        console.log("File Delete");
        //window.open("https://d1iruxeyl67hmv.cloudfront.net/web/index.php/archive/"+questionUrl+"/delete" , "");
    }
  }
  
}
