import {Component, OnInit, AfterViewInit} from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare function typewriterSearch(params1, param2): any;
@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.css']
})
export class FindJobComponent implements OnInit, AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  options: string[];
  term: string;
  categoryName:string;
  jobsepecilistName:string;
  employmentName:string;
  levelyName:string;
  cityName:string;
  profileImage = 'assets/images/no-profile.png';
  coverImage = 'assets/images/no-cover.png';
  filteredOptions: Observable<string[]>;
  pageOfItems: Array<any>;
  public jobs;
  public jobSearchData;
  public locationSearchData;
  public categories;
  public sepecilistlevel;
  public employments;
  public levels;
  public isLoder=false;
  public country=[];
  public city =[];
  public category =[];
  public level =[];
  public employment =[];
  countries=[];
  cities=[];
  public searchArray={}
  public checkedList= {
  
  }
  public location;
  public state_code;
  searchForm: FormGroup;
  config: any;
  public avatar_url= AVATAR_URL;
  private sub: any;
  public singleJob;
  public stateData;
  public selectedCity;
  constructor(
    public router: Router,
    private companiesService: CompaniesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    for(let country of COUNTRY_LIST){
      this.countries.push({'name':country})
    }
    
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(2)]],
      location: [''],

    });
    this.sub = this.route.queryParams.subscribe(params => {
      console.log(params);
      this.location = params['city'];
      this.state_code = params['state_code'];
      this.checkedList = {
        'city':this.location,
        'state_code':this.state_code
      }
      this.isLoder=true;
      let JobData = this.companiesService.searchJob(this.checkedList)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.isLoder=false;
        this.jobs = response['data']['jobs'];
        this.singleJob = response['data']['cityData'];
        this.stateData = response['data']['stateData'];
        if(this.singleJob[0]){
          this.selectedCity = this.singleJob[0].id
        }
      //  console.log("Single City", this.singleJob );
      //  console.log("All City",  this.stateData );
      });
    });
    
     setTimeout(()=>{$( "option[value="+this.selectedCity+"]" ).prop( 'selected', 'selected' );$('.selectpicker').selectpicker('refresh');$(".dropdown-toggle").append("<span class='bs-caret'><span class='caret'></span></span>");$(".bootstrap-select .dropdown-menu show").css("width","290px !important"); }, 3000);
  }

  ngAfterViewInit(){
    console.log("AfterViewInit Called");
    typewriterSearch('Find-job', 'findJobText');
    // $('.selectpicker').selectpicker('refresh');
    // $(".dropdown-toggle").append("<span class='bs-caret'><span class='caret'></span></span>");
    // $(".dropdown-menu").css("min-width","290px !important");
  }
  
 async getJobs(){
    this.isLoder=true;
    let JobData = await this.companiesService.getAllGobs()
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      this.isLoder=false;
      this.jobs = response['data']['jobs'];
      this.categories = response['data']['categories'];
      this.sepecilistlevel = response['data']['sepecilistlevel'];
      this.employments = response['data']['employment'];
      this.levels = response['data']['level'];
      this.config['totalItems']=this.jobs.length;
    });
    
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
  findJob(){
    if(this.searchForm.valid){
      this.isLoder=true;
      let JobData = this.companiesService.searchJob({keyword:this.searchForm.get('keyword').value})
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.isLoder=false;
        this.jobs = response['data']['jobs'];
      });
      
    } else {
      this.toastr.error("provide search key word");
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  onCheckboxChange(value,option, event) {
    
    if(event.target.checked) {
      if(option=='country'){
        this.country.push(value);
      } else if(option=='city'){
        this.city.push(value);
      } else if(option=='category'){
        this.category.push(value);
      } else if(option=='level'){
        this.level.push(value);
      } else if(option=='employment'){
        this.employment.push(value);
      }
     
    } else {
      if(option=='country'){
          for(var i=0 ; i < this.country.length; i++) {
            if(this.country[i] == value) {
              this.country.splice(i,1);
          }
        }
      } else if(option=='city'){
        for(var i=0 ; i < this.city.length; i++) {
          if(this.city[i] == value) {
            this.city.splice(i,1);
        }
      }
      } else if(option=='category'){
        for(var i=0 ; i < this.category.length; i++) {
          if(this.category[i] == value) {
            this.category.splice(i,1);
        }
      }
      } else if(option=='level'){
        for(var i=0 ; i < this.level.length; i++) {
          if(this.level[i] == value) {
            this.level.splice(i,1);
        }
      }
      } else if(option=='employment'){
        for(var i=0 ; i < this.employment.length; i++) {
          if(this.employment[i] == value) {
            this.employment.splice(i,1);
        }
      }
      }
    }
    this.checkedList= {
      'city':this.city,
      'country':this.country,
      'category':this.category,
      'keyword':this.searchForm.get('keyword').value,
      'level':this.level,
      'employment':this.employment
    }

    this.isLoder=true;
    let JobData = this.companiesService.searchJob(this.checkedList)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      this.isLoder=false;
      this.jobs = response['data']['jobs'];
    });
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  
  changeCity(value){
    if(value == 'All'){
      value = 0;
    }
      setTimeout(()=>{$( "option[value="+this.selectedCity+"]" ).prop( 'selected', 'selected' );$('.selectpicker').selectpicker('refresh');$(".bootstrap-select .dropdown-menu show").css("width","290px !important"); },3000);
       this.router.navigate(['jobs/find-job'],{ queryParams: { city: value ,state_code:this.state_code} })
    
  }
}
