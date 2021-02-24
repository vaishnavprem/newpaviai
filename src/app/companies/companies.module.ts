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
//For Calender
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { MyEmployeeComponent } from './my-employee/my-employee.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ClipboardModule } from 'ngx-clipboard';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [
    DashboardJobsComponent,
    DasboardArchiveJobsComponent,
    JobCreationStep1Component,
    JobCreationStep2Component,
    JobCreationStep3Component,
    DashboardMoreArchiveJobsComponent,
    JobCreationStepperFormComponent,
    DashboardComponent,
    AddJobsComponent,
    ViewJobsComponent,
    AddQuestionComponent,
    ViewQuestionComponent,
    ApplicantsComponent,
    MyEmployeeComponent,
    MyProfileComponent,
    AddEmployeeComponent,
    VendorsComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    CoreModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ClipboardModule,
    RichTextEditorAllModule
  ],
  providers: [DatePipe]
})
export class CompaniesModule {
}
