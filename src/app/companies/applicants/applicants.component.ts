import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {API_URL,AVATAR_URL, FINAL_DECISION, TEXT_ONLY_PATTERN,EMAIL_PATTERN,NO_SPACE_PATTERN} from '../../core/constants/general';
import {patternValidator} from '../../core/helpers/pattern-validator';
import {ToastrService} from 'ngx-toastr';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
import {CompaniesService} from '../../core/services/companies.service';
import {SearchService} from '../../core/services/search.service';
import {COUNTRY_LIST} from '../../core/constants/countries';
import { DatePipe } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {UsersService} from '../../core/services/users.service';
import { PaviAdminService } from '../../core/services/pavi-admin.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Chart } from 'chart.js';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { DomSanitizer } from '@angular/platform-browser';
import { ResetPasswordComponent } from 'app/auth/reset-password/reset-password.component';
import { ToolbarService} from '@syncfusion/ej2-angular-richtexteditor';
import yesno from "yesno-dialog";

declare var $: any;

interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  jobTitle: string;
  final_decision: string;
}

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css'],
  providers: [ToolbarService]
})
export class ApplicantsComponent implements OnInit {
  authUser;
  public isLoder=false;
  isSubmitted = false;
  public status: boolean = false;
  safeUrl: any;
  today: number = Date.now();
  public companyData;
  public categories;
  public openJobs = 6;
  public applicants = 55;
  public interviewCompleted = 0;
  public postArry:{};
  countries = COUNTRY_LIST;
  public employmentArry:{};
  profileImage = 'assets/images/no-profile.png';
  coverImage = 'assets/images/no-cover.png';
  public jobs:any[];

  public questions:any[];
  public userquestions:any;
  public firstQuestion:any;
  public nextIndex = 0;
  public questionLenth = 0;
  public allusers;
  public dataSourceThree;
  public displayedColumnsThree: string[];
  position;
  candidate_name;
  comment = "";
  final_decision = "Decline";
  resumeFile;
  play;
  filterKey;
  from;
  sub;
  getDecline = false;
  loadFlag = false;

  userForm: FormGroup;
  templateForm: FormGroup;
  templates;
  emailMessage = '';
  emailName = '';
  emailVariable = '';
  
  public results = null;
  
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  @ViewChild('TableThreePaginator', {static: false}) tableThreePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableThreeSort: MatSort;

  
  public tools: object = {
    items: [
        'Bold', 'Italic','SourceCode']
  };
  

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private getAuthUser: GetAuthUserPipe,
    private companiesService: CompaniesService,
    private usersService: UsersService,
    public auth: AuthService,
    private paviAdminService:PaviAdminService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { 
    this.dataSourceThree = new MatTableDataSource<User>();
    this.displayedColumnsThree=['first_name', 'last_name', 'email','jobTitle','created_at', 'average_rating','final_decision','action'];

    searchService.getResults$()
    .subscribe((resultList: any[])=> {
        this.results = resultList;
        if(this.results != '' && this.loadFlag){
          this.applyFilterThree(this.results);
        }else{
          this.applyFilterThree('');
        }
    });
  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.filterKey = params['filter'] || null; // (+) converts string 'id' to a number
      this.from = params['from'] || null;
    });
    this.authUser = this.getAuthUser.transform();
    if(localStorage.getItem("user_id") != null){
      this.authUser.user_id = localStorage.getItem("user_id");
    }

    this.getCompanyData();
    this.play= 0;
    this.loadFlag = true;
    //console.log("Final Decision", this.filterKey);

    this.userForm = this.fb.group({
      subject: ['', Validators.required],
      body: ['', Validators.required],
      email:['', Validators.required],
      template: ['', Validators.required],
      applicant_name: [''],
      sender_name: [''],
      job_name: ['']
    });

    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required],
      company_id: this.authUser.user_id
    });
  }

  stopPlayer(){
    //console.log("Player Stopped");
      var memory = $('#add-modal-candidate .modal-body .select-your-job').html();
        //console.log("modal Hide",memory);
      // $('#add-modal-candidate .modal-body').empty();
      $('#add-modal-candidate .modal-body .select-your-job').html("");
      this.userquestions = '';
      this.firstQuestion = '';
      this.nextIndex = 0;
      this.questionLenth = 0;
      this.selectedValue = 0;
      this.comment = '';
      this.play = 0;
      this.getUsers();
      
  }

  applyFilterThree(filterValue: string) {
    this.dataSourceThree.filter = filterValue.trim().toLowerCase();
  }

  declinedApplicants(){
    this.getDecline = true;
    this.getUsers();
    
  }

  getCompanyData(){
    //let that=this;
    this.isLoder=true;
    this.postArry = {
    user_id:this.authUser.user_id
  }
  this.companiesService.getCompanyData(this.postArry)
  .subscribe((response : any)=> {
    this.isLoder=false;
    if (response.statusCode == 200) {

      
      
      //console.log("Company Data>>",response);
      this.companyData = response['data']['companydata'];
      if(this.companyData.logo_image!=undefined){
        this.profileImage= `${AVATAR_URL}uploads/avatars/${this.companyData.logo_image}`;
      }
      // this.employments = response['data']['employment']; 
      // this.seniorityLevels = response['data']['seniority']; 
      // this.responsibilities = response['data']['responsibility']; 
      // this.requirements = response['data']['requirement']; 
      this.categories = response['data']['categories']; 
      this.openJobs= response['data']['jobs']; 
      this.applicants= response['data']['applicants']; 
      this.interviewCompleted= response['data']['interview_com']; 
      this.getUsers();
      $('.loader').hide();
       } else if (response.statusCode == 401) {
        this.toastr.error(response.message)
        this.auth.logOut();
        this.router.navigate(['auth/login',2]);
        }
        else this.toastr.error(response.message)
        
  });
}

