import { Component, OnInit } from '@angular/core';
import {GetAuthUserPipe} from '../../../../shared/pipes/get-auth-user.pipe';
import {AuthService} from '../../../../core/services/auth.service';
import {SearchService} from '../../../../core/services/search.service';

@Component({
  selector: 'app-user-dashboard-header',
  templateUrl: './user-dashboard-header.component.html',
  styleUrls: ['./user-dashboard-header.component.css']
})
export class UserDashboardHeaderComponent implements OnInit {
  authUser;
  constructor(
    private getAuthUser: GetAuthUserPipe,
    public auth: AuthService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.getSuggestion('');
    this.authUser = this.getAuthUser.transform();
  }

  public getSuggestion(name){
    this.searchService.getSuggestion(name);
  }

}
