
import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../core/services/users.service';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
import {API_URL, OWL_CAROUSEL_OPTIONS, EMAIL_PATTERN,
  NO_SPACE_PATTERN,
  TEXT_ONLY_PATTERN} from '../../core/constants/general';
import { PaviAdminService } from '../../core/services/pavi-admin.service';
import {ToastrService} from 'ngx-toastr';
import {patternValidator} from '../../core/helpers/pattern-validator';
import {COUNTRY_LIST} from '../../core/constants/countries';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import yesno from "yesno-dialog";
import {SearchService} from '../../core/services/search.service';

declare var $: any;

interface DemoRequest {
  company_name: string;
  company_address: string;
  contact_name: string;
  contact_number: string;
  contact_email: string;
  company_website: string;
  hiring:string;
}

@Component({
  selector: 'app-demo-request',
  templateUrl: './demo-request.component.html',
  styleUrls: ['./demo-request.component.css']
})
export class DemoRequestComponent implements OnInit {
  public companies:any[];
  public isLoder=false;
  companyForm: FormGroup;
  public status: boolean = false;
  public allcountries:any[];
  countries = COUNTRY_LIST;
  today: number = Date.now()

  public dataSourceOne;
  public displayedColumnsOne: string[];
  public request;

  public results = null;
  loadFlag = false;

  @ViewChild('TableOnePaginator', {static: false}) tableOnePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableOneSort: MatSort;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private paviAdminService:PaviAdminService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService,
    private searchService: SearchService,
  ) {
    this.dataSourceOne = new MatTableDataSource<DemoRequest>();
    this.displayedColumnsOne=['company_name', 'company_address', 'contact_name', 'contact_number','contact_email', 'company_website', 'hiring'];

    searchService.getResults$()
    .subscribe((resultList: any[])=> {
        this.results = resultList;
        if(this.results != '' && this.loadFlag){
          this.applyFilterOne(this.results);
        }else{
          this.applyFilterOne('');
        }
    });
   }

  ngOnInit(): void {
    this.getDemoRequest();
    this.loadFlag = true;
  }

  applyFilterOne(filterValue: string) {
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();
  }

  getDemoRequest(){
    this.isLoder=true;
    let demoData = this.paviAdminService.getDemoRequest()
    .subscribe((response : any) => {
      this.isLoder=false;
      if (response.statusCode == 200) {
        let latest = response['data']['requestData'].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        this.dataSourceOne.data =latest as DemoRequest[];
        this.dataSourceOne.paginator = this.tableOnePaginator;
        this.dataSourceOne.sort = this.tableOneSort;
        
        this.request = response['data']['requestData'];
        console.log("Request Data>>>>",response); 
      }  else if (response.statusCode == 401) {
        console.log(response.statusCode);
             this.toastr.error(response.message)
            this.auth.logOut();
            this.router.navigate(['auth/login',2]);
      } else {
         this.toastr.error(response.message)
      }
    });
    
  }

}
