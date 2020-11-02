import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../core/services/auth.service';
import {GetAuthUserPipe} from '../shared/pipes/get-auth-user.pipe';
import {HOMEPAGE_OWL_CAROUSEL_OPTIONS} from '../core/constants/general';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    authUser;
    owlOptions: OwlOptions = HOMEPAGE_OWL_CAROUSEL_OPTIONS;
    public showWelcomeText=false;
    constructor(
        public router: Router,
        public auth: AuthService,
        private getAuthUser: GetAuthUserPipe,
        private jwtHelper: JwtHelperService
    ) {
    }

    ngOnInit(): void {
        this.authUser = this.getAuthUser.transform();
        if(this.authUser){
        if(this.authUser.roles=='admin'){
             this.router.navigate(['pavi-admin/admin-dashboard']);
          } else if(this.authUser.roles=='company_user'){
             this.router.navigate(['companies/dashboard']);
          } 
        }
    }

    isTokenExpired() {
        return !this.jwtHelper.isTokenExpired();
    }
    showAboutPage(){
        this.router.navigate(['users/about']);
       /* this.showWelcomeText=true; 
        setTimeout(() => {
         this.router.navigate(['/help']);
     }, 5000)*/
     }
}
