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

declare var $: any;

interface Country {
  country_name: string;
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  public allcountries:any[];
  public  show = true;
  public isLoder=false;
  cityForm: FormGroup;
  countryForm: FormGroup;
  addCountryForm: FormGroup;
  countries = COUNTRY_LIST;
  today: number = Date.now()
  public status: boolean = false;

  public dataSourceSix;
  public displayedColumnsSix: string[];

  @ViewChild('TableSixPaginator', {static: false}) tableSixPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableSixSort: MatSort;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private paviAdminService:PaviAdminService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService,
  ) { 
    this.dataSourceSix = new MatTableDataSource<Country>();
    this.displayedColumnsSix=['country_name','action'];
  }

  ngOnInit(): void {

    this.addCity();

    this.cityForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
      country_id: ['', Validators.required],
  
      });

      this.countryForm = this.fb.group({
        countryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
  
      });
  
      this.addCountryForm = this.fb.group({
        countryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
  
      });
  }

  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  getCountries(){
    this.isLoder=true;
    let JobData = this.paviAdminService.getCountry()
    .subscribe(response => {
      //console.log("Job Specialty>>>",response['data']['countries']);
      this.dataSourceSix.data = response['data']['countries'] as Country[];
      setTimeout(() => {this.dataSourceSix.paginator = this.tableSixPaginator;
        this.dataSourceSix.sort = this.tableSixSort;
      });
      this.allcountries = response['data']['countries'];  
    });
    this.isLoder=false;
  }
  addCity(){
    this.getCountries();
  }

  saveCity(){
    if(this.cityForm.valid){
     
        this.paviAdminService.saveCity(this.cityForm.getRawValue()).subscribe((response : any) => {
          if(response.statusCode==200){
            this.cityForm.reset();
            this.toastr.success('Data added suceesfully');
          } else {
            this.toastr.error(response.message)
          }
         });
    } else {
      this.toastr.error('Please check all fields');
    }
  }

}
