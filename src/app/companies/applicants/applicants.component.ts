import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {API_URL,AVATAR_URL, TEXT_ONLY_PATTERN,EMAIL_PATTERN,NO_SPACE_PATTERN} from '../../core/constants/general';
import {patternValidator} from '../../core/helpers/pattern-validator';
import {ToastrService} from 'ngx-toastr';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
import {CompaniesService} from '../../core/services/companies.service';
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
declare var $: any;

interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  jobTitle: string;
}

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
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
  public jobs:any[];

  public questions:any[];
  public userquestions:any;
  public firstQuestion:any;
  public nextIndex = 0;
  public questionLenth = 0;
  public allusers;
  public dataSourceThree;
  public displayedColumnsThree: string[];

  @ViewChild('TableThreePaginator', {static: false}) tableThreePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableThreeSort: MatSort;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private getAuthUser: GetAuthUserPipe,
    private companiesService: CompaniesService,
    private usersService: UsersService,
    public auth: AuthService,
    private paviAdminService:PaviAdminService,
    public router: Router,
    private sanitizer: DomSanitizer
  ) { 
    this.dataSourceThree = new MatTableDataSource<User>();
    this.displayedColumnsThree=['first_name', 'last_name', 'email', 'gender','jobTitle','created_at','action'];
  }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    if(localStorage.getItem("user_id") != null){
      this.authUser.user_id = localStorage.getItem("user_id");
    }
    this.getCompanyData();
  }

  stopPlayer(){
    console.log("Player Stopped");
      var memory = $('#add-modal-candidate .modal-body .select-your-job').html();
        //console.log("modal Hide",memory);
      // $('#add-modal-candidate .modal-body').empty();
      $('#add-modal-candidate .modal-body .select-your-job').html("");
      this.userquestions = '';
      this.firstQuestion = '';
      this.nextIndex = 0;
      this.questionLenth = 0;
  }

  applyFilterThree(filterValue: string) {
    this.dataSourceThree.filter = filterValue.trim().toLowerCase();
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
    companyId:this.companyData.id
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
      
    //console.log(latest);
    
  });
  
}

showCandidateAnswers(element){
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
     } else {
       this.isLoder=false;
       this.toastr.error(response.message);
     }
     
   });
 
}

nextQuestion(){
  this.nextIndex = this.nextIndex+1;
  this.firstQuestion = this.userquestions[this.nextIndex];
}

previousQoestion(){
  this.nextIndex = this.nextIndex-1;
  this.firstQuestion = this.userquestions[this.nextIndex];
}

getSafeUrl(url){
  return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
}
showRecordedAnswer(recordString){
  window.open("https://d1iruxeyl67hmv.cloudfront.net/web/index.php/archive/"+recordString+"/view" , "_blank");
}

}
