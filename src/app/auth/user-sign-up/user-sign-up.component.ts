import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {patternValidator} from '../../core/helpers/pattern-validator';
import {ToastrService} from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {
  API_URL,
  DATE_ONLY_PATTERN,
  EMAIL_PATTERN,
  NO_SPACE_PATTERN,
  TEXT_ONLY_PATTERN
} from '../../core/constants/general';
import {passwordConfirmation} from '../../core/helpers/password-confirmation';
import {COUNTRY_LIST} from '../../core/constants/countries';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  userRegisterForm: FormGroup;
  isSubmitted = false;
  passwordsMatch = true;
  maxBirthdayDate = new Date(2009, 11, 31);
  private sub: any;
  countries = COUNTRY_LIST;
  id: number;
  formatedDate;
  isLoder;
  
  constructor(
    public router: Router,
    private fb: FormBuilder,
    public auth: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.userRegisterForm = this.fb.group({
        email: new FormControl(null, {
          validators: [Validators.required, patternValidator(EMAIL_PATTERN)]
        }),
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), patternValidator(NO_SPACE_PATTERN)]],
        confirm_password: ['', Validators.required],
        //birthday: ['', [Validators.required]], // patternValidator(DATE_ONLY_PATTERN)
        first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
        last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
        //gender: ['male', Validators.required],
        country: ['', Validators.required],
        linkedin_url: ['', Validators.required],
        agreed: ['', Validators.required],
        resume: ['', Validators.required]

      },
    );
  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.id = +params['job'] || null; // (+) converts string 'id' to a number
     
});
  }

  register() {
    this.isSubmitted = true;
    
    // console.log(this.userRegisterForm.valid)
    if (this.userRegisterForm.valid) {
      const formData = new FormData();
      formData.append('resume', this.userRegisterForm.get('resume').value);
      formData.append('email', this.userRegisterForm.get('email').value);
      formData.append('password', this.userRegisterForm.get('password').value);
      formData.append('confirm_password', this.userRegisterForm.get('confirm_password').value);
      formData.append('first_name', this.userRegisterForm.get('first_name').value);
      formData.append('last_name', this.userRegisterForm.get('last_name').value);
      formData.append('country', this.userRegisterForm.get('country').value);
      formData.append('linkedin_url', this.userRegisterForm.get('linkedin_url').value);
      formData.append('agreed', this.userRegisterForm.get('agreed').value);
      
      //console.log("Form data>>>",formData.get('resume'));
      this.auth.register(formData).subscribe((dt: any) => {
        if(dt.statusCode==200){
          
          localStorage.setItem('token', dt['data'].token);
            localStorage.setItem('data', JSON.stringify(dt['data']));
            if (this.id ) {
              this.router.navigate(['users/job-question',this.id]);
            } else {
            this.router.navigate(['users/profile-page']);
            }
          this.toastr.success('The user has been successfully registered and you are logged in');
        } else {
          this.toastr.error(dt.message);
        }
      });
    }
  }

  saveResume(event){
    const file = event.target.files[0];
    if(file.type == 'application/pdf' || file.type =='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
     
      if(file.size > 1000000){
        this.toastr.error('File size must be under 1 MB');
        this.userRegisterForm.patchValue({resume: ''});
        return false;
      }
      
      this.userRegisterForm.patchValue({resume: file});
      return true;
    }else{
      this.userRegisterForm.patchValue({resume: ''});
      this.toastr.error('Please choose pdf/word file file');
      return false;
    }
  }

  agreeTerms(e) {
    const agreed = e.checked ? 'yes' : '';
    this.userRegisterForm.patchValue({agreed});
  }

  comparePasswords() {
    this.passwordsMatch = this.pass.value === this.confirmPass.value;
  }

  getSignIn() {
    if(this.id){
        this.router.navigate(['auth/login'],{ queryParams: { job: this.id , id: 1} });
    } else {
      this.router.navigate(['auth/login', 1]);
    }
  }
  // getGoogleAuthUrl() {
  //   return `${API_URL}auth/google`;
  // }

  /**
   * First name field control getter
   */
  get firstName() {
    return this.userRegisterForm.get(`first_name`);
  }

  /**
   * Last name field control getter
   */
  get lastName(): AbstractControl {
    return this.userRegisterForm.get(`last_name`);
  }

  /**
   * E-mail field getter
   */
  get email(): AbstractControl {
    return this.userRegisterForm.get('email');
  }

  get linkedUrl(): AbstractControl {
    return this.userRegisterForm.get(`linkedin_url`);
  }

  /**
   * Password field getter
   */
  get pass(): AbstractControl {
    return this.userRegisterForm.get('password');
  }

  get confirmPass(): AbstractControl {
    return this.userRegisterForm.get('confirm_password');
  }

  get resumeCtrl(): AbstractControl {
    return this.userRegisterForm.get('resume');
  }

  getDate(){
    let date = this.userRegisterForm.get('birthday').value;
    let d = new Date(Date.parse(date));
    let year = d.getFullYear();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let day = ("0" + d.getDate()).slice(-2);
    let Str = `${month}-${day}-${year}`;
    this.formatedDate = Str;
    console.log("Formated date is >>>>>>>>>",Str);
    // this.userRegisterForm.patchValue({
    //   birthday: this.formatedDate
    // });
  }

  // get birthday(): AbstractControl {
  //  return this.userRegisterForm.get('birthday');
  // }

  async goToPage(url) {
    await this.router.navigate([url]);
  }

}
