import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare function typewriter(params1, param2): any;

  
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
    typewriter("Employee","seekertext"); // Js Methode For Typing Effect
  }
  newEmployee(){
    this.helpFlag = false;
    this.jobExp = false;
    this.findNewEmployee = true;
    typewriter("Employer", "employertext"); // Js Methode For Typing Effect
  }

  //This is for open find-new-employee component
  // openFindNewEmployee(){
  //   this.router.navigate(['/find-new-employee']);
  // }
}
