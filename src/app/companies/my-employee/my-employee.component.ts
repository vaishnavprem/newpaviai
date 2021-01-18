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

interface Employee {
  name: string;
  user_id: string;
  position: string;
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

  public dataSourceFive;
  public displayedColumnsFive: string[];
  employeeForm: FormGroup;

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
    private sanitizer: DomSanitizer
  ) {
    this.dataSourceFive = new MatTableDataSource<Employee>();
    this.displayedColumnsFive=['name', 'user_id', 'position','action'];
   }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      position: ['', Validators.required],
      user_id:['', [Validators.required,patternValidator(TEXT_ONLY_PATTERN)]],
      password:['', [Validators.required,Validators.minLength(5), Validators.maxLength(15), patternValidator(NO_SPACE_PATTERN)]],
      parent_id:this.authUser.user_id
    });
    this.getCompanyData();
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
  //this.isLoder=true;
  this.postArry = {
    companyId:this.companyData.id
  }
  
    this.dataSourceFive.data = [{name:'Ray',position:'PHP',user_id:'ray@pavi.com'},{name:'Ray2',position:'PHP',user_id:'ray2@pavi.com'},{name:'Ray3',position:'PHP',user_id:'ray3@pavi.com'},{name:'Ray4',position:'PHP',user_id:'ray4@pavi.com'}] as Employee[];
    this.dataSourceFive.paginator = this.tableFivePaginator;
      this.dataSourceFive.sort = this.tableFiveSort;
  
}

// saveEmployee(){

//   this.isLoder=true;
//   if (this.employeeForm.valid) {
//     this.companiesService.employeeRegister(this.employeeForm.getRawValue()).subscribe(async (dt: any) => {
//       if(dt.statusCode==200){
//         this.toastr.success('Employee successfully registered and you are logged in');
//         (<any>$(`#add-modal-popup-employee`)).modal('hide');
//       }else {
//         this.toastr.error(dt.message);
//       }
//       this.isLoder=false;
//     });
//   }

// }

// addEmployee(){
//   $("#add-modal-popup-employee").modal("show");
//     $("#add-modal-popup-employee").appendTo("body");
// }

}
