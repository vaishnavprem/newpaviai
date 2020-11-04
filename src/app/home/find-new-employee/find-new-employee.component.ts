import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-find-new-employee',
  templateUrl: './find-new-employee.component.html',
  styleUrls: ['./find-new-employee.component.css']
})
export class FindNewEmployeeComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }
  //This is for EmployeeSignUp Component
  openEmployeeSignUp(){
    this.router.navigate(['/employee-sign-up']);
  }

}
