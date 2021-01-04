import { Component, OnInit,ViewChild } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
import {COUNTRY_LIST} from '../../core/constants/countries';
import { DatePipe } from '@angular/common';
import {UsersService} from '../../core/services/users.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  today: number = Date.now();
  public status: boolean = false;
  authUser;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private getAuthUser: GetAuthUserPipe,
    private usersService: UsersService,
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
  }
  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }
}
