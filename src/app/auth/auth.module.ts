import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {UserSignUpComponent} from './user-sign-up/user-sign-up.component';
import {CompanySignUpComponent} from './company-sign-up/company-sign-up.component';
import {SharedModule} from '../shared/shared.module';
import {Step1Component} from './company-sign-up/step1/step1.component';
import {Step2Component} from './company-sign-up/step2/step2.component';
import {Step3Component} from './company-sign-up/step3/step3.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {SentEmailComponent} from './sent-email/sent-email.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {SubmittedPasswordComponent} from './submitted-password/submitted-password.component';
import {AuthComponent} from './auth.component';
import {ReceiveCodeComponent} from './receive-code/receive-code.component';


@NgModule({
  declarations: [
    UserSignUpComponent,
    CompanySignUpComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ResetPasswordComponent,
    SentEmailComponent,
    NewPasswordComponent,
    SubmittedPasswordComponent,
    AuthComponent,
    ReceiveCodeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class AuthModule {
}
