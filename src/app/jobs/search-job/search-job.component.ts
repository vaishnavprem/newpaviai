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
declare function typingEffect(params1, param2): any;
declare function typewriterSearch(params1, param2): any;

declare function panTo(coords): any;
declare function geocodeAddress(value): any;


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

  formattedaddress=" "; 
  options={ 
    componentRestrictions:{ 
      country:["us"] 
    } 
  } 

  constructor(public router: Router,
    private companiesService: CompaniesService,
    private toastr: ToastrService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    initialize();
    // typingEffect("I will help you find an opportunity in your area, please share your location","searchText");
    typewriterSearch("Search","searchText");
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
    //let that = this;

    //pass value is id for navigate
    //  this.router.navigate(['jobs/find-job']);
    //this.router.navigate(['jobs/find-job'],{ queryParams: { cityId: value } })
    //const city = this.locationSearchData.find( ({ city }) => city === value );
    
    //console.log(city);
    //geocodeAddress(city.city);
    // setTimeout(function(){ that.router.navigate(['jobs/find-job'],{ queryParams: { cityId: city.id } }) }, 10000);
    
  }

  onCheckboxChecked(e){
    if(e.target.checked){      
      this.router.navigate(['jobs/find-job'])  
    }
  }
  
  public AddressChange(address: any) {
    let cityName;
    let state; 
    //setting address from API to local variable 
     this.formattedaddress=address.formatted_address;
      console.log("Address is ",address);
     let arr = [address.geometry.location.lat(),address.geometry.location.lng()];
     panTo(arr);

     for (let i = 0; i < address.address_components.length; i++) {
      let fullAddress = address.address_components[i];
      if(fullAddress.types[0] == "locality"){
        cityName = fullAddress.long_name;
      }
      if(fullAddress.types[0] == "administrative_area_level_1"){
        state = fullAddress.short_name;
      }
     }
    
     setTimeout(() => { this.router.navigate(['jobs/find-job'],{ queryParams: { city: cityName, state_code:state} }) }, 10000);
  } 
  
}
