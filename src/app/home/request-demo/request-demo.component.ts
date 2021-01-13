import { Component, OnInit } from '@angular/core';
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
  TEXT_ONLY_PATTERN,
  NUMBERS_ONLY_PATTERN,
  ADDRESS_PATTERN
} from '../../core/constants/general';
import {passwordConfirmation} from '../../core/helpers/password-confirmation';
import {COUNTRY_LIST} from '../../core/constants/countries';
@Component({
  selector: 'app-request-demo',
  templateUrl: './request-demo.component.html',
  styleUrls: ['./request-demo.component.css']
})
export class RequestDemoComponent implements OnInit {

  userRegisterForm: FormGroup;
  isSubmitted = false;
  passwordsMatch = true;
  maxBirthdayDate = new Date(2009, 11, 31);
  private sub: any;
  countries = COUNTRY_LIST;
  id: number;
  formatedDate;
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

        //birthday: ['', [Validators.required]], // patternValidator(DATE_ONLY_PATTERN)
        company_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
        company_address: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), patternValidator(ADDRESS_PATTERN)]],
        contact_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
        contact_number: ['', [Validators.required,  patternValidator(NUMBERS_ONLY_PATTERN)]],
        //gender: ['male', Validators.required],
        company_website: ['', Validators.required],
        hire_position:['', Validators.required],

      },
    );
  }

  ngOnInit(): void {
  }
  register() {
    this.isSubmitted = true;
    // console.log(this.userRegisterForm.value)
    // console.log(this.userRegisterForm.valid)
    if (this.userRegisterForm.valid) {
      this.auth.requestDemo(this.userRegisterForm.value).subscribe((dt: any) => {
        if(dt.statusCode==200){
          
          this.toastr.success('Request for demo has been send successfully');
        } else {
          this.toastr.error(dt.message);
        }
      });
    }
  }


  // getGoogleAuthUrl() {
  //   return `${API_URL}auth/google`;
  // }

  /**
   * First name field control getter
   */
  get companyName() {
    return this.userRegisterForm.get(`company_name`);
  }

  /**
   * Last name field control getter
   */
  get companyAddress(): AbstractControl {
    return this.userRegisterForm.get(`company_address`);
  }

  /**
   * E-mail field getter
   */
  get email(): AbstractControl {
    return this.userRegisterForm.get('email');
  }

  get companyWebsite(): AbstractControl {
    return this.userRegisterForm.get(`company_website`);
  }

  /**
   * Password field getter
   */
  get contactNumber(): AbstractControl {
    return this.userRegisterForm.get('contact_number');
  }

  get contactName(): AbstractControl {
    return this.userRegisterForm.get('contact_name');
  }
  get hirePosition(): AbstractControl {
    return this.userRegisterForm.get('hire_position');
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
