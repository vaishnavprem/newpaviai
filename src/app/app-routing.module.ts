import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NonAuthGuard} from './core/guards/non-auth.guard';
import {AuthGuard} from './core/guards/auth.guard';
import {RoleGuard} from './core/guards/role.guard';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { AskQuestionComponent } from './home/ask-question/ask-question.component';
import { FindNewEmployeeComponent } from './home/find-new-employee/find-new-employee.component';
import { EmployeeSignUpComponent } from './home/employee-sign-up/employee-sign-up.component';
import { RequestDemoComponent } from './home/request-demo/request-demo.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'help',
    component: AskQuestionComponent
  },
  {
    path: 'request-demo',
    component: RequestDemoComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  // {
  //   path: 'find-new-employee',
  //   component: FindNewEmployeeComponent
  // },
  // {
  //   path: 'employee-sign-up',
  //   component: EmployeeSignUpComponent
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [NonAuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),

  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule),
  },
  {
    path: 'pavi-admin',
    loadChildren: () => import('./pavi-admin/pavi-admin.module').then(m => m.PaviAdminModule),
    canActivate: [AuthGuard,RoleGuard],
    data:{expectedRole:'admin'}
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
