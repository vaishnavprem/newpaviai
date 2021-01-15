import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CityComponent } from './city/city.component';
import { CompanyComponent } from './company/company.component';
import { CountryListComponent } from './country-list/country-list.component';
import { JobCategoryComponent } from './job-category/job-category.component';
import { JobSpecialistComponent } from './job-specialist/job-specialist.component';
import { JobTermComponent } from './job-term/job-term.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { AddCompanyComponent } from './add-company/add-company.component';

const routes: Routes = [
 
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'city',
    component: CityComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'country-list',
    component: CountryListComponent
  },
  {
    path: 'job-category',
    component: JobCategoryComponent
  },
  {
    path: 'job-specialist',
    component: JobSpecialistComponent
  },
  {
    path: 'job-term',
    component: JobTermComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'usres',
    component: UsersComponent
  },
  {
    path: 'add-company',
    component: AddCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaviAdminRoutingModule { }
