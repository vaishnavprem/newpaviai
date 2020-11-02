import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  companyNameExists = false;
  constructor() { }
  getHeaders(){
    let accessToken = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+accessToken);
    return headers;
  }
}
