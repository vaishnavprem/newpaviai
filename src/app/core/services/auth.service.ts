import {Injectable} from '@angular/core';
import {API_URL} from '../constants/general';
import {HttpClient,HttpHeaders} from '@angular/common/http';

// JWT helper
import {JwtHelperService} from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';

import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
  }

  login(params) {
    return this.httpClient.post(`${API_URL}user/login`, params);
  }

  /**
   * Checks to see if user logged in/ token expired
   */
  loggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
  }

  /**
   * Checks current user roles
   * @param role passed role
   */
  checkRoles(role: string) {


    if (this.loggedIn()) {
      const userData = JSON.parse(localStorage.getItem('data'));
     return userData.roles;
    }
    return false;
  }

   logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    localStorage.removeItem('user_id');
     this.router.navigate(['/']);
  }

  register(params) {
    return this.httpClient.post(`${API_URL}user/register`, params);
  }
  requestDemo(params) {
    return this.httpClient.post(`${API_URL}user/request-demo`, params);
  }
}