getUsers(){
  this.isLoder=true;
  this.postArry = {
    companyId:this.companyData.id,
    decline: this.getDecline?'yes':'no'
  }
  let JobData = this.companiesService.getJobsUser(this.postArry)
  .subscribe(response => {
    this.isLoder=false;
    // $('.loader').hide();
    let latest = response['data']['user'].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    this.dataSourceThree.data = latest as User[];
    this.dataSourceThree.paginator = this.tableThreePaginator;
      this.dataSourceThree.sort = this.tableThreeSort;
      this.allusers = response['data']['user'];

      if(this.filterKey){
        if(this.filterKey == 'Completed'){
          this.dataSourceThree.filterPredicate = function(data, filter: string): boolean {
            if(data.is_complete){
              return  data.is_complete.toLowerCase().includes(filter)
            }
          };
          this.applyFilterThree('1');
        }else if(this.filterKey == 'Pending'){
          this.dataSourceThree.filterPredicate = function(data, filter: string): boolean {
            if(data.avg_rating){
              return  data.avg_rating.toLowerCase().includes(filter)
            }
          };
          this.applyFilterThree("0.0000");
        }else if(this.from){
          this.dataSourceThree.filterPredicate = function(data, filter: string): boolean {
            if(data.jobTitle){
              return  data.jobTitle.toLowerCase().includes(filter)
            }
          };
          this.applyFilterThree(this.filterKey);
        }else{
          this.dataSourceThree.filterPredicate = function(data, filter: string): boolean {
            if(data.interview_status){
              return  data.interview_status.toLowerCase().includes(filter)
            }
          };
          this.applyFilterThree(this.filterKey);
        }
      }
      
    //console.log("Job User>>>>>",latest);
    
  });
  
}

showCandidateAnswers(element){
  this.position = element.jobTitle;
  this.candidate_name = element.first_name+" "+element.last_name;
  this.final_decision = element.interview_status ? element.interview_status : 'Decline';
  this.resumeFile = element.resume_file;
  this.isLoder=true;
   let parmsa ={
     jobId:element.job_id,
     user_id:element.id,
     interview_id:element.interview_id
   }
   this.companiesService.showQuestionAnswer(parmsa)
   .subscribe((response : any) => {
     
     if (response.statusCode == 200) {
         this.userquestions = response['data']['question']; 
         this.isLoder=false;
         $("#add-modal-candidate").modal("show");
         this.firstQuestion = response['data']['question'][0];
         this.questionLenth = response['data']['question'].length;
         this.comment = this.firstQuestion.comment;
         this.selectedValue = this.firstQuestion.rating;
         //console.log("First Question>>",this.firstQuestion);
     } else {
       this.isLoder=false;
       this.toastr.error(response.message);
     }
     
   });
 
}

showCandidateFeedback(element){
  // this.position = element.jobTitle;
  // this.candidate_name = element.first_name+" "+element.last_name;
  // this.final_decision = element.interview_status ? element.interview_status : 'Reject';
  this.isLoder=true;
   let parmsa ={
     jobId:element.job_id,
     user_id:element.id,
     interview_id:element.interview_id
   }
   this.companiesService.showQuestionAnswer(parmsa)
   .subscribe((response : any) => {
     
     if (response.statusCode == 200) {
         this.userquestions = response['data']['question'];
         this.userquestions.forEach(element => {
          delete element.recorded_url;
         }); 
         this.isLoder=false;
         $("#add-modal-candidate-feedback").modal("show");
         this.firstQuestion = this.userquestions[0];
         this.questionLenth = response['data']['question'].length;
         this.comment = this.firstQuestion.comment;
         this.selectedValue = this.firstQuestion.rating;
         //console.log("First Question>>",this.firstQuestion);
     } else {
       this.isLoder=false;
       this.toastr.error(response.message);
     }
     
   });
}

