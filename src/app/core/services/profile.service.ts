import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/general';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  addWorkExperience(params) {
    return this.httpClient.post(`${API_URL}cv/work`, params);
  }

  updateWorkExperience(params) {
    return this.httpClient.put(`${API_URL}cv/work_update`, params);
  }

  getWorkExperience(params) {
    return this.httpClient.get(`${API_URL}cv/work_get`, {params});
  }

  removeWorkExperience(params) {
    return this.httpClient.delete(`${API_URL}cv/work_delete`, {params});
  }

  addEducation(params) {
    return this.httpClient.post(`${API_URL}cv/education`, params);
  }

  getEducationInfo(params) {
    return this.httpClient.get(`${API_URL}cv/education_get`, {params});
  }

  updateEducationInfo(params) {
    return this.httpClient.put(`${API_URL}cv/education_update`, params);
  }

  removeEducationInfo(params) {
    return this.httpClient.delete(`${API_URL}cv/education_delete`, {params});
  }


  addSkills(params) {
    return this.httpClient.post(`${API_URL}cv/skill`, params);
  }

  getSkillsInfo(params) {
    return this.httpClient.get(`${API_URL}cv/skill_get`, {params});
  }

  updateSkillsInfo(params) {
    return this.httpClient.put(`${API_URL}cv/skill_update`, params);
  }

  removeSkillsInfo(params) {
    return this.httpClient.delete(`${API_URL}cv/skill_delete`, {params});
  }

  addCertification(params) {
    return this.httpClient.post(`${API_URL}cv/certification`, params);
  }


  getCertifications(params) {
    return this.httpClient.get(`${API_URL}cv/certification_get`, {params});
  }

  updateCertifications(params) {
    return this.httpClient.put(`${API_URL}cv/certification_update`, params);
  }

  removeCertification(params) {
    return this.httpClient.delete(`${API_URL}cv/certification_delete`, {params});
  }


}
