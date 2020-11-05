import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {CompaniesService} from '../../core/services/companies.service';
import {ToastrService} from 'ngx-toastr';
import { Subject ,Observable} from 'rxjs';
import {API_URL,AVATAR_URL} from '../../core/constants/general';
import { map, tap, takeUntil,startWith} from 'rxjs/operators';
import {Location} from '@angular/common';
@Component({
  selector: 'app-show-job',
  templateUrl: './show-job.component.html',
  styleUrls: ['./show-job.component.css']
})
export class ShowJobComponent implements OnInit {
  id: number;
  private sub: any;
  public jobs:any;
  public isLoder=false;
  public token;
  profileImage = 'assets/images/no-profile.png';
  coverImage = 'assets/images/no-cover.png';
  public avatar_url= AVATAR_URL;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private companiesService: CompaniesService,
    private toastr: ToastrService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });
   this.getJobData(this.id);
   this.token=localStorage.getItem('token');
  }
  getJobData(job_id){
    this.isLoder=true;
    let JobData =  this.companiesService.getJobData({job_id:job_id})
    .pipe(takeUntil(this.destroy$))
    .subscribe((response : any) => {
      this.isLoder=false;
      if (response.statusCode == 200) {
          this.jobs = response['data']['jobs']; 
      } else {
        this.toastr.error(response.message);
      }
      
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  navigateBack() {
    this.location.back();
}
}
