import {Pipe, PipeTransform} from '@angular/core';
import jwtDecode from 'jwt-decode';

@Pipe({
  name: 'getAuthUser'
})
export class GetAuthUserPipe implements PipeTransform {

  transform(): unknown {
    const token = localStorage.getItem('token');
    if (token) {
      const loginData = JSON.parse(localStorage.getItem('data'));
      return loginData;
    }
  }

}