nextQuestion(){
  this.nextIndex = this.nextIndex+1;
  this.firstQuestion = this.userquestions[this.nextIndex];
  this.selectedValue = this.firstQuestion.rating;
  this.comment = this.firstQuestion.comment;
  this.play = 0;
  //console.log("First Question Next>>",this.firstQuestion);
}

previousQoestion(){
  this.nextIndex = this.nextIndex-1;
  this.firstQuestion = this.userquestions[this.nextIndex];
  this.selectedValue = this.firstQuestion.rating;
  this.comment = this.firstQuestion.comment;
  this.play = 0;
}

getSafeUrl(url){
  if(this.play == 0){
    //console.log("gerSafeUrl Called If>>>>>");
    this.play = 1;
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);  
  }else{ 
    //console.log("gerSafeUrl Called Else>>>>>");
    return this.safeUrl;
  }
}
showRecordedAnswer(recordString){
  window.open("https://d1iruxeyl67hmv.cloudfront.net/web/index.php/archive/"+recordString+"/view" , "_blank");
}

saveFeedBack(){
  if(this.selectedValue != 0 && this.comment != ''){
    this.isLoder=true;
    this.employmentArry = {
      id:this.firstQuestion.id,
      rating:this.selectedValue,
      comment:this.comment
    }
    //console.log("Form Data>>>",this.employmentArry);
    this.companiesService.saveFeedback(this.employmentArry).subscribe((response : any)=> {
      this.isLoder=false;
      if(response.statusCode == 200){
        this.toastr.success('Data Saved Successfully');
      }else{
        this.toastr.error(response.message);
      }    
     });
  } else {
    this.toastr.error('Comment and rating are required');
  }
}

countStar(star) {
  this.selectedValue = star;
}

saveFinalDecision(){
    this.isLoder=true;
    this.employmentArry = {
      interview_id:this.firstQuestion.interview_id,
      interview_status:this.final_decision,
    }
    //console.log("Form Data>>>",this.employmentArry);
    this.companiesService.saveFinalDecision(this.employmentArry).subscribe((response : any)=> {
      this.isLoder=false;
      if(response.statusCode == 200){
        this.toastr.success('Data Saved Successfully');
      }else{
        this.toastr.error(response.message);
      }    
     });
  
}

async disableApplicants(interview_id){
  const yes = await yesno();
     if(yes){
      this.postArry = {
        interview_id:interview_id
      }
      this.companiesService.disableApplicants(this.postArry).subscribe(response => {
        this.getUsers();
        this.toastr.success('Data deleted Successfully');
       });
    }
}

sendMail(){
  if(this.userForm.valid){
    //console.log("Send Mail>>>",this.userForm.getRawValue());
    this.companiesService.sendApplicantMail(this.userForm.getRawValue()).subscribe((dt: any) => {
      if(dt.statusCode==200){
        this.toastr.success("Mail send successfully")
        $("#send-mail").modal("hide");
      } else {
        this.toastr.error(dt.message);
      }
    });
  }else{
    this.toastr.error("All fields are required");
  }
  
}

showMail(element){
  this.getTemplate();
  this.userForm.patchValue({email: element.email});
  this.userForm.patchValue({applicant_name: element.first_name+' '+element.last_name});
  this.userForm.patchValue({sender_name: this.companyData.name});
  this.userForm.patchValue({job_name: element.jobTitle});
  $("#send-mail").modal("show");
}

addTemplate(){
  $("#add-template").modal("show");

}

saveTemplate(){
  //console.log("Save Template>>>>",this.emailMessage);
  this.employmentArry = {
    name: this.emailName,
    message: this.emailMessage,
    company_id: this.authUser.user_id
  }
  
  if (this.emailMessage != '' && this.emailName != '') {
    this.companiesService.saveEmailTemplate(this.employmentArry).subscribe((dt: any) => {
      if(dt.statusCode==200){
        $("#add-template").modal("hide");
        this.toastr.success('Data Saved Successfully');
        this.getTemplate();
      } else {
        this.toastr.error(dt.message);
      }
    });
  }else{
    this.toastr.error("All fields are required");
  }

}

getTemplate(){
  this.employmentArry = {
    company_id: this.authUser.user_id
  }
  //console.log("Form Data>>>",this.employmentArry);
  this.companiesService.getEmailTemplate(this.employmentArry).subscribe((response : any)=> {
    
    if(response.statusCode == 200){
      this.templates = response['data']['emaildata'];
      //console.log("All Templates",response['data']['emaildata']);
    }else{
      this.toastr.error(response.message);
    }    
   });
}

onTemplateSelected(event){
  const value:number =  parseInt((<HTMLSelectElement>event.srcElement).value);
  
  let temp = this.templates.find(i => i.id === value);
  //console.log("Event",temp);
  this.userForm.patchValue({body: temp.message});
}

onEmailVariableChange(event){
  // this.emailMessage += '{{'+event.target.value+'}}'
  this.emailVariable = '{{'+event.target.value+'}}';

}

addVariable(){
  this.emailMessage += this.emailVariable;
}

}
