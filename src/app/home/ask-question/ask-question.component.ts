import { Component, OnInit, AfterViewInit  } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

declare function typewriter(params1, param2): any;
//declare function typingEffect(params1, param2): any;

  
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit, AfterViewInit  {
  
  public helpFlag = false;
  public findNewEmployee = false;
  public jobExp = true;
  private sub: any;
  status;

  constructor(   public router: Router,private route: ActivatedRoute) { }
  public step1=false;
  public step2 =true;
  public step3 = false;
  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => { 
      this.status = params['status'] || null; 
    });
    //console.log("Status>>>",this.status);
  }

  ngAfterViewInit(){
    if(this.helpFlag == true){
      console.log("HelpFlag");
      // typingEffect('Can I help you explore new opportunities?', 'css-typing');
    }
  }
  
  routeYes(routerLink){
    if(this.status == 'login'){
      this.router.navigate(['auth/login',1]);
    }else{
      this.router.navigate(['/'+ routerLink ]);
    }
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
    //typingEffect('Can I help you find a New Employee?', 'welcome-info');
  }

  //This is for open find-new-employee component
  // openFindNewEmployee(){
  //   this.router.navigate(['/find-new-employee']);
  // }
}
