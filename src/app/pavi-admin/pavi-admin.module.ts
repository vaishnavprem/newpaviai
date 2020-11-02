import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaviAdminRoutingModule } from './pavi-admin-routing.module';
import {CoreModule} from '../core/core.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [ AdminDashboardComponent],
  imports: [
    CommonModule,
    PaviAdminRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaviAdminModule { }
