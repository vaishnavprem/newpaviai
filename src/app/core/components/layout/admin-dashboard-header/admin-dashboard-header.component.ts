import { Component, OnInit } from '@angular/core';
import {GetAuthUserPipe} from '../../../../shared/pipes/get-auth-user.pipe';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-header',
  templateUrl: './admin-dashboard-header.component.html',
  styleUrls: ['./admin-dashboard-header.component.css']
})
export class AdminDashboardHeaderComponent implements OnInit {
  authUser;
  
  constructor(
    private getAuthUser: GetAuthUserPipe,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
  }

}
