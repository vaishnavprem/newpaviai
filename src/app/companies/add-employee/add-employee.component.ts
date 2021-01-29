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
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
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

  employeeForm: FormGroup;
  public domain;
  private sub: any;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private getAuthUser: GetAuthUserPipe,
    private companiesService: CompaniesService,
    private usersService: UsersService,
    public auth: AuthService,
    private paviAdminService:PaviAdminService,
    public router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // this.sub = this.route.queryParams.subscribe(params => { 
    //   this.domain = params['domain'] || null; // (+) converts string 'id' to a number
    // });
    this.authUser = this.getAuthUser.transform();
    if(localStorage.getItem("user_id") != null){
      this.authUser.user_id = localStorage.getItem("user_id");
    }
    this.employeeForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      position: ['', Validators.required],
      user_id:['', [Validators.required,patternValidator(TEXT_ONLY_PATTERN)]],
      password:['', [Validators.required,Validators.minLength(5), Validators.maxLength(15), patternValidator(NO_SPACE_PATTERN)]],
      parent_id:this.authUser.user_id,
      roles: 'employee'
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
      let email = response['data']['email'].split("@");
      this.domain ='@'+email[1];
      // this.employments = response['data']['employment']; 
      // this.seniorityLevels = response['data']['seniority']; 
      // this.responsibilities = response['data']['responsibility']; 
      // this.requirements = response['data']['requirement']; 
      this.categories = response['data']['categories']; 
      this.openJobs= response['data']['jobs']; 
      this.applicants= response['data']['applicants']; 
      this.interviewCompleted= response['data']['interview_com']; 
      //this.getEmployee();
       } else if (response.statusCode == 401) {
        this.toastr.error(response.message)
        this.auth.logOut();
        this.router.navigate(['auth/login',2]);
        }
        else this.toastr.error(response.message)
        
  });
}

saveEmployee(){

  //console.log("Save Employee>>>>",this.employeeForm.getRawValue())
  if (this.employeeForm.valid) {
    this.isLoder=true;
    this.companiesService.employeeRegister(this.employeeForm.getRawValue()).subscribe(async (dt: any) => {
      this.isLoder=false;
      if(dt.statusCode==200){
        this.toastr.success('Employee successfully registered and you are logged in');
        this.router.navigate(['/companies/my-employee'])
      }else {
        this.toastr.error(dt.message);
      }
      
    });
  }else{
    this.toastr.error('All fields are required');
  }

}

}
