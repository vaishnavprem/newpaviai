import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowJobComponent} from './show-job/show-job.component';
import {ApplyToJobComponent} from './apply-to-job/apply-to-job.component';
import {FindJobComponent} from './find-job/find-job.component';
import { SearchJobComponent } from './search-job/search-job.component';
const routes: Routes = [
  {
    path: 'show-job/:id',
    component: ShowJobComponent
  },
  {
    path: 'apply-to-job',
    component: ApplyToJobComponent
  },
  {
    path: 'find-job',
    component: FindJobComponent
  },

  {
    path: 'search-job',
    component: SearchJobComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule {
}
