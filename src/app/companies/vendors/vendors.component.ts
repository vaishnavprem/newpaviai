import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  today: number = Date.now();
  public isLoder=false;

  constructor() { }

  ngOnInit(): void {
  }

}
