import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../core/modules/material.module';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {GetAuthUserPipe} from './pipes/get-auth-user.pipe';
import {GetNavbarLinksBasedOnUserRolePipe} from './pipes/get-navbar-links-based-on-user-role.pipe';


@NgModule({
  declarations: [
    GetAuthUserPipe,
    GetNavbarLinksBasedOnUserRolePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CarouselModule
  ],
  providers: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CarouselModule
  ]
})
export class SharedModule {
}
