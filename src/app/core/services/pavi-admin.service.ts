import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {API_URL} from '../constants/general';
import {CommonService} from '../services/common.service';
@Injectable({
  providedIn: 'root'
})
export class PaviAdminService {
  constructor( private httpClient: HttpClient) {
   }
   getHeaders(){
    let accessToken = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+accessToken);
    return headers;
  }
  getComapnies(){
    return this.httpClient.post(`${API_URL}admin/company`,'', {headers:this.getHeaders()});
  }
  getUsers(){
    return this.httpClient.post(`${API_URL}admin/user`,'', {headers:this.getHeaders()});
  }
  updateCompany(params){
    return this.httpClient.post(`${API_URL}admin/company-update`, params,{headers:this.getHeaders()});
  }
  deleteCompany(params){
    return this.httpClient.post(`${API_URL}admin/delete-company`, params, {headers:this.getHeaders()});
  }
  getDashboardcount(){
    return this.httpClient.post(`${API_URL}admin/dashboard-count`,'', {headers:this.getHeaders()});
  }
  updateUser(params){
    return this.httpClient.post(`${API_URL}admin/user-update`, params);
  }
  getJobCategory(){
    return this.httpClient.post(`${API_URL}admin/job-category`,'', {headers:this.getHeaders()});
  }
  getJobTerms(){
    return this.httpClient.post(`${API_URL}admin/job-terms`,'', {headers:this.getHeaders()});
  }
  getCountry(){
    return this.httpClient.post(`${API_URL}admin/get-countries`,'');
  }
  getJobSpecialistLevel(){
    return this.httpClient.post(`${API_URL}admin/job-specialist-level`,'', {headers:this.getHeaders()});
  }
  saveobSpecialistLevel(params){
    return this.httpClient.post(`${API_URL}admin/save-job-specialist-level`,params, {headers:this.getHeaders()});
  }
  saveJobCategory(params){
    return this.httpClient.post(`${API_URL}admin/save-job-category`,params, {headers:this.getHeaders()});
  }

  saveJobTerms(params){
    return this.httpClient.post(`${API_URL}admin/save-job-terms`,params, {headers:this.getHeaders()});
  }
  saveCity(params){
    return this.httpClient.post(`${API_URL}admin/save-city`,params, {headers:this.getHeaders()});
  }
  updateJobTerms(params){
    return this.httpClient.post(`${API_URL}admin/edit-job-terms`,params, {headers:this.getHeaders()});
  }
  updateJobCategories(params){
    return this.httpClient.post(`${API_URL}admin/edit-job-category`,params, {headers:this.getHeaders()});
  }
  updateJobSpecialties(params){
    return this.httpClient.post(`${API_URL}admin/edit-job-specialist-level`,params, {headers:this.getHeaders()});
  }
}
