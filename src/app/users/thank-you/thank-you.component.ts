import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CompaniesService} from '../../core/services/companies.service';
import {ToastrService} from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
public companyName;
  constructor( public router: Router,
    private companiesService: CompaniesService,
    private toastr: ToastrService,
    private getAuthUser: GetAuthUserPipe,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyName = params['company'];
      console.log(this.companyName);
    });
  }
  gotoSearchPage(){
  
    this.router.navigate(['jobs/search-job'])  

}
}
