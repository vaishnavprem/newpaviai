import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public status: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  clickEvent(){
    this.status = !this.status;       
  }
}
