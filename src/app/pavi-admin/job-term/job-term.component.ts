import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../core/services/users.service';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
import {API_URL, OWL_CAROUSEL_OPTIONS, EMAIL_PATTERN,
  NO_SPACE_PATTERN,
  TEXT_ONLY_PATTERN} from '../../core/constants/general';
import { PaviAdminService } from '../../core/services/pavi-admin.service';
import {ToastrService} from 'ngx-toastr';
import {patternValidator} from '../../core/helpers/pattern-validator';
import {COUNTRY_LIST} from '../../core/constants/countries';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

declare var $: any;

interface JobTerm {
  term: string;
}

@Component({
  selector: 'app-job-term',
  templateUrl: './job-term.component.html',
  styleUrls: ['./job-term.component.css']
})
export class JobTermComponent implements OnInit {
  public terms:any[];
  public  show = true;
  public isLoder=false;
  termsForm: FormGroup;
  jobTermForm: FormGroup;
  countries = COUNTRY_LIST;
  today: number = Date.now()
  public status: boolean = false;

  public dataSourceFour;
  public displayedColumnsFour: string[];

  @ViewChild('TableFourPaginator', {static: false}) tableFourPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableFourSort: MatSort;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private paviAdminService:PaviAdminService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService,
  ) {
    this.dataSourceFour = new MatTableDataSource<JobTerm>();
    this.displayedColumnsFour=['term','action'];
   }

  ngOnInit(): void {

    this.getJobTerms();

    this.termsForm = this.fb.group({
      term: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],

    });

    this.jobTermForm = this.fb.group({
      jobTermName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
      id: ['']

    });
  }

  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  applyFilterFour(filterValue: string) {
    this.dataSourceFour.filter = filterValue.trim().toLowerCase();
  }

  getJobTerms(){
    this.isLoder=true;
    let JobData = this.paviAdminService.getJobTerms()
    .subscribe(response => {
      //console.log("Job Term>>>",response['data']['terms']);
      this.dataSourceFour.data = response['data']['terms'] as JobTerm[];
      setTimeout(() => {this.dataSourceFour.paginator = this.tableFourPaginator;
        this.dataSourceFour.sort = this.tableFourSort;
      });
      this.terms = response['data']['terms'];  
    });
    this.isLoder=false;
  }

  saveJobTerms(){
    if(this.termsForm.valid){
    
      this.paviAdminService.saveJobTerms({term:this.termsForm.get('term').value}).subscribe((response : any) => {
        if(response.statusCode==200){
        this.getJobTerms();
        this.toastr.success('Data updated suceesfully');
        (<any>$(`#add-modal-job-catgory`)).modal('hide');
        } else {
          this.toastr.error(response.message)
        }
       });
    } else {
      this.toastr.error('Please check all fields');
    }
  }

  editJobTerm(index){
    $("#edit-modal-popup-jobTerm").modal("show");
    $("#edit-modal-popup-jobTerm").appendTo("body");
    this.jobTermForm.patchValue({
      jobTermName: this.terms[index].term,
      id: this.terms[index].id
    });
   }
   updateJobTerm(){
    if(this.jobTermForm.valid){    
      let params = {id: this.jobTermForm.getRawValue().id,
                term: this.jobTermForm.getRawValue().jobTermName};
                
        this.paviAdminService.updateJobTerms(params).subscribe((response : any) => {
          console.log("Update Job Term>>>>>>", response)
          if(response.statusCode==200){
            this.getJobTerms();
            this.toastr.success('Data Updated suceesfully');
            (<any>$(`#edit-modal-popup-jobTerm`)).modal('hide');
          } else {
            this.toastr.error(response.message)
          }
         });
    } else {
      this.toastr.error('Please check all fields');
    }
  }

}
