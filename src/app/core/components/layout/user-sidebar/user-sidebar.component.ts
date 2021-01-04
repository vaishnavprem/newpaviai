import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  public status: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }
}
