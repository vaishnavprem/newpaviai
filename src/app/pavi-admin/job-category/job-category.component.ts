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

interface JobCategory {
  category: string;
}

@Component({
  selector: 'app-job-category',
  templateUrl: './job-category.component.html',
  styleUrls: ['./job-category.component.css']
})
export class JobCategoryComponent implements OnInit {
  public categories:any[];
  public  show = true;
  public isLoder=false;
  categoryForm: FormGroup;
  jobCategoryForm: FormGroup;
  countries = COUNTRY_LIST;
  today: number = Date.now()
  public status: boolean = false;

  public dataSourceThree;
  public displayedColumnsThree: string[];

  @ViewChild('TableThreePaginator', {static: false}) tableThreePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableThreeSort: MatSort;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private paviAdminService:PaviAdminService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService,
  ) {
    this.dataSourceThree = new MatTableDataSource<JobCategory>();
    this.displayedColumnsThree=['category','action'];
   }

  ngOnInit(): void {

    this.getJobCategory();

    this.categoryForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],

    });

    this.jobCategoryForm = this.fb.group({
      jobCategoryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
      id: ['']

    });
  }

  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  applyFilterThree(filterValue: string) {
    this.dataSourceThree.filter = filterValue.trim().toLowerCase();
  }

  getJobCategory(){
    this.isLoder=true;
   
    let JobData = this.paviAdminService.getJobCategory()
    .subscribe(response => {
      //console.log("Job Category>>>",response['data']['categories']);
      this.dataSourceThree.data = response['data']['categories'] as JobCategory[];
      setTimeout(() => {this.dataSourceThree.paginator = this.tableThreePaginator;
        this.dataSourceThree.sort = this.tableThreeSort;
      });
      this.categories = response['data']['categories'];  
    });
    this.isLoder=false;
  }
  saveJobCategory(){
    if(this.categoryForm.valid){
    
      this.paviAdminService.saveJobCategory({category:this.categoryForm.get('category').value}).subscribe((response : any) => {
        if(response.statusCode==200){
        this.getJobCategory();
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

  editJobCategory(index){
    $("#edit-modal-popup-jobCategory").modal("show");
    $("#edit-modal-popup-jobCategory").appendTo("body");
    this.jobCategoryForm.patchValue({
      jobCategoryName: this.categories[index].category,
      id: this.categories[index].id
    });
   }
   updateJobCategory(){
    if(this.jobCategoryForm.valid){    
      let params = {id: this.jobCategoryForm.getRawValue().id,
                category: this.jobCategoryForm.getRawValue().jobCategoryName};
          
        this.paviAdminService.updateJobCategories(params).subscribe((response : any) => { 
          console.log("Update Job Category>>>>>>", response)
          if(response.statusCode==200){
             this.getJobCategory();
             this.toastr.success('Data Updated suceesfully');
             (<any>$(`#edit-modal-popup-jobCategory`)).modal('hide');
          } else {
             this.toastr.error(response.message)
          }
         });
    } else {
       this.toastr.error('Please check all fields');
    }
  }

}
