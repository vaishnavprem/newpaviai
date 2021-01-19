import { Component, OnInit } from '@angular/core';
import {GetAuthUserPipe} from '../../../../shared/pipes/get-auth-user.pipe';

@Component({
  selector: 'app-company-sidebar',
  templateUrl: './company-sidebar.component.html',
  styleUrls: ['./company-sidebar.component.css']
})
export class CompanySidebarComponent implements OnInit {
  public status: boolean = false;
  public authUser;
  roles;
  constructor(
    private getAuthUser: GetAuthUserPipe,
  ) { }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    this.roles = this.authUser.roles;
    //console.log("Auth user At Company Sidebar",this.authUser);
  }

  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }
}
