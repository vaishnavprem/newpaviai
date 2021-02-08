import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FindEmployeesComponent} from '../users/find-employees/find-employees.component';
import {DashboardJobsComponent} from './dashboard/dashboard-jobs/dashboard-jobs.component';
import {DasboardArchiveJobsComponent} from './dashboard/dasboard-archive-jobs/dasboard-archive-jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DashboardMoreArchiveJobsComponent} from './dashboard/dashboard-more-archive-jobs/dashboard-more-archive-jobs.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { MyEmployeeComponent } from './my-employee/my-employee.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { VendorsComponent } from './vendors/vendors.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard-jobs',
    component: DashboardJobsComponent
  },
  {
    path: 'dashboard-archive',
    component: DasboardArchiveJobsComponent
  },
  {
    path: 'dashboard-more-archive',
    component: DashboardMoreArchiveJobsComponent
  },
  {
    path: 'add-jobs',
    component: AddJobsComponent
  },
  {
    path: 'view-jobs',
    component: ViewJobsComponent
  },
  {
    path: 'add-question',
    component: AddQuestionComponent
  },
  {
    path: 'view-question',
    component: ViewQuestionComponent
  },
  {
    path: 'applicants',
    component: ApplicantsComponent
  },
  {
    path: 'my-employee',
    component: MyEmployeeComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  },
  {
    path: 'vendors',
    component: VendorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {
}
