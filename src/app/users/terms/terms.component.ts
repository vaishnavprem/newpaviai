import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  public showWelcomeText=false;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  showWelcomePage(){
    this.router.navigate(['/welcome']);
}

}
