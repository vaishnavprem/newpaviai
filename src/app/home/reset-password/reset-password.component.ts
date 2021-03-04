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
import {CompaniesService} from '../../core/services/companies.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  passwordsMatch = true;
  sub;
  email;
  key;
  isLoder = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public auth: AuthService,
    private toastr: ToastrService,
    private companiesService: CompaniesService,
    private route: ActivatedRoute
  ) {
    
   }

  ngOnInit(): void {
    // this.sub = this.route.params.subscribe(params => {
    //   this.email = params['email'] || null; // (+) converts string 'id' to a number
    //  this.key = params['email'] || null;
    // });
    this.key = this.route.snapshot.params.key;
    this.email = this.route.snapshot.params.email;

    this.forgotPasswordForm = this.fb.group({
     
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), patternValidator(NO_SPACE_PATTERN)]],
      confirm_password: ['', Validators.required],
      email: this.email,
      key : this.key 
      },
    );

    //console.log("Email And Key>>>>",this.email,this.key);
  }

  submitForm(){
    this.isSubmitted = true;
    //console.log("forgotPasswordForm",this.forgotPasswordForm.getRawValue());
    if (this.forgotPasswordForm.valid) {
      this.isLoder = true;
      this.companiesService.resetPassword(this.forgotPasswordForm.getRawValue())
      .subscribe((response : any)=> {
      this.isLoder=false;
      if (response.statusCode == 200) {
        this.isLoder = false;
        this.toastr.success("Password Updated Successfully");
        this.router.navigate(['auth/login',1])
        }
        else{
          this.toastr.error("The link is expired.");
        } 
          
      });
    }
    else{
      this.toastr.error("All fields are required.");
    }
  }

  comparePasswords() {
    this.passwordsMatch = this.pass.value === this.Cpass.value;
  }

  get pass(): AbstractControl {
    return this.forgotPasswordForm.get('password');
  }

  get Cpass(): AbstractControl {
    return this.forgotPasswordForm.get('confirm_password');
  }

}
