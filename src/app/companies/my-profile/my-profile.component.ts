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
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
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

  emailsMatch = true;
  newOldEmailsMatch = false;
  profileForm: FormGroup;
  changeEmailForm: FormGroup;
  profileImage = 'assets/images/no-profile.png';
  coverImage = 'assets/images/no-cover.png';
  profileImgTextForm: FormGroup;
  coverImgForm: FormGroup;

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
    this.profileForm = this.fb.group({
      country:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      name:['', Validators.required],
    });
    this.changeEmailForm = this.fb.group({
      old_email: [this.authUser.email, [Validators.required, patternValidator(EMAIL_PATTERN)]],
      new_email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]],
      confirm_email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]]
      });
      this.profileImgTextForm = this.fb.group({
        // avatar: [''],
        about_text: ['']
      });
      this.coverImgForm = this.fb.group({
        cover: ['']
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
      // this.employments = response['data']['employment']; 
      // this.seniorityLevels = response['data']['seniority']; 
      // this.responsibilities = response['data']['responsibility']; 
      // this.requirements = response['data']['requirement']; 
      this.categories = response['data']['categories']; 
      this.openJobs= response['data']['jobs']; 
      this.applicants= response['data']['applicants']; 
      this.interviewCompleted= response['data']['interview_com']; 
      this.showProfile();
       } else if (response.statusCode == 401) {
        this.toastr.error(response.message)
        this.auth.logOut();
        this.router.navigate(['auth/login']);
        }
        else this.toastr.error(response.message)
        
  });
}

showProfile(){
  this.profileForm.patchValue({
    name:this.companyData.name,
    address:this.companyData.address,
    phone:this.companyData.phone,
    country:this.companyData.country
  });
  
  if(this.companyData.logo_image!=undefined){
    this.profileImage= `${AVATAR_URL}uploads/avatars/${this.companyData.logo_image}`;
  }

  if(this.companyData.cover_image!=undefined){
    this.coverImage = `${AVATAR_URL}uploads/avatars/${this.companyData.cover_image}`;
  }
}
get oldEmail() {
  return this.changeEmailForm.get('old_email');
}

get newEmail() {
    return this.changeEmailForm.get('new_email');
}

get confirmEmail() {
    return this.changeEmailForm.get('confirm_email');
}
changeEmail() {
  this.isSubmitted = true;
  if (this.changeEmailForm.valid && this.emailsMatch && !this.newOldEmailsMatch) {
      this.usersService.changeEmail({...this.changeEmailForm.value, ...{user_id: this.authUser._id}}).subscribe((dt: any) => {
          this.toastr.success('Email has been changed successfully');
          localStorage.setItem('token', dt.token);
      });
  }
}

compareEmails() {
  this.compareNewOldEmails();
  this.emailsMatch = this.confirmEmail.value === this.newEmail.value;
}

compareNewOldEmails() {
  this.newOldEmailsMatch = this.newEmail.value && this.oldEmail.value && this.newEmail.value === this.oldEmail.value;
}
saveProfileDetails() {
if (this.profileForm.valid) {

  this.companiesService.updateProfileInfo({
    ...this.profileForm.value, ...{companyId:this.companyData._id}
  }).subscribe((dt: any) => {
    this.toastr.success('The profile changes has been saved successfully');
  });
}
}
changeProfileImage(event) {
if (event.target.files.length > 0) {
  const file = event.target.files[0];
  // this.profileImgTextForm.patchValue({
  //   avatar: file
  // });

  const formData = new FormData();
  formData.append('company_id', this.companyData.id);
  formData.append('column','logo');
  formData.append('avatar', file);
  this.usersService.uploadProfileImg(formData).subscribe((response: any) => {
    this.profileImage = `${AVATAR_URL}uploads/avatars/${response['data']['image']}`;
  });
}
}
changeCoverImage(event){
if (event.target.files.length > 0) {
  const file = event.target.files[0];
  // this.profileImgTextForm.patchValue({
  //   avatar: file
  // });

  const formData = new FormData();
  formData.append('company_id', this.companyData.id);
  formData.append('column','cover');
  formData.append('avatar', file);
  this.usersService.uploadProfileImg(formData).subscribe((response: any) => {
    this.coverImage = `${AVATAR_URL}uploads/avatars/${response['data']['image']}`;
  });
}
}

}
