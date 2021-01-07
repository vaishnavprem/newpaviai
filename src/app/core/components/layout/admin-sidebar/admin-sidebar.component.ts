import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  public status: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

}
