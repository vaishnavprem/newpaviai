import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FindEmployeesComponent} from '../users/find-employees/find-employees.component';
import {DashboardJobsComponent} from './dashboard/dashboard-jobs/dashboard-jobs.component';
import {DasboardArchiveJobsComponent} from './dashboard/dasboard-archive-jobs/dasboard-archive-jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DashboardMoreArchiveJobsComponent} from './dashboard/dashboard-more-archive-jobs/dashboard-more-archive-jobs.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {
}
