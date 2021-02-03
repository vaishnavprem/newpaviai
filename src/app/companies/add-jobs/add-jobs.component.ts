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

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {
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

  

  jobForm:FormGroup;
  employmentForm:FormGroup;
  seniorityForm:FormGroup;
  responsibilityForm:FormGroup;
  requirementsForm:FormGroup;
  public employments:any[];
  public seniorityLevels:any[];
  public responsibilities:any[];
  public requirements:any[];
  public jobs:any[];


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
  ) { }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    if(localStorage.getItem("user_id") != null){
      this.authUser.user_id = localStorage.getItem("user_id");
    }
    this.jobForm = this.fb.group({
      date_opened: ['', Validators.required],
        country: ['', Validators.required],
        jobTitle: ['', Validators.required],
        employment: ['', Validators.required],
        city: [''],
        // date_closed: ['', Validators.required],
        companyAddress: ['', Validators.required],
        experience:['', Validators.required],
        level: ['', Validators.required],
        salary: ['', Validators.required],
        email: ['', Validators.required],
        category: [''],
        job_description: ['', Validators.required],
        job_brief:['', Validators.required],
        assistant_job: [''],
        // requirement:['', Validators.required],
        // responsibility:['', Validators.required],
        companyId:['' ],
        jobId:[''],
    });

    this.employmentForm = this.fb.group({
      employment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],

    });
    this.seniorityForm = this.fb.group({
      seniority: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), patternValidator(TEXT_ONLY_PATTERN)]],

    });

    this.responsibilityForm = this.fb.group({
      responsibility: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    });

    this.requirementsForm = this.fb.group({
      requirement: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    });

    this.getCompanyData();
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
      $('.loader').hide();
      //console.log("Company Data>>",response);
      this.companyData = response['data']['companydata'];
      if(this.companyData.logo_image!=undefined){
        this.profileImage= `${AVATAR_URL}uploads/avatars/${this.companyData.logo_image}`;
      }
      this.employments = response['data']['employment']; 
      this.seniorityLevels = response['data']['seniority']; 
      this.responsibilities = response['data']['responsibility']; 
      this.requirements = response['data']['requirement']; 
      this.categories = response['data']['categories']; 
      this.openJobs= response['data']['jobs']; 
      this.applicants= response['data']['applicants']; 
      this.interviewCompleted= response['data']['interview_com']; 
       } else if (response.statusCode == 401) {
        this.toastr.error(response.message)
        this.auth.logOut();
        this.router.navigate(['auth/login']);
        }
        else this.toastr.error(response.message)
        
  });

}

addEmployment(){
  $("#add-modal-employment").modal("show");
  $("#add-modal-employment").appendTo("body");
}

addSeniority(){
  $("#add-modal-seniority").modal("show");
  $("#add-modal-seniority").appendTo("body");
}
addResponsibilities(){
  $("#add-modal-responsibilities").modal("show");
  $("#add-modal-responsibilities").appendTo("body");
}
addRequirements(){
  $("#add-modal-requirements").modal("show");
  $("#add-modal-requirements").appendTo("body");
}
getJobCategory(){
 
  let JobData = this.paviAdminService.getJobCategory()
  .subscribe(response => {
    this.categories = response['data']['categories'];  
  });
}
getEmployment(){
  this.employmentArry = {
    companyId:this.companyData.id
  }
  let companData = this.companiesService.getEmployment( this.employmentArry)
  .subscribe(response => {
    if(response['data']){
      this.employments = response['data']['employment']; 
      
    } else {
      this.employments =[]; 
    }
     
  });
}

getSeniority(){
  this.employmentArry = {
    companyId:this.companyData.id
  }
  let companData = this.companiesService.getSeniority( this.employmentArry)
  .subscribe(response => {
    if(response['data']){
      this.seniorityLevels = response['data']['seniority']; 
    } else {
      this.seniorityLevels =[]; 
    }
     
  });
}

