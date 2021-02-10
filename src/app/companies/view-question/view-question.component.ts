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

interface Question {
  jobTitle: string;
}

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
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
  public dataSourceFour;
  public displayedColumnsFour: string[];

  @ViewChild('TableFourPaginator', {static: false}) tableFourPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableFourSort: MatSort;



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
    this.dataSourceFour = new MatTableDataSource<Question>();
    this.displayedColumnsFour=['jobTitle','action'];
   }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    if(localStorage.getItem("user_id") != null){
      this.authUser.user_id = localStorage.getItem("user_id");
    }
    this.getCompanyData();
  }

  applyFilterFour(filterValue: string) {
    this.dataSourceFour.filter = filterValue.trim().toLowerCase();
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
      this.listQuestion();
      $('.loader').hide();
       } else if (response.statusCode == 401) {
        this.toastr.error(response.message)
        this.auth.logOut();
        this.router.navigate(['auth/login',2]);
        }
        else this.toastr.error(response.message)
        
  });
}

getJobs(){
  this.isLoder=true;
    this.postArry = {
      companyId:this.companyData.id
    }
    let JobData = this.companiesService.getJobs(this.postArry)
    .subscribe(response => {
      this.isLoder=false;
      // $('.loader').hide();
      // this.dataSourceOne.data = response['data']['jobs'] as JobsElements[];
      // this.dataSourceOne.paginator = this.tableOnePaginator;
      //   this.dataSourceOne.sort = this.tableOneSort;
     
      this.jobs = response['data']['jobs'];
      //console.log("View Jobs>>",this.jobs);
      
    });
}

listQuestion(){
  //this.getJobs();
  this.isLoder=true;
  this.postArry = {
    companyId:this.companyData.id
  }
  let JobData = this.companiesService.getJobs(this.postArry)
  .subscribe(response => {
    this.isLoder=false;
    this.dataSourceFour.data = response['data']['jobs'] as Question[];
    this.dataSourceFour.paginator = this.tableFourPaginator;
      this.dataSourceFour.sort = this.tableFourSort;
    
    this.jobs = response['data']['jobs'];
    //console.log("View Jobs>>",this.jobs);
    
  });
  
}

showQuestions(jobId){
  this.isLoder=true;
  this.postArry = {
    jobId:jobId,
  }
  this.companiesService.showQuestion(this.postArry).subscribe(response => {
    if(Object.keys(response['data']).length > 0){
      this.isLoder=false;
      this.questions = response['data']['question'];
      $("#show-question").modal("show");
    } else {
      this.isLoder=false;
      this.toastr.error('No question found');
    }
   });
}
deleteQuestion(index,questionId){
  this.postArry = {
    questionId:questionId,
  }
  this.companiesService.deleteQuestion(this.postArry).subscribe(response => {
    this.questions.splice(index, 1);     
    this.toastr.success('Data deleted Successfully');
   });
}


}
