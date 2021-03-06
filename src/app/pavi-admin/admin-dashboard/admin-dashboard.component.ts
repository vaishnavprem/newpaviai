import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../core/services/users.service';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
import {API_URL, OWL_CAROUSEL_OPTIONS, EMAIL_PATTERN,
  NO_SPACE_PATTERN,
  TEXT_ONLY_PATTERN} from '../../core/constants/general';
import { PaviAdminService } from '../../core/services/pavi-admin.service';
import {ToastrService} from 'ngx-toastr';
import {patternValidator} from '../../core/helpers/pattern-validator';
import {COUNTRY_LIST} from '../../core/constants/countries';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

declare var $: any;

interface Company {
  name: string;
  address: string;
  country: string;
  phone: string;
  email: string;
}
interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}
interface JobCategory {
  category: string;
}
interface JobTerm {
  term: string;
}
interface JobSpecialty {
  specialist_level: string;
}
interface Country {
  country_name: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public companies:any[];
  public users:any[];
  public categories:any[];
  public terms:any[];
  public levels:any[];
  public allcountries:any[];
  public companyCount;
  public userCount;
  public  show = true;
  public isLoder=false;
  companyForm: FormGroup;
  userForm: FormGroup;
  categoryForm: FormGroup;
  termsForm: FormGroup;
  specialistForm: FormGroup;
  cityForm: FormGroup;
  jobCategoryForm: FormGroup;
  jobTermForm: FormGroup;
  jobSpecialtyForm: FormGroup;
  countryForm: FormGroup;
  addCountryForm: FormGroup;
  countries = COUNTRY_LIST;
  today: number = Date.now()

  public selectedValue = 0;  //SelectMenu Of Dashboard
  public home = true;
  public viewCompanies = false;
  public viewUsers = false;
  public jobCategory = false;
  public jobTerms = false;
  public jobSpecialistLevel = false;
  public countryList = false;
  public viewAddCity = false;
  public myProfile = false;
  public logout = false;
  public status: boolean = false;

  public dataSourceOne;
  public displayedColumnsOne: string[];
  public dataSourceTwo;
  public displayedColumnsTwo: string[];
  public dataSourceThree;
  public displayedColumnsThree: string[];
  public dataSourceFour;
  public displayedColumnsFour: string[];
  public dataSourceFive;
  public displayedColumnsFive: string[];
  public dataSourceSix;
  public displayedColumnsSix: string[];
  
