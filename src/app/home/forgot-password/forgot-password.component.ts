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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public auth: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl(null, {
        validators: [Validators.required, patternValidator(EMAIL_PATTERN)]
      }),

    },
  );
   }

  ngOnInit(): void {
  }

  checkEmail() {
    this.isSubmitted = true;
    // console.log(this.userRegisterForm.value)
    // console.log(this.userRegisterForm.valid)
    if (this.forgotPasswordForm.valid) {
      //console.log(this.forgotPasswordForm.value)
      this.toastr.error("This functionality is comming soon");
    }
  }

  get email(): AbstractControl {
    return this.forgotPasswordForm.get('email');
  }

}
