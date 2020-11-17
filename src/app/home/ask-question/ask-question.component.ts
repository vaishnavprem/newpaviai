import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  public helpFlag = false;
  public findNewEmployee = false;
  public jobExp = true;

  constructor(   public router: Router) { }
public step1=false;
public step2 =true;
public step3 = false;
  ngOnInit(): void {
  }
  
  routeYes(routerLink){
    this.router.navigate(['/'+ routerLink ]);

  }

  helpJob(){
    this.helpFlag = true;
    this.jobExp = false;
    this.findNewEmployee = false;
  }
  newEmployee(){
    this.helpFlag = false;
    this.jobExp = false;
    this.findNewEmployee = true;
  }

  //This is for open find-new-employee component
  // openFindNewEmployee(){
  //   this.router.navigate(['/find-new-employee']);
  // }
}