  @ViewChild('TableOnePaginator', {static: false}) tableOnePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableOneSort: MatSort;
  @ViewChild('TableTwoPaginator', {static: false}) tableTwoPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableTwoSort: MatSort;
  @ViewChild('TableThreePaginator', {static: false}) tableThreePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableThreeSort: MatSort;
  @ViewChild('TableFourPaginator', {static: false}) tableFourPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableFourSort: MatSort;
  @ViewChild('TableFivePaginator', {static: false}) tableFivePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableFiveSort: MatSort;
  @ViewChild('TableSixPaginator', {static: false}) tableSixPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableSixSort: MatSort;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private paviAdminService:PaviAdminService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService,
  ) { 
    this.dataSourceOne = new MatTableDataSource<Company>();
    this.displayedColumnsOne=['name', 'address', 'country', 'phone','email','action'];
    this.dataSourceTwo = new MatTableDataSource<User>();
    this.displayedColumnsTwo=['first_name', 'last_name', 'email', 'gender','action'];
    this.dataSourceThree = new MatTableDataSource<JobCategory>();
    this.displayedColumnsThree=['category','action'];
    this.dataSourceFour = new MatTableDataSource<JobTerm>();
    this.displayedColumnsFour=['term','action'];
    this.dataSourceFive = new MatTableDataSource<JobSpecialty>();
    this.displayedColumnsFive=['specialist_level','action'];
    this.dataSourceSix = new MatTableDataSource<Country>();
    this.displayedColumnsSix=['country_name','action'];
    }

  ngOnInit(): void {
    let companData = this.paviAdminService.getDashboardcount()
    .subscribe((response : any) => {
      if (response.statusCode == 200) {
      this.companyCount = response['data']['companyCount']; 
      this.userCount = response['data']['userCount']; 
      }  else if (response.statusCode == 401) {
        console.log(response.statusCode);
             this.toastr.error(response.message)
            this.auth.logOut();
            this.router.navigate(['log-in']);
      } else {
         this.toastr.error(response.message)
      }
    });
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      phone:['', Validators.required],
      email:['', Validators.required],
      first_name:['', Validators.required],
      last_name:['', Validators.required],
      status:['', Validators.required],

    });

    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      email:['', Validators.required],
      status:['', Validators.required],

    });
    this.categoryForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],

    });

    this.termsForm = this.fb.group({
      term: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],

    });
    this.specialistForm = this.fb.group({
      specialist_level: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],

    });

    this.cityForm = this.fb.group({
    city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
    country_id: ['', Validators.required],

    });

    this.jobCategoryForm = this.fb.group({
      jobCategoryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
      id: ['']

    });

    this.jobTermForm = this.fb.group({
      jobTermName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
      id: ['']

    });

    this.jobSpecialtyForm = this.fb.group({
      jobSpecialtyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
      id: ['']

    });

    this.countryForm = this.fb.group({
      countryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],

    });

    this.addCountryForm = this.fb.group({
      countryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],

    });
  }
  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  getComapnies(){
    this.isLoder=true;
    let companData = this.paviAdminService.getComapnies()
    .subscribe((response : any) => {
      if (response.statusCode == 200) {
        this.dataSourceOne.data = response['data']['companies'] as Company[];
        setTimeout(() => {this.dataSourceOne.paginator = this.tableOnePaginator;
          this.dataSourceOne.sort = this.tableOneSort;
        });
        this.companies = response['data']['companies']; 
      }  else if (response.statusCode == 401) {
        console.log(response.statusCode);
             this.toastr.error(response.message)
            this.auth.logOut();
            this.router.navigate(['auth/login']);
      } else {
         this.toastr.error(response.message)
      }
    });
    this.isLoder=false;
  }
 getUsers(){
  this.isLoder=true;
  let userData = this.paviAdminService.getUsers()
  .subscribe(response => {
    this.dataSourceTwo.data = response['data']['users'] as User[];
    setTimeout(() => {this.dataSourceTwo.paginator = this.tableTwoPaginator;
      this.dataSourceTwo.sort = this.tableTwoSort;
    });
    this.users = response['data']['users']; 
  });
  this.isLoder=false;
 }

 updateCompany(){
   if(this.companyForm.valid){
     this.paviAdminService.updateCompany(this.companyForm.getRawValue()).subscribe(response => {
      this.getComapnies();
      this.toastr.success('Data updated suceesfully');
     });
     
     (<any>$(`#edit-modal-popup-company`)).modal('hide');
   } else {
    this.toastr.error('Please check all fields');
   }
 }
 editCompany(index){
  $("#edit-modal-popup-company").modal("show");
  $("#edit-modal-popup-company").appendTo("body");
  // let element = document.getElementById('edit-modal-popup-company');
  // element.className = 'modal fade in';
  this.companyForm.patchValue({
    name: this.companies[index].name,
    address: this.companies[index].address,
    country: this.companies[index].country,
    phone: this.companies[index].phone,
    email: this.companies[index].email,
    first_name: this.companies[index].first_name,
    last_name: this.companies[index].last_name,
    status: this.companies[index].status
  });
 }

 editUser(index){
  $("#edit-modal-popup-user").modal("show");
  $("#edit-modal-popup-user").appendTo("body");
  // let element = document.getElementById('edit-modal-popup-user');
  // element.className = 'modal fade in';
  this.userForm.patchValue({
    email: this.users[index].email,
    first_name: this.users[index].first_name,
    last_name: this.users[index].last_name,
    gender: this.users[index].gender,
    status: this.users[index].status
  });
 }

 updateUser(){
  if(this.userForm.valid){
    this.paviAdminService.updateUser(this.userForm.getRawValue()).subscribe(response => {
     this.getUsers();
     this.toastr.success('Data updated suceesfully');
    });
    
    (<any>$(`#edit-modal-popup-user`)).modal('hide');
  } else {
   this.toastr.error('Please check all fields');
  }
}
getJobCategory(){
  this.isLoder=true;
 
  let JobData = this.paviAdminService.getJobCategory()
  .subscribe(response => {
    //console.log("Job Category>>>",response['data']['categories']);
    this.dataSourceThree.data = response['data']['categories'] as JobCategory[];
    setTimeout(() => {this.dataSourceThree.paginator = this.tableThreePaginator;
      this.dataSourceThree.sort = this.tableThreeSort;
    });
    this.categories = response['data']['categories'];  
  });
  this.isLoder=false;
}
saveJobCategory(){
  if(this.categoryForm.valid){
  
    this.paviAdminService.saveJobCategory({category:this.categoryForm.get('category').value}).subscribe((response : any) => {
      if(response.statusCode==200){
      this.getJobCategory();
      this.toastr.success('Data updated suceesfully');
      (<any>$(`#add-modal-job-catgory`)).modal('hide');
      } else {
        this.toastr.error(response.message)
      }
     });
  } else {
    this.toastr.error('Please check all fields');
  }
}

