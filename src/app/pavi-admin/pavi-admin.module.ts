import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaviAdminRoutingModule } from './pavi-admin-routing.module';
import {CoreModule} from '../core/core.module';
import {AuthModule} from '../auth/auth.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CompanyComponent } from './company/company.component';
import { UsersComponent } from './users/users.component';
import { JobCategoryComponent } from './job-category/job-category.component';
import { JobTermComponent } from './job-term/job-term.component';
import { JobSpecialistComponent } from './job-specialist/job-specialist.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CityComponent } from './city/city.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MyEmployeeComponent } from './my-employee/my-employee.component';



@NgModule({
  declarations: [ AdminDashboardComponent, CompanyComponent, UsersComponent, JobCategoryComponent, JobTermComponent, JobSpecialistComponent, CountryListComponent, CityComponent, ProfileComponent, AddCompanyComponent, AddEmployeeComponent, MyEmployeeComponent],
  imports: [
    CommonModule,
    PaviAdminRoutingModule,
    CoreModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaviAdminModule { }
