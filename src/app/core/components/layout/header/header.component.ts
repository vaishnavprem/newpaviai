import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public status: boolean = false;
  constructor( public router: Router,public auth: AuthService) { }

  ngOnInit(): void {
  }
  clickEvent(){
    this.status = !this.status;       
  }

  // goToPage(routerLink){
  //   this.router.navigate(['/'+ routerLink ]);
  // }
}
