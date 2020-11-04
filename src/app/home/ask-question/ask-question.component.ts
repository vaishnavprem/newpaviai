import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  public helpFlag = true;
  public findNewEmployee = false;

  constructor(   public router: Router) { }

  ngOnInit(): void {
  }
  
  routeYes(routerLink){
    this.router.navigate(['/'+ routerLink ]);

  }
  newEmployee(){
    this.helpFlag = false;
    this.findNewEmployee = true;
  }

  //This is for open find-new-employee component
  // openFindNewEmployee(){
  //   this.router.navigate(['/find-new-employee']);
  // }
}
