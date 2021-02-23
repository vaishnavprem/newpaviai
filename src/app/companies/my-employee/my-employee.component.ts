import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {API_URL,AVATAR_URL, TEXT_ONLY_PATTERN,EMAIL_PATTERN,NO_SPACE_PATTERN} from '../../core/constants/general';
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
import yesno from "yesno-dialog";
declare var $: any;

interface Employee {
  id:string,
  first_name: string;
  last_name: string;
  user_id: string;
  position: string;
  password: string;
}

@Component({
  selector: 'app-my-employee',
  templateUrl: './my-employee.component.html',
  styleUrls: ['./my-employee.component.css']
})
export class MyEmployeeComponent implements OnInit {
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
  profileImage = 'assets/images/no-profile.png';
  coverImage = 'assets/images/no-cover.png';

  public dataSourceFive;
  public displayedColumnsFive: string[];
  employeeForm: FormGroup;
  public domain;
  public results = null;
  loadFlag = false;

  view_employee = true;
  edit_employee = false;
  employees:any[];
  singleEmployee;

  @ViewChild('TableFivePaginator', {static: false}) tableFivePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableFiveSort: MatSort;

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
    private searchService: SearchService
  ) {
    this.dataSourceFive = new MatTableDataSource<Employee>();
    this.displayedColumnsFive=['first_name', 'last_name', 'user_id', 'position','action'];

    searchService.getResults$()
    .subscribe((resultList: any[])=> {
        this.results = resultList;
        if(this.results != '' && this.loadFlag){
          this.applyFilterFive(this.results);
        }
    });

   }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    if(localStorage.getItem("user_id") != null){
      this.authUser.user_id = localStorage.getItem("user_id");
    }
    //console.log("Auth User>>>",this.authUser);
    this.employeeForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      position: ['', Validators.required],
      user_id:['', [Validators.required,patternValidator(TEXT_ONLY_PATTERN)]],
      password:[''],
      id:[''],
      parent_id:this.authUser.user_id
    });
    this.getCompanyData();
    this.loadFlag = true;
  }

  applyFilterFive(filterValue: string) {
    this.dataSourceFive.filter = filterValue.trim().toLowerCase();
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
      let email = response['data']['email'].split("@");
      this.domain ='@'+email[1];
      //console.log("Company Data>>>",this.companyData.name)
      // this.employments = response['data']['employment']; 
      // this.seniorityLevels = response['data']['seniority']; 
      // this.responsibilities = response['data']['responsibility']; 
      // this.requirements = response['data']['requirement']; 
      this.categories = response['data']['categories']; 
      this.openJobs= response['data']['jobs']; 
      this.applicants= response['data']['applicants']; 
      this.interviewCompleted= response['data']['interview_com']; 
      this.getEmployee();
      $('.loader').hide();
       } else if (response.statusCode == 401) {
        this.toastr.error(response.message)
        this.auth.logOut();
        this.router.navigate(['auth/login', 2]);
        }
        else this.toastr.error(response.message)
        
  });
}

getEmployee(){
  this.isLoder=true;
  this.postArry = {
    parent_id:this.authUser.user_id
  }
  let employeeData = this.companiesService.getEmployee(this.postArry)
    .subscribe((response : any) => {
      this.isLoder=false;
      //console.log("Response Of get Employee",response);
      this.employees = response['data']['empdata'] as Employee[];
      this.dataSourceFive.data = this.employees;
      this.dataSourceFive.paginator = this.tableFivePaginator;
        this.dataSourceFive.sort = this.tableFiveSort;
      
    });
  
}

saveEmployee(){
  //console.log('Edit Employee>>',this.employeeForm.getRawValue());
  this.isLoder=true;
  if (this.employeeForm.valid) {
    this.companiesService.updateEmployee(this.employeeForm.getRawValue()).subscribe(async (dt: any) => {
      this.isLoder=false;
      if(dt.statusCode==200){
        this.toastr.success('Employee Updated Successfully');
        // (<any>$(`#add-modal-popup-employee`)).modal('hide');
        this.edit_employee = false;
        this.view_employee = true;
        this.getEmployee();
      }else {
        this.toastr.error(dt.message);
      }
      
    });
  }else{
    this.toastr.error('All fields are required');
    this.isLoder=false;
  }

}

editEmployee(index){
  this.employeeForm.reset();
  this.singleEmployee =this.employees[index];
  
  if(this.singleEmployee ){
  this.edit_employee = true;
  this.view_employee = false;
  this.employeeForm.patchValue({
    id:this.employees[index].id,
    first_name:this.employees[index].first_name,
    last_name:this.employees[index].last_name,
    user_id:this.employees[index].user_id,
    position:this.employees[index].position,
    // password:this.employees[index].password,
  });
  //this.employeeForm.patchValue(this.singleEmployee);
  }
}

async deleteEmployee(employeeId){
  //console.log("EmployeeId>>>>",employeeId);
  const yes = await yesno();
  if(yes){
    this.postArry = {
      id:employeeId,
    }
    this.companiesService.deleteEmployee(this.postArry).subscribe(response => {
      this.getEmployee();
      this.toastr.success('Data deleted Successfully');
     });
  }  
}

backToEmployee(){
  this.edit_employee = false;
  this.view_employee = true;
  this.getEmployee();
}

}
