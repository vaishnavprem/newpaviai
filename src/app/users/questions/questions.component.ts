import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {CompaniesService} from '../../core/services/companies.service';
import {ToastrService} from 'ngx-toastr';
import { Subject ,Observable} from 'rxjs';
import {API_URL,AVATAR_URL} from '../../core/constants/general';
import { map, tap, takeUntil,startWith} from 'rxjs/operators';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  id: number;
  private sub: any;
  public questions:any;
  public isLoder=false;
  public jobs;
  authUser;
  postParamas;
  public show = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
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

   this.getQuestionData(this.id );
   
  }
  getQuestionData(job_id){
    this.isLoder=true;
    let parmsa ={
      jobId:job_id,
      user_id:this.authUser.user_id
    }
    let JobData =  this.companiesService.showQuestionAnswer(parmsa)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response : any) => {
      this.isLoder=false;
      if (response.statusCode == 200) {
        console.log(response);
          this.questions = response['data']['question']; 
          this.jobs = response['data']['jobs'];
      } else {
        this.toastr.error(response.message);
      }
      
    });
  }

  gotoVideoPage(questionId){
    //console.log(questionId);
   // window.open("https://demo.pavi.ai/vonage/index.html", "_blank");
   this.show=true;
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
     
   });
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