getResponsibility(){
  this.employmentArry = {
    companyId:this.companyData.id
  }
  let companData = this.companiesService.getResponsibility( this.employmentArry)
  .subscribe(response => {
    if(response['data']){
      this.responsibilities = response['data']['responsibility']; 
    } else {
      this.responsibilities =[]; 
    }
     
  });
}

getRequirements(){
  this.employmentArry = {
    companyId:this.companyData.id
  }
  let companData = this.companiesService.getRequirements( this.employmentArry)
  .subscribe(response => {
    if(response['data']){
      this.requirements = response['data']['requirement']; 
    } else {
      this.requirements =[]; 
    }
     
  });
}

saveEmployment(){
  if(this.employmentForm.valid){
    this.isLoder=true;
    this.employmentArry = {
      companyId:this.companyData.id,
      employment:this.employmentForm.get('employment').value
    }
    this.companiesService.saveEmployment(this.employmentArry).subscribe(response => {
      this.getEmployment();
      this.toastr.success('Data updated suceesfully');
      (<any>$(`#add-modal-employment`)).modal('hide');
     });
  } else {
    this.toastr.error('Please check all fields');
  }
  this.isLoder=false;
}

saveSeniority(){
  if(this.seniorityForm.valid){
    this.isLoder=true;
    this.employmentArry = {
      companyId:this.companyData.id,
      seniority:this.seniorityForm.get('seniority').value
    }
    this.companiesService.saveSeniority(this.employmentArry).subscribe(response => {
      this.getSeniority();
      this.toastr.success('Data updated suceesfully');
      (<any>$(`#add-modal-seniority`)).modal('hide');
     });
  } else {
    this.toastr.error('Please check all fields');
  }
  this.isLoder=false;
}

saveResponsibility(){
  if(this.responsibilityForm.valid){
    this.isLoder=true;
    this.employmentArry = {
      companyId:this.companyData.id,
      responsibility:this.responsibilityForm.get('responsibility').value
    }
    this.companiesService.saveResponsibility(this.employmentArry).subscribe(response => {
      this.getResponsibility();
      this.toastr.success('Data updated suceesfully');
      (<any>$(`#add-modal-responsibilities`)).modal('hide');
     });
  } else {
    this.toastr.error('Please check all fields');
  }
  this.isLoder=false;
}

saveRequirements(){
  if(this.requirementsForm.valid){
    this.isLoder=true;
    this.employmentArry = {
      companyId:this.companyData.id,
      requirement:this.requirementsForm.get('requirement').value
    }
    this.companiesService.saveRequirements(this.employmentArry).subscribe(response => {
      this.getRequirements();
      this.toastr.success('Data updated suceesfully');
      (<any>$(`#add-modal-requirements`)).modal('hide');
     });
  } else {
    this.toastr.error('Please check all fields');
  }
  this.isLoder=false;
}

createJobs(){
  if(this.jobForm.get('jobId').value){
       this.jobForm.reset(); 
  }
}

jobFormRest(){
  this.jobForm.reset();
}
saveJob(){
  if(this.jobForm.valid){
    this.isLoder=true;
    this.jobForm.patchValue({
      companyId:this.companyData.id
    });
    if(this.jobForm.get('jobId').value){
      this.companiesService.editJobs(this.jobForm.getRawValue()).subscribe((response : any) => {
          if (response.statusCode == 200) {
          this.toastr.success('Data updated suceesfully');
          } else if (response.statusCode == 401) {
            this.toastr.error(response.message);
          }
          else this.toastr.error(response.message);
       });
    } else {
      this.companiesService.saveJobs(this.jobForm.getRawValue()).subscribe((response :any) => {
       if(response.statusCode == 200){
          this.jobForm.reset();
          this.toastr.success('Data added suceesfully');
          this.getJobs();
          this.router.navigate(['/companies/view-jobs']);
       }else{
        this.toastr.error(response.message);
       }
       });
    }
  
  } else {
    this.toastr.error('Please check all fields');
  }
  this.isLoder=false;
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

}
