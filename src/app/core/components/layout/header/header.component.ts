import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public status: boolean = false;
  constructor( public router: Router) { }

  ngOnInit(): void {
  }
  clickEvent(){
    this.status = !this.status;       
  }

  // goToPage(routerLink){
  //   this.router.navigate(['/'+ routerLink ]);
  // }
}
