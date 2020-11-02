import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {CompaniesRoutingModule} from './companies-routing.module';
import {CoreModule} from '../core/core.module';
import {DashboardJobsComponent} from './dashboard/dashboard-jobs/dashboard-jobs.component';
import { DasboardArchiveJobsComponent } from './dashboard/dasboard-archive-jobs/dasboard-archive-jobs.component';
import { JobCreationStep1Component } from './dashboard/dashboard-jobs/job-creation-stepper-form/job-creation-step1/job-creation-step1.component';
import { JobCreationStep2Component } from './dashboard/dashboard-jobs/job-creation-stepper-form/job-creation-step2/job-creation-step2.component';
import { JobCreationStep3Component } from './dashboard/dashboard-jobs/job-creation-stepper-form/job-creation-step3/job-creation-step3.component';
import { DashboardMoreArchiveJobsComponent } from './dashboard/dashboard-more-archive-jobs/dashboard-more-archive-jobs.component';
import { JobCreationStepperFormComponent } from './dashboard/dashboard-jobs/job-creation-stepper-form/job-creation-stepper-form.component';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardJobsComponent,
    DasboardArchiveJobsComponent,
    JobCreationStep1Component,
    JobCreationStep2Component,
    JobCreationStep3Component,
    DashboardMoreArchiveJobsComponent,
    JobCreationStepperFormComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [DatePipe]
})
export class CompaniesModule {
}
