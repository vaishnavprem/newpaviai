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

interface JobSpecialty {
  specialist_level: string;
}

@Component({
  selector: 'app-job-specialist',
  templateUrl: './job-specialist.component.html',
  styleUrls: ['./job-specialist.component.css']
})
export class JobSpecialistComponent implements OnInit {
  public levels:any[];
  public  show = true;
  public isLoder=false;
  specialistForm: FormGroup;
  jobSpecialtyForm: FormGroup;
  countries = COUNTRY_LIST;
  today: number = Date.now()
  public status: boolean = false;

  public dataSourceFive;
  public displayedColumnsFive: string[];

  @ViewChild('TableFivePaginator', {static: false}) tableFivePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableFiveSort: MatSort;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private paviAdminService:PaviAdminService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService,
  ) {
    this.dataSourceFive = new MatTableDataSource<JobSpecialty>();
    this.displayedColumnsFive=['specialist_level','action'];
   }

  ngOnInit(): void {

    this.getJobSpecialistLevel();

    this.specialistForm = this.fb.group({
      specialist_level: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],

    });

    this.jobSpecialtyForm = this.fb.group({
      jobSpecialtyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), patternValidator(TEXT_ONLY_PATTERN)]],
      id: ['']

    });
  }

  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  applyFilterFive(filterValue: string) {
    this.dataSourceFive.filter = filterValue.trim().toLowerCase();
  }

  getJobSpecialistLevel(){
    this.isLoder=true;
    let JobData = this.paviAdminService.getJobSpecialistLevel()
    .subscribe(response => {
      this.isLoder=false;
      //console.log("Job Specialty>>>",response['data']['levels']);
      this.dataSourceFive.data = response['data']['levels'] as JobSpecialty[];
      setTimeout(() => {this.dataSourceFive.paginator = this.tableFivePaginator;
        this.dataSourceFive.sort = this.tableFiveSort;
      });
      this.levels = response['data']['levels'];  
    });
    
  }

  saveJobSpecialistLevel(){
    if(this.specialistForm.valid){
    
      this.paviAdminService.saveobSpecialistLevel({specialist_level:this.specialistForm.get('specialist_level').value}).subscribe((response : any) => {
        if(response.statusCode==200){
        this.getJobSpecialistLevel();
        this.toastr.success('Data Updated Successfully');
        (<any>$(`#add-modal-job-specialist`)).modal('hide');
        } else {
          this.toastr.error(response.message)
        }
       });
    } else {
      this.toastr.error('Please check all fields');
    }
  }

  editJobSpecialty(index){
    $("#edit-modal-popup-jobSpecialty").modal("show");
    $("#edit-modal-popup-jobSpecialty").appendTo("body");
    this.jobSpecialtyForm.patchValue({
      jobSpecialtyName: this.levels[index].specialist_level,
      id: this.levels[index].id,
    });
   }
   updateJobSpecialty(){
    if(this.jobSpecialtyForm.valid){    
      let params = {id: this.jobSpecialtyForm.getRawValue().id,
        specialist_level: this.jobSpecialtyForm.getRawValue().jobSpecialtyName};
          
        this.paviAdminService.updateJobSpecialties(params).subscribe((response : any) => { 
          console.log("Update Job Specialist>>>>>>", response)
          if(response.statusCode==200){
             this.getJobSpecialistLevel();
             this.toastr.success('Data Updated Successfully');
             (<any>$(`#edit-modal-popup-jobSpecialty`)).modal('hide');
          } else {
             this.toastr.error(response.message)
          }
         });
    } else {
       this.toastr.error('Please check all fields');
    }
  }

}
