import { Component, OnInit } from '@angular/core';
import {GetAuthUserPipe} from '../../../../shared/pipes/get-auth-user.pipe';
import {AuthService} from '../../../../core/services/auth.service';
import {SearchService} from '../../../../core/services/search.service';
import {CompaniesService} from '../../../../core/services/companies.service';
import {API_URL,AVATAR_URL, TEXT_ONLY_PATTERN,EMAIL_PATTERN,NO_SPACE_PATTERN} from '../../../../core/constants/general';
import {ToastrService} from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-dashboard-header',
  templateUrl: './company-dashboard-header.component.html',
  styleUrls: ['./company-dashboard-header.component.css']
})
export class CompanyDashboardHeaderComponent implements OnInit {
  authUser;
  profileImage = 'assets/images/no-profile.png';
  coverImage = 'assets/images/no-cover.png';
  postArry;
  companyData;

  constructor(
    private getAuthUser: GetAuthUserPipe,
    public auth: AuthService,
    private companiesService: CompaniesService,
    public router: Router,
    private toastr: ToastrService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.getSuggestion('');
    this.authUser = this.getAuthUser.transform();
    if(localStorage.getItem("user_id") != null){
      this.authUser.user_id = localStorage.getItem("user_id");
    }
    this.getCompanyData();
  }

  getCompanyData(){
    //let that=this;
    this.postArry = {
    user_id:this.authUser.user_id
  }
  this.companiesService.getCompanyData(this.postArry)
  .subscribe((response : any)=> {
    
    if (response.statusCode == 200) {

      //console.log("Company Data>>",response);
      this.companyData = response['data']['companydata'];
      if(this.companyData.logo_image!=undefined){
        this.profileImage= `${AVATAR_URL}uploads/avatars/${this.companyData.logo_image}`;
      }
    } else if (response.statusCode == 401) {
      this.toastr.error(response.message)
      this.auth.logOut();
      this.router.navigate(['auth/login',2]);
      }
      else this.toastr.error(response.message)
        
  });
}

public getSuggestion(name){
  this.searchService.getSuggestion(name);
}

}
