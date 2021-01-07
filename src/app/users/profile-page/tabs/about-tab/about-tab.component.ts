import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  NUMBERS_ONLY_PATTERN,
  TEXT_ONLY_PATTERN
} from '../../../../core/constants/general';
import {GetAuthUserPipe} from '../../../../shared/pipes/get-auth-user.pipe';
import {UsersService} from '../../../../core/services/users.service';
import {ToastrService} from 'ngx-toastr';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {patternValidator} from '../../../../core/helpers/pattern-validator';
import {COUNTRY_LIST} from '../../../../core/constants/countries';
import * as  moment from 'moment';

@Component({
  selector: 'app-about-tab',
  templateUrl: './about-tab.component.html',
  styleUrls: ['./about-tab.component.css']
})
export class AboutTabComponent implements OnInit {

  authUser;

  profileForm: FormGroup;

  showChangePass = false;
  showChangeEmail = false;
  showEditProfileForm = false;
  maxBirthdayDate = new Date(2009, 11, 31);
  countries = COUNTRY_LIST;
  userData;

  constructor(
    private fb: FormBuilder,
    private getAuthUser: GetAuthUserPipe,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {

    this.profileForm = this.fb.group({
      country: [{
        value: '',
        disabled: !this.showEditProfileForm
      }, [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
     
      first_name: [{value: '', disabled: true}, Validators.required],
      last_name: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      linkedin_url: [{value: '', disabled: true}, Validators.required]

    });


  }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    const age = this.countUsersAge();
    this.usersService.getUserData({user_id:this.authUser.user_id})
    .subscribe((response : any) => { 
      if (response.statusCode == 200) {
          this.userData = response['data']['user']; 
          this.profileForm.patchValue({
            first_name:this.userData.first_name,
            last_name:this.userData.last_name,
            country:this.userData.country,
            email:this.userData.email,
            linkedin_url: 'https://www.linkedin.com/in/chandan-kumar-8307b71b0/'
          })
         
      } else {
        this.toastr.error(response.message);
      }
      
    });

  }

  countUsersAge() {
    const now = moment(new Date());
    const end = moment(this.authUser.birthday, 'YYYY-MM-DD'); // another date
    const duration = moment.duration(now.diff(end));
    const years = Math.abs(Math.floor(duration.asYears()));
    return years;
  }

  showChangePassForm() {
    this.showChangePass = !this.showChangePass;
  }

  showChangeEmailForm() {
    this.showChangeEmail = !this.showChangeEmail;
  }

  getUserBirthdayFormatted() {
    return moment(this.authUser.birthday).format('DD/MM/YYYY');
  }

  saveProfileDetails() {
    if (this.profileForm.valid) {
      this.usersService.updateProfileInfo({
        ...this.profileForm.value, ...{user_id: this.authUser.user_id}
      }).subscribe((response: any) => {

        if (response.statusCode == 200) {
          this.toastr.success('The profile changes has been saved successfully');
          this.showEditProfileForm = false;
          this.country.disable();
          this.first_name.disable();
          this.last_name.disable();
          this.email.disable();
          this.linkedin_url.disable();
      } else {
        this.toastr.error(response.message);
      }
        
      });
    }
  }

  editProfileForm() {
    this.showEditProfileForm = true;
    this.country.enable();
    this.first_name.enable();
    this.last_name.enable();
    this.email.enable();
    this.linkedin_url.enable();
  }


  backToMainForm() {
    this.showChangePass = false;
    this.showChangeEmail = false;
  }

 

  get first_name(): AbstractControl {
    return this.profileForm.get('first_name');
  }
  get last_name(): AbstractControl {
    return this.profileForm.get('last_name');
  }
  get country(): AbstractControl {
    return this.profileForm.get('country');
  }

  get email(): AbstractControl {
    return this.profileForm.get('email');
  }

  get linkedin_url(): AbstractControl {
    return this.profileForm.get('linkedin_url');
  }
}
