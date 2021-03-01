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
import {SearchService} from '../../core/services/search.service';
import yesno from "yesno-dialog";

declare var $: any;

interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users:any[];
  public allcountries:any[];
  public  show = true;
  public isLoder=false;
  userForm: FormGroup;
  countries = COUNTRY_LIST;
  public status: boolean = false;
  today: number = Date.now()

  public dataSourceTwo;
  public displayedColumnsTwo: string[];

  public results = null;
  loadFlag = false;
  singleUser;
  postArry;

  @ViewChild('TableTwoPaginator', {static: false}) tableTwoPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableTwoSort: MatSort;

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
    this.dataSourceTwo = new MatTableDataSource<User>();
    this.displayedColumnsTwo=['first_name', 'last_name', 'email','action'];

    searchService.getResults$()
    .subscribe((resultList: any[])=> {
        this.results = resultList;
        if(this.results != '' && this.loadFlag){
          this.applyFilterTwo(this.results);
        }else{
          this.applyFilterTwo('');
        }
    });
   }

  ngOnInit(): void {

    this.getUsers();
    this.loadFlag = true;
   
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],
      last_name: ['', Validators.required],
      //gender: ['', Validators.required],
      email:['', Validators.required],
      status:['', Validators.required],

    });
  }

  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  applyFilterTwo(filterValue: string) {
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();
  }

  getUsers(){
    this.isLoder=true;
    let userData = this.paviAdminService.getUsers()
    .subscribe(response => {
      this.isLoder=false;
      this.dataSourceTwo.data = response['data']['users'] as User[];
      setTimeout(() => {this.dataSourceTwo.paginator = this.tableTwoPaginator;
        this.dataSourceTwo.sort = this.tableTwoSort;
      });
      this.users = response['data']['users']; 
    });
    
   }

   editUser(index){
     //console.log("Index>>",index);
    $("#edit-modal-popup-user").modal("show");
    $("#edit-modal-popup-user").appendTo("body");
    this.singleUser = this.users.find(x => x.id === index)
    // let element = document.getElementById('edit-modal-popup-user');
    // element.className = 'modal fade in';
    this.userForm.patchValue({
      email: this.singleUser.email,
      first_name: this.singleUser.first_name,
      last_name: this.singleUser.last_name,
      //gender: this.singleUser.gender,
      status: this.singleUser.status
    });
   }

   updateUser(){
    if(this.userForm.valid){
      this.paviAdminService.updateUser(this.userForm.getRawValue()).subscribe(response => {
       this.getUsers();
       this.toastr.success('Data Updated Successfully');
      });
      
      (<any>$(`#edit-modal-popup-user`)).modal('hide');
    } else {
     this.toastr.error('Please check all fields');
    }
  }

  async deleteUser(user_id){
    const yes = await yesno();
     if(yes){
      this.postArry = {
        user_id:user_id
      }
      this.paviAdminService.deleteUser(this.postArry).subscribe(response => {
        this.getUsers();
        this.toastr.success('Data deleted Successfully');
       });
    }
  }

}
