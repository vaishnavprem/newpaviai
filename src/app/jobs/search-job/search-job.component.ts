import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {CompaniesService} from '../../core/services/companies.service';
import {ToastrService} from 'ngx-toastr';
import { Subject ,Observable} from 'rxjs';
import {API_URL,AVATAR_URL} from '../../core/constants/general';
import { map, tap, takeUntil,startWith} from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {COUNTRY_LIST} from '../../core/constants/countries';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
declare var $: any;
declare function initialize(): any;
// declare function typewriterSearch(params1, param2): any;
declare function typingEffect(params1, param2): any;


@Component({
  selector: 'app-search-job',
  templateUrl: './search-job.component.html',
  styleUrls: ['./search-job.component.css']
})
export class SearchJobComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public isLoder=false;
  public searchArray={}
  public country=[];
  public city =[];
  public jobSearchData;
  public locationSearchData;
  constructor(public router: Router,
    private companiesService: CompaniesService,
    private toastr: ToastrService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    initialize();
    typingEffect("I will help you find an opportunity in your area, please share your location","searchText");
  }
  onKeyUp(event: any,serachTerm) { // without type info
    if(event.target.value.length > 2 && event.target.value){
     this.isLoder=true;
     if(serachTerm=='keyword'){
       this.searchArray ={
         keyword:event.target.value
       }
     }
     if(serachTerm=='location'){
       this.searchArray ={
         location:event.target.value,
         'country':this.country
       }
     }
     let JobData = this.companiesService.searchJob(this.searchArray)
       .pipe(takeUntil(this.destroy$))
       .subscribe(response => {
         this.isLoder=false;
         if(serachTerm=='keyword'){
         this.jobSearchData = response['data']['jobs'];
         }
         if(serachTerm=='location'){
           this.locationSearchData=response['data']['cities'];
         }
       });
     } else {
       this.jobSearchData =[];
     }
   }
 
  getLocation(value){
  //  this.router.navigate(['jobs/find-job']);
    this.router.navigate(['jobs/find-job'],{ queryParams: { cityId: value } })
  }

  onCheckboxChecked(e){
    if(e.target.checked){      
      this.router.navigate(['jobs/find-job'],{ queryParams: { cityId: 0 } })  
    }
  }
}
