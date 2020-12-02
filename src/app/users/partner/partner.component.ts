import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    document.getElementById('partner').className ="active";
  }
  showWelcomePage(){
    this.router.navigate(['/welcome']);
}
}
