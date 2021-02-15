import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  public showWelcomeText=false;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  showWelcomePage(){
    this.router.navigate(['/welcome']);
}
}
