import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pavi';

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {

    this.router.events.pipe(map(() => {
      let child = this.route.firstChild;
      while (child) {
        if (child.firstChild) {
          child = child.firstChild;
        } else if (child.snapshot.data) {
          return child.snapshot;
        } else {
          return null;
        }
      }
      return null;
    })).subscribe(data => {
      if (data) {
    /*    const token = data.queryParams.token;
        if (token) {
          localStorage.setItem('token', token);
          if (this.jwtHelper.isTokenExpired()) {
            this.toastr.error('The session has been expired.', 'Please log in again.');
          }
        }*/


      }
    });
  }

  checkIfDashboardPage() {
    //return /admin|companies/.test(this.router.url);
 // return /companies/.test(this.router.url);
  }
  checkIfFotterVisiable() {
    //return /admin|companies/.test(this.router.url);
  return /pavi-admin|users|companies/.test(this.router.url);
  }
  getMode() {

    if (this.responsiveMode && screen.width < 1060 && !this.router.url.includes('auth')) {
      return 'over';
    } else {
      return 'side';
    }
  }

  get responsiveMode() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
