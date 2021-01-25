import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {API_URL} from '../constants/general';
@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
public header;
authUser;
  constructor(
    private httpClient: HttpClient,
  ) {
  }
  getHeaders(){
    let accessToken = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+accessToken);
    return headers;
  }
  register(params) {
    return this.httpClient.post(`${API_URL}companies/register`, params);
  }

  checkCompanyName(params) {
    return this.httpClient.post(`${API_URL}companies/check-name`, {params});
  }
  saveEmployment(params){
    return this.httpClient.post(`${API_URL}companies/save-employment`, params,{headers:this.getHeaders()});
  }
  getEmployment(params){
    return this.httpClient.post(`${API_URL}companies/get-employment`,params,{headers:this.getHeaders()});
  }
  saveSeniority(params){
    return this.httpClient.post(`${API_URL}companies/save-seniority`, params,{headers:this.getHeaders()});
  }
  getSeniority(params){
    return this.httpClient.post(`${API_URL}companies/get-seniority`,params,{headers:this.getHeaders()});
  }

  saveResponsibility(params){
    return this.httpClient.post(`${API_URL}companies/save-responsibility`,params,{headers:this.getHeaders()});
  }

  saveRequirements(params){
    return this.httpClient.post(`${API_URL}companies/save-requirements`,params,{headers:this.getHeaders()});
  }
  getResponsibility(params){
    return this.httpClient.post(`${API_URL}companies/get-responsibility`,params,{headers:this.getHeaders()});

  }
  getRequirements(params){
    return this.httpClient.post(`${API_URL}companies/get-requirements`,params,{headers:this.getHeaders()});
  }
  saveJobs(params){
    return this.httpClient.post(`${API_URL}companies/save-job`, params,{headers:this.getHeaders()});
  }

  getJobs(params){
    return this.httpClient.post(`${API_URL}companies/get-jobs`, params,{headers:this.getHeaders()});
  }
  editJobs(params){
    return this.httpClient.post(`${API_URL}companies/edit-job`, params,{headers:this.getHeaders()});
  }

  deleteJob(params){
    return this.httpClient.post(`${API_URL}companies/delete-job`, params,{headers:this.getHeaders()});
  }
  saveQuestion(params){
    return this.httpClient.post(`${API_URL}companies/save-question`, params,{headers:this.getHeaders()});
  }

  showQuestion(params){
    return this.httpClient.post(`${API_URL}companies/show-question`, params,{headers:this.getHeaders()});
  }
  deleteQuestion(params){
    return this.httpClient.post(`${API_URL}companies/questions-delete`, params,{headers:this.getHeaders()});
  }
   getCompanyData(params){
    return this.httpClient.post(`${API_URL}companies/get-companyinfo`, params,{headers:this.getHeaders()});
  }
  updateProfileInfo(params){
    return this.httpClient.post(`${API_URL}companies/change-profile`, params);
  }
  getAllGobs(){
    return this.httpClient.post(`${API_URL}companies/get-alljobs`,'');
  }
  searchJob(params){
    return this.httpClient.post(`${API_URL}companies/search-job`,params);
  }
  uploadProfileImg(params){
    return this.httpClient.post(`${API_URL}companies/save-company-logo`, params,{headers:this.getHeaders()});
  }
  getJobData(params){
    return this.httpClient.post(`${API_URL}companies/get-job-data`,params);
  }

  recordAnswer(params){
    return this.httpClient.post(`${API_URL}companies/record-question-answer`, params,{headers:this.getHeaders()});
  }

  showQuestionAnswer(params){
    return this.httpClient.post(`${API_URL}companies/show-question-answer`, params,{headers:this.getHeaders()});
  }
  getJobsUser(params){
    return this.httpClient.post(`${API_URL}companies/get-jobs-user`, params,{headers:this.getHeaders()}); 
  }
  saveInterview(params){
    return this.httpClient.post(`${API_URL}companies/save-interview`, params,{headers:this.getHeaders()}); 
  }
  updateInterview(params){
    return this.httpClient.post(`${API_URL}companies/update-interview`, params,{headers:this.getHeaders()}); 
  }
  employeeRegister(params) {
    return this.httpClient.post(`${API_URL}companies/emp-register`, params,{headers:this.getHeaders()});
  }
  updateEmployee(params) {
    return this.httpClient.post(`${API_URL}companies/edit-employee`, params,{headers:this.getHeaders()});
  }
  deleteEmployee(params) {
    return this.httpClient.post(`${API_URL}companies/delete-employee`, params,{headers:this.getHeaders()});
  }
  getEmployee(params) { 
    return this.httpClient.post(`${API_URL}companies/get-employee`, params,{headers:this.getHeaders()});
  }

  saveFeedback(params){
    return this.httpClient.post(`${API_URL}companies/save-rating`, params,{headers:this.getHeaders()}); 
  }

  saveFinalDecision(params){
    return this.httpClient.post(`${API_URL}companies/save-interview-status`, params,{headers:this.getHeaders()}); 
  }
}