saveJobTerms(){
  if(this.termsForm.valid){
  
    this.paviAdminService.saveJobTerms({term:this.termsForm.get('term').value}).subscribe((response : any) => {
      if(response.statusCode==200){
      this.getJobTerms();
      this.toastr.success('Data updated suceesfully');
      (<any>$(`#add-modal-job-catgory`)).modal('hide');
      } else {
        this.toastr.error(response.message)
      }
     });
  } else {
    this.toastr.error('Please check all fields');
  }
}
saveJobSpecialistLevel(){
  if(this.specialistForm.valid){
  
    this.paviAdminService.saveobSpecialistLevel({specialist_level:this.specialistForm.get('specialist_level').value}).subscribe((response : any) => {
      if(response.statusCode==200){
      this.getJobSpecialistLevel();
      this.toastr.success('Data updated suceesfully');
      (<any>$(`#add-modal-job-specialist`)).modal('hide');
      } else {
        this.toastr.error(response.message)
      }
     });
  } else {
    this.toastr.error('Please check all fields');
  }
}
getJobTerms(){
  this.isLoder=true;
  let JobData = this.paviAdminService.getJobTerms()
  .subscribe(response => {
    //console.log("Job Term>>>",response['data']['terms']);
    this.dataSourceFour.data = response['data']['terms'] as JobTerm[];
    setTimeout(() => {this.dataSourceFour.paginator = this.tableFourPaginator;
      this.dataSourceFour.sort = this.tableFourSort;
    });
    this.terms = response['data']['terms'];  
  });
  this.isLoder=false;
}

getJobSpecialistLevel(){
  this.isLoder=true;
  let JobData = this.paviAdminService.getJobSpecialistLevel()
  .subscribe(response => {
    //console.log("Job Specialty>>>",response['data']['levels']);
    this.dataSourceFive.data = response['data']['levels'] as JobSpecialty[];
    setTimeout(() => {this.dataSourceFive.paginator = this.tableFivePaginator;
      this.dataSourceFive.sort = this.tableFiveSort;
    });
    this.levels = response['data']['levels'];  
  });
  this.isLoder=false;
}
getCountries(){
  this.isLoder=true;
  let JobData = this.paviAdminService.getCountry()
  .subscribe(response => {
    //console.log("Job Specialty>>>",response['data']['countries']);
    this.dataSourceSix.data = response['data']['countries'] as Country[];
    setTimeout(() => {this.dataSourceSix.paginator = this.tableSixPaginator;
      this.dataSourceSix.sort = this.tableSixSort;
    });
    this.allcountries = response['data']['countries'];  
  });
  this.isLoder=false;
}
addCity(){
  this.getCountries();
}
saveCity(){
  if(this.cityForm.valid){
   
      this.paviAdminService.saveCity(this.cityForm.getRawValue()).subscribe((response : any) => {
        if(response.statusCode==200){
          this.cityForm.reset();
          this.toastr.success('Data added suceesfully');
        } else {
          this.toastr.error(response.message)
        }
       });
  } else {
    this.toastr.error('Please check all fields');
  }
}

