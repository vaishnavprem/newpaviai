import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../core/services/users.service';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
import {API_URL, OWL_CAROUSEL_OPTIONS} from '../../core/constants/general';
import {ToastrService} from 'ngx-toastr';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
interface User {
  jobTitle: string;
}
@Component({
  selector: 'app-user-interview',
  templateUrl: './user-interview.component.html',
  styleUrls: ['./user-interview.component.css']
})
export class UserInterviewComponent implements OnInit {
  safeUrl: any;

  today: number = Date.now();
  public status: boolean = false;
  public isLoder=false;
  authUser;
  public userquestions:any;
  public dataSourceOne;
  public displayedColumnsOne: string[];
  public postArry:{};
  public nextIndex = 0;
  public questionLenth = 0;
  public firstQuestion:any;
  @ViewChild('TableOnePaginator', {static: false}) tableOnePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableOneSort: MatSort;
  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) { 
    this.dataSourceOne = new MatTableDataSource<User>();
    this.displayedColumnsOne=['jobTitle','created_at','action'];
  }

  ngOnInit(): void {
    this.isLoder=true;
    this.authUser = this.getAuthUser.transform();
    this.usersService.getJobsUser({
      user_id:this.authUser.user_id
    })
  .subscribe((response: any) => {
    this.isLoder=false;
    let latest = [];
    if(response.statusCode == 200){
      latest = response['data']['user'].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.dataSourceOne.data = latest as User[];
      this.dataSourceOne.paginator = this.tableOnePaginator;
        this.dataSourceOne.sort = this.tableOneSort;
        // this.allusers = response['data']['user'];
        
      //console.log(response);
    } else {
      this.toastr.error(response.message);
    }
    
  });
  
  }
  stopPlayer(){
    console.log("Player Stopped");
      var memory = $('#add-modal-candidate .modal-body .select-your-job').html();
      $('#add-modal-candidate .modal-body .select-your-job').html("");
      this.userquestions = '';
      this.firstQuestion = '';
      this.nextIndex = 0;
      this.questionLenth = 0;
  }
  
  applyFilterOne(filterValue: string) {
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();
  }
  getSafeUrl(url){
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
  }
  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }
  showCandidateAnswers(element){
    this.isLoder=true;
    //console.log("Element",element);
    let parmsa ={
      interview_id:element.interview_id
    }
    this.usersService.showQuestionAnswer(parmsa)
    .subscribe((response : any) => {
      
      if (response.statusCode == 200) {
          this.userquestions = response['data']['question'];
          this.isLoder=false; 
          $("#add-modal-candidate").modal("show");
         console.log("User Answer>>",response);
         this.firstQuestion = response['data']['question'][0];
         this.questionLenth = response['data']['question'].length;
      } else {
        this.isLoder=false;
        this.toastr.error(response.message);
      }
      
    });
 }

 nextQuestion(){
  this.nextIndex = this.nextIndex+1;
  this.firstQuestion = this.userquestions[this.nextIndex];
}

previousQoestion(){
  this.nextIndex = this.nextIndex-1;
  this.firstQuestion = this.userquestions[this.nextIndex];
}


}
