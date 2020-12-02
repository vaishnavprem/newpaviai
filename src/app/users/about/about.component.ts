import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
public showWelcomeText=false;
  constructor(public router: Router) { }

  ngOnInit(): void {
    document.getElementById('about').className ="active";
  }
  showWelcomePage(){
     this.router.navigate(['/welcome']);
 }
}
