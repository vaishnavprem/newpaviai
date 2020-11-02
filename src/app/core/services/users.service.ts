import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/general';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  uploadProfileImg(params) {
  //  return this.httpClient.post(`${API_URL}users/upload/avatar`, params);
  return this.httpClient.post(`${API_URL}companies/save-company-logo`, params);
  }

  uploadCoverImg(params) {
    return this.httpClient.post(`${API_URL}users/upload/cover`, params);
  }

  updateProfileInfo(params) {
    return this.httpClient.put(`${API_URL}users/change_PACG`, params);
  }

  changeEmail(params) {
    return this.httpClient.put(`${API_URL}users/change_email`, params);
  }

  changePassword(params) {
    return this.httpClient.put(`${API_URL}users/change_pass`, params);
  }

  changeAboutText(params) {
    return this.httpClient.put(`${API_URL}users/change_description`, params);
  }

  changePositionInfo(params) {
    return this.httpClient.put(`${API_URL}users/change-position-info`, params);
  }

  getAboutText(params) {
    return this.httpClient.get(`${API_URL}users/get_description`, params);
  }
}
