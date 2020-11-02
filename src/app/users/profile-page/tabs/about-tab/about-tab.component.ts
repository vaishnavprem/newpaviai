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
      phone: [{
        value: 'n/a',
        disabled: !this.showEditProfileForm
      }, [Validators.required, patternValidator(NUMBERS_ONLY_PATTERN)]],
      gender: [{value: '', disabled: true}, Validators.required],
      birthday: [{value: 'n/a', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      age: [{value: '', disabled: true}]

    });


  }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    const age = this.countUsersAge();
    this.profileForm.patchValue({...this.authUser, ...{age}});


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
        ...this.profileForm.value, ...{user_id: this.authUser._id}
      }).subscribe((dt: any) => {
        this.toastr.success('The profile changes has been saved successfully');
        localStorage.setItem('token', dt.token);
        this.authUser = this.getAuthUser.transform();
        this.countUsersAge();
        this.showEditProfileForm = false;
      });
    }
  }

  editProfileForm() {
    this.showEditProfileForm = true;
    this.country.enable();
    this.phone.enable();
    this.birthday.enable();
  }


  backToMainForm() {
    this.showChangePass = false;
    this.showChangeEmail = false;
    this.authUser = this.getAuthUser.transform();
    this.profileForm.patchValue(this.authUser);
  }

  dateChanged(e) {
    this.birthday.patchValue(moment(e.value).format('YYYY-MM-DD'));
  }

  get phone(): AbstractControl {
    return this.profileForm.get('phone');
  }

  get country(): AbstractControl {
    return this.profileForm.get('country');
  }

  get birthday(): AbstractControl {
    return this.profileForm.get('birthday');
  }

}
