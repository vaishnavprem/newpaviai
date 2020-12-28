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
declare var $: any;

interface User {
  jobTitle: string;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {



  showProfileImgTextControls = false;
  profileImage = 'assets/images/no-profile.png';
  coverImage = 'assets/images/no-cover.png';
  profileImgTextForm: FormGroup;
  coverImgForm: FormGroup;
  aboutText = {profile_desc: ''};


  authUser;
  isLinear = false;
  currentStep = 1;
  public status: boolean = false;
  public home = true;
  public profile = false;
  public interview = false;
  public postArry:{};

  today: number = Date.now()

  public dataSourceOne;
  public displayedColumnsOne: string[];

  @ViewChild('TableOnePaginator', {static: false}) tableOnePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableOneSort: MatSort;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService,

  ) {

    this.profileImgTextForm = this.fb.group({
      // avatar: [''],
      about_text: ['']
    });
    this.coverImgForm = this.fb.group({
      cover: ['']
    });

    this.dataSourceOne = new MatTableDataSource<User>();
    this.displayedColumnsOne=['jobTitle','action'];
  }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();

    console.log("Auth User",this.authUser.user_id)
    if (this.authUser.avatar) {
      this.profileImage = `${API_URL}uploads/avatars/${this.authUser.avatar}`;
    }
    if (this.authUser.cover) {
      this.coverImage = `${API_URL}uploads/covers/${this.authUser.cover}`;
    }

    this.getAboutText();

     //For Add Class active to Anchor Tag
     let anchors = $(".left-bar ul li a").click(function() {
      $(this).addClass("active")
      anchors.not(this).removeClass("active")
    })

    //For InterView Hard Coded Data
    this.dataSourceOne.data = [{jobTitle:'PHP'},{jobTitle:'Web Developer'},{jobTitle:'Angular'},{jobTitle:'Java'}] as User[];
    this.dataSourceOne.paginator = this.tableOnePaginator;
    this.dataSourceOne.sort = this.tableOneSort;
      
  }

  stepChanged(e) {
    this.currentStep = e.selectedIndex + 1;
  }

  
  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  applyFilterOne(filterValue: string) {
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();
  }



  changeProfileImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.profileImgTextForm.patchValue({
      //   avatar: file
      // });

      const formData = new FormData();
      formData.append('user_id', this.authUser._id);
      formData.append('avatar', file);

      this.usersService.uploadProfileImg(formData).subscribe((dt: any) => {
        localStorage.setItem('token', dt.token);
        this.authUser = this.getAuthUser.transform();
        this.profileImage = `${API_URL}uploads/avatars/${this.authUser.avatar}`;
      });
    }
  }

  changeCoverImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('user_id', this.authUser._id);
      formData.append('cover', file);
      this.usersService.uploadCoverImg(formData).subscribe((dt: any) => {
        localStorage.setItem('token', dt.token);
        this.authUser = this.getAuthUser.transform();
        this.coverImage = `${API_URL}uploads/covers/${this.authUser.cover}`;
      });
    }
  }


  saveAboutText() {
    this.usersService.changeAboutText(this.profileImgTextForm.value).subscribe(dt => {
      this.toastr.success('Profile description has been changed successfully');
      this.aboutText.profile_desc = this.profileImgTextForm.value.about_text;
      this.showProfileImgTextControls = false;
    });
  }

  getAboutText() {
    this.usersService.getAboutText({}).subscribe((dt: any) => {
      this.aboutText = dt;
        //console.log("About Text>>>",this.aboutText);
      this.profileImgTextForm.patchValue({about_text: dt.profile_desc});

    });
  }

  toggleProfileImgText() {
    this.showProfileImgTextControls = !this.showProfileImgTextControls;
  }

  showCandidateAnswers(element){   
    $("#add-modal-candidate").modal("show"); 
 }

 getAppliedJob(){
   console.log("Get Applied Job Called");
  this.postArry = {
    user_id:this.authUser.user_id
  }
  let JobData = this.usersService.getJobsUser(this.postArry)
  .subscribe(response => {
    // let latest = response['data']['user'].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    this.dataSourceOne.data = response['data']['user'] as User[];
    this.dataSourceOne.paginator = this.tableOnePaginator;
      this.dataSourceOne.sort = this.tableOneSort;
      // this.allusers = response['data']['user'];
      
    console.log(response);
    
  });
}

  selectedV(value){
    let select = +value;
    this.status = false;
    
    switch(select) {
      case 0: { 
        this.home = true;
        this.profile = false;
        this.interview = false;
        
         break; 
      } 
      case 1: { 
        this.home = false;
        this.profile = true;
        this.interview = false;

         break; 
      } 
      case 2: {
        this.getAppliedJob() 
        this.home = false;
        this.profile = false;
        this.interview = true;
        
        
         break; 
      }
      default: { 
         
         break; 
      } 
   } 
  }
}
