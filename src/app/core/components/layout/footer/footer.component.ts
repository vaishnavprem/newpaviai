import {Component, OnInit} from '@angular/core';
import {Data, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {NAVBAR_LINKS} from '../../../constants/general';
import {AuthService} from "../../../services/auth.service";
import {GetAuthUserPipe} from '../../../../shared/pipes/get-auth-user.pipe';
import {GetNavbarLinksBasedOnUserRolePipe} from '../../../../shared/pipes/get-navbar-links-based-on-user-role.pipe';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  routerUrl;
  footerLinks
  authUser;

  constructor(
    public router: Router,
    public auth: AuthService,
    private getAuthUser: GetAuthUserPipe,
    private getNavbarLinks: GetNavbarLinksBasedOnUserRolePipe
  ) {
  }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();

    if (this.auth.loggedIn()) {
      this.footerLinks = this.getNavbarLinks.transform(NAVBAR_LINKS);
    }
    else {
      this.footerLinks = NAVBAR_LINKS;
    }
  }

  goToLoginPage() {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['auth/login']);
    }
  }

}
