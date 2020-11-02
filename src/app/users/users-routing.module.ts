import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {FindJobComponent} from '../jobs/find-job/find-job.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AboutComponent} from './about/about.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {FindEmployeesComponent} from './find-employees/find-employees.component';
import { QuestionsComponent } from './questions/questions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: 'profile-page',
    component: ProfilePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'find-employees',
    component: FindEmployeesComponent
  },
  {
    path: 'job-question/:id',
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
