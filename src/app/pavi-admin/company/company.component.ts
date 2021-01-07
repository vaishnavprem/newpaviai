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

interface Company {
  name: string;
  address: string;
  country: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public companies:any[];
  public isLoder=false;
  companyForm: FormGroup;
  public status: boolean = false;
  public allcountries:any[];
  countries = COUNTRY_LIST;
  today: number = Date.now()

  public dataSourceOne;
  public displayedColumnsOne: string[];

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
  ) { 
    this.dataSourceOne = new MatTableDataSource<Company>();
    this.displayedColumnsOne=['name', 'address', 'country', 'phone','email','action'];
  }

  ngOnInit(): void {

    this.getComapnies();

    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      phone:['', Validators.required],
      email:['', Validators.required],
      first_name:['', Validators.required],
      last_name:['', Validators.required],
      status:['', Validators.required],

    });
  }

  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  applyFilterOne(filterValue: string) {
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();
  }

  getComapnies(){
    this.isLoder=true;
    let companData = this.paviAdminService.getComapnies()
    .subscribe((response : any) => {
      if (response.statusCode == 200) {
        this.dataSourceOne.data = response['data']['companies'] as Company[];
        setTimeout(() => {this.dataSourceOne.paginator = this.tableOnePaginator;
          this.dataSourceOne.sort = this.tableOneSort;
        });
        this.companies = response['data']['companies']; 
      }  else if (response.statusCode == 401) {
        console.log(response.statusCode);
             this.toastr.error(response.message)
            this.auth.logOut();
            this.router.navigate(['auth/login']);
      } else {
         this.toastr.error(response.message)
      }
    });
    this.isLoder=false;
  }

  updateCompany(){
    if(this.companyForm.valid){
      this.paviAdminService.updateCompany(this.companyForm.getRawValue()).subscribe(response => {
       this.getComapnies();
       this.toastr.success('Data updated suceesfully');
      });
      
      (<any>$(`#edit-modal-popup-company`)).modal('hide');
    } else {
     this.toastr.error('Please check all fields');
    }
  }

  editCompany(index){
    $("#edit-modal-popup-company").modal("show");
    $("#edit-modal-popup-company").appendTo("body");
    // let element = document.getElementById('edit-modal-popup-company');
    // element.className = 'modal fade in';
    this.companyForm.patchValue({
      name: this.companies[index].name,
      address: this.companies[index].address,
      country: this.companies[index].country,
      phone: this.companies[index].phone,
      email: this.companies[index].email,
      first_name: this.companies[index].first_name,
      last_name: this.companies[index].last_name,
      status: this.companies[index].status
    });
   }

}