editJobCategory(index){
  $("#edit-modal-popup-jobCategory").modal("show");
  $("#edit-modal-popup-jobCategory").appendTo("body");
  this.jobCategoryForm.patchValue({
    jobCategoryName: this.categories[index].category,
    id: this.categories[index].id
  });
 }
 updateJobCategory(){
  if(this.jobCategoryForm.valid){    
    let params = {id: this.jobCategoryForm.getRawValue().id,
              category: this.jobCategoryForm.getRawValue().jobCategoryName};
        
      this.paviAdminService.updateJobCategories(params).subscribe((response : any) => { 
        console.log("Update Job Category>>>>>>", response)
        if(response.statusCode==200){
           this.getJobCategory();
           this.toastr.success('Data Updated suceesfully');
           (<any>$(`#edit-modal-popup-jobCategory`)).modal('hide');
        } else {
           this.toastr.error(response.message)
        }
       });
  } else {
     this.toastr.error('Please check all fields');
  }
}
 editJobTerm(index){
  $("#edit-modal-popup-jobTerm").modal("show");
  $("#edit-modal-popup-jobTerm").appendTo("body");
  this.jobTermForm.patchValue({
    jobTermName: this.terms[index].term,
    id: this.terms[index].id
  });
 }
 updateJobTerm(){
  if(this.jobTermForm.valid){    
    let params = {id: this.jobTermForm.getRawValue().id,
              term: this.jobTermForm.getRawValue().jobTermName};
              
      this.paviAdminService.updateJobTerms(params).subscribe((response : any) => {
        console.log("Update Job Term>>>>>>", response)
        if(response.statusCode==200){
          this.getJobTerms();
          this.toastr.success('Data Updated suceesfully');
          (<any>$(`#edit-modal-popup-jobTerm`)).modal('hide');
        } else {
          this.toastr.error(response.message)
        }
       });
  } else {
    this.toastr.error('Please check all fields');
  }
}
 editJobSpecialty(index){
  $("#edit-modal-popup-jobSpecialty").modal("show");
  $("#edit-modal-popup-jobSpecialty").appendTo("body");
  this.jobSpecialtyForm.patchValue({
    jobSpecialtyName: this.levels[index].specialist_level,
    id: this.levels[index].id,
  });
 }
 updateJobSpecialty(){
  if(this.jobSpecialtyForm.valid){    
    let params = {id: this.jobSpecialtyForm.getRawValue().id,
      specialist_level: this.jobSpecialtyForm.getRawValue().jobSpecialtyName};
        
      this.paviAdminService.updateJobSpecialties(params).subscribe((response : any) => { 
        console.log("Update Job Specialist>>>>>>", response)
        if(response.statusCode==200){
           this.getJobSpecialistLevel();
           this.toastr.success('Data Updated suceesfully');
           (<any>$(`#edit-modal-popup-jobSpecialty`)).modal('hide');
        } else {
           this.toastr.error(response.message)
        }
       });
  } else {
     this.toastr.error('Please check all fields');
  }
}
 editCountry(index){
  $("#edit-modal-popup-country").modal("show");
  $("#edit-modal-popup-country").appendTo("body");
  this.countryForm.patchValue({
    countryName: this.allcountries[index].country_name,
  });
 }

