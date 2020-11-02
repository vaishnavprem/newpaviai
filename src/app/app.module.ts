import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {LoginComponent} from './auth/login/login.component';


import {AuthService} from './core/services/auth.service';
import {CommonService} from './core/services/common.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtModule} from '@auth0/angular-jwt';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from './core/helpers/http.interceptor';
import { FindJobComponent } from './jobs/find-job/find-job.component';
import {GetAuthUserPipe} from './shared/pipes/get-auth-user.pipe';
import {GetNavbarLinksBasedOnUserRolePipe} from './shared/pipes/get-navbar-links-based-on-user-role.pipe';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { AskQuestionComponent } from './home/ask-question/ask-question.component';
// Token getter for JWT module
export function tokenGetter() {
  return localStorage.getItem('token') || '';
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FindJobComponent,
    WelcomeComponent,
    AskQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    JwPaginationModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3000', 'localhost:3001'],
        blacklistedRoutes: ['localhost:3000/auth/']
      }
    }),
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    CarouselModule
  ],
  providers: [
    JwtHelperService,
    AuthService,
    CommonService,
    GetAuthUserPipe,
    GetNavbarLinksBasedOnUserRolePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
