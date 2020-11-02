import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserSignUpComponent} from './user-sign-up/user-sign-up.component';
import {CompanySignUpComponent} from './company-sign-up/company-sign-up.component';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {SentEmailComponent} from './sent-email/sent-email.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {SubmittedPasswordComponent} from './submitted-password/submitted-password.component';
import {ReceiveCodeComponent} from './receive-code/receive-code.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-registration',
    component: UserSignUpComponent
  },
  {
    path: 'company-registration',
    component: CompanySignUpComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'sent-email',
    component: SentEmailComponent
  },
  {
    path: 'new-password',
    component: NewPasswordComponent
  },
  {
    path: 'submitted-password',
    component: SubmittedPasswordComponent
  },
  {
    path: 'receive-code',
    component: ReceiveCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