applyFilterOne(filterValue: string) {
  this.dataSourceOne.filter = filterValue.trim().toLowerCase();
}
applyFilterTwo(filterValue: string) {
  this.dataSourceTwo.filter = filterValue.trim().toLowerCase();
}
applyFilterThree(filterValue: string) {
  this.dataSourceThree.filter = filterValue.trim().toLowerCase();
}
applyFilterFour(filterValue: string) {
  this.dataSourceFour.filter = filterValue.trim().toLowerCase();
}
applyFilterFive(filterValue: string) {
  this.dataSourceFive.filter = filterValue.trim().toLowerCase();
}
applyFilterSix(filterValue: string) {
  this.dataSourceSix.filter = filterValue.trim().toLowerCase();
}

selectedV(){
  let select = +this.selectedValue;
  
  switch(select) {
    case 0: { 
      this.getComapnies();
      this.home = true;
      this.viewCompanies = false;
      this.viewUsers = false;
      this.jobCategory = false;
      this.jobTerms = false;
      this.jobSpecialistLevel = false;
      this.countryList = false;
      this.viewAddCity = false;
      this.myProfile = false;
      this.logout = false;
      
       break; 
    }
    case 1: { 
      this.getComapnies();
      this.home = false;
      this.viewCompanies = true;
      this.viewUsers = false;
      this.jobCategory = false;
      this.jobTerms = false;
      this.jobSpecialistLevel = false;
      this.countryList = false;
      this.viewAddCity = false;
      this.myProfile = false;
      this.logout = false;
      
       break; 
    } 
    case 2: { 
      this.getUsers();
      this.home = false;
      this.viewCompanies = false;
      this.viewUsers = true;
      this.jobCategory = false;
      this.jobTerms = false;
      this.jobSpecialistLevel = false;
      this.countryList = false;
      this.viewAddCity = false;
      this.myProfile = false;
      this.logout = false;
      
       break; 
    }
    case 3: { 
      this.getJobCategory();
      this.home = false;
      this.viewCompanies = false;
      this.viewUsers = false;
      this.jobCategory = true;
      this.jobTerms = false;
      this.jobSpecialistLevel = false;
      this.countryList = false;
      this.viewAddCity = false;
      this.myProfile = false;
      this.logout = false;
      
      break; 
    }
    case 4: { 
      this.getJobTerms();
      this.home = false;
      this.viewCompanies = false;
      this.viewUsers = false;
      this.jobCategory = false;
      this.jobTerms = true;
      this.jobSpecialistLevel = false;
      this.countryList = false;
      this.viewAddCity = false;
      this.myProfile = false;
      this.logout = false;
      
      break; 
    }
    case 5: { 
      this.getJobSpecialistLevel();
      this.home = false;
      this.viewCompanies = false;
      this.viewUsers = false;
      this.jobCategory = false;
      this.jobTerms = false;
      this.jobSpecialistLevel = true;
      this.countryList = false;
      this.viewAddCity = false;
      this.myProfile = false;
      this.logout = false;
      
      break; 
    }
    case 6: { 
      this.getCountries();
      this.home = false;
      this.viewCompanies = false;
      this.viewUsers = false;
      this.jobCategory = false;
      this.jobTerms = false;
      this.jobSpecialistLevel = false;
      this.countryList = true;
      this.viewAddCity = false;
      this.myProfile = false;
      this.logout = false;
      
      break; 
    }
    case 7: { 
      this.addCity();
      this.home = false;
      this.viewCompanies = false;
      this.viewUsers = false;
      this.jobCategory = false;
      this.jobTerms = false;
      this.jobSpecialistLevel = false;
      this.countryList = false;
      this.viewAddCity = true;
      this.myProfile = false;
      this.logout = false;
      
      break; 
    }
    case 8: { 
      this.home = false;
      this.viewCompanies = false;
      this.viewUsers = false;
      this.jobCategory = false;
      this.jobTerms = false;
      this.jobSpecialistLevel = false;
      this.countryList = false;
      this.viewAddCity = false;
      this.myProfile = true;
      this.logout = false;
      
      break; 
    }
    case 9: { 
      // Here Just Call the Logout Service 
      
      break; 
    }        
    default: { 
       
       break; 
    } 
 } 
}

}
