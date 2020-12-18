import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { ShowJobComponent } from './show-job/show-job.component';
import {CoreModule} from '../core/core.module';
import { ApplyToJobComponent } from './apply-to-job/apply-to-job.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchJobComponent } from './search-job/search-job.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
@NgModule({
  declarations: [ShowJobComponent, ApplyToJobComponent, SearchJobComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    CoreModule,
    Ng2SearchPipeModule,
    JwPaginationModule,
    NgxPaginationModule,
    GooglePlaceModule
  ]
})
export class JobsModule { }
