
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {API_URL,AVATAR_URL, TEXT_ONLY_PATTERN,EMAIL_PATTERN} from '../../core/constants/general';
import {patternValidator} from '../../core/helpers/pattern-validator';
import {ToastrService} from 'ngx-toastr';
import {GetAuthUserPipe} from '../../shared/pipes/get-auth-user.pipe';
import {CompaniesService} from '../../core/services/companies.service';
import {COUNTRY_LIST} from '../../core/constants/countries';
import { DatePipe } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {UsersService} from '../../core/services/users.service';
import { PaviAdminService } from '../../core/services/pavi-admin.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Chart } from 'chart.js';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
interface JobsElements {
  jobTitle: string;
  email: string;
  experience: string;
  level: string;
  employment: string;
  salary: string;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  jobTitle: string;
}

interface Question {
  jobTitle: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
];
@Component({
  selector: 'app-dashboard',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  employmentForm:FormGroup;
  seniorityForm:FormGroup;
  responsibilityForm:FormGroup;
  requirementsForm:FormGroup;
  jobForm:FormGroup;
  questionForm: FormGroup;
  profileForm: FormGroup;
  changeEmailForm: FormGroup;
  profileImage = 'assets/images/no-profile.png';
  coverImage = 'assets/images/no-cover.png';
  profileImgTextForm: FormGroup;
  coverImgForm: FormGroup;
  authUser;
  public isLoder=false;
  isSubmitted = false;
  emailsMatch = true;
  newOldEmailsMatch = false;
  public jobs:any[];
  public singleJob:{
    dateOpened: '',
        country: '',
        jobTitle: '',
        employment: '',
        city: '',
        dateClose: '',
        companyAddress: '',
        experience:'',
        level: '',
        salary: '',
        email: '',
        category:'',
        job_description: '',
        job_brief:'',
        assistant_job: '',
        requirement:'',
        responsibility:'',
        companyId:''
  }
  countries = COUNTRY_LIST;
  public employmentArry:{};
  public postArry:{};
  public employments:any[];
  public seniorityLevels:any[];
  public responsibilities:any[];
  public requirements:any[];
  public questions:any[];
  public userquestions:any;
  public firstQuestion:any;
  public nextIndex = 0;
  public questionLenth = 0;
  public companyData;
  public categories;
  public openJobs = 6;
  public applicants = 55;
  public interviewCompleted = 0;
  public  show = true;
  public dataSourceOne;
  public displayedColumnsOne: string[];
  public allusers;
  public dataSourceThree;
  public displayedColumnsThree: string[];

  public dataSourceFour;
  public displayedColumnsFour: string[];

  public selectedValue = 0;  //SelectMenu Of Dashboard
  public home = true;
  public addJobs = false;
  public viewjobs = false;
  public addInterviewQuestions = false;
  public viewQuestions = false;
  public Applicants = false;
  public Profile = false;
  public status: boolean = false;
  safeUrl: any;
  today: number = Date.now()
  viewDate: Date = new Date();
  events = [];
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen: boolean = true;

  CalendarView = CalendarView;
  

  dataSourceTwo: MatTableDataSource<PeriodicElement>;
  displayedColumnsTwo: string[] = ['position', 'name', 'weight', 'symbol'];
  @ViewChild('TableTwoPaginator', {static: false}) tableTwoPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableTwoSort: MatSort;

  @ViewChild('TableOnePaginator', {static: false}) tableOnePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableOneSort: MatSort;


  @ViewChild('TableThreePaginator', {static: false}) tableThreePaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableThreeSort: MatSort;

  @ViewChild('TableFourPaginator', {static: false}) tableFourPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) tableFourSort: MatSort;

  @ViewChild('lineCanvas',{static: false}) lineCanvas;
  lineChart: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private getAuthUser: GetAuthUserPipe,
    private companiesService: CompaniesService,
    private usersService: UsersService,
    public auth: AuthService,
    private paviAdminService:PaviAdminService,
    public router: Router,
    private sanitizer: DomSanitizer
  ) { 
    this.dataSourceOne = new MatTableDataSource<JobsElements>();
    this.displayedColumnsOne=['jobTitle', 'email', 'experience', 'level','employment','salary','action'];

    this.dataSourceThree = new MatTableDataSource<User>();
    this.displayedColumnsThree=['first_name', 'last_name', 'email', 'gender','jobTitle','created_at','action'];

    this.dataSourceFour = new MatTableDataSource<Question>();
    this.displayedColumnsFour=['jobTitle','action'];
    
    this.dataSourceTwo = new MatTableDataSource;
  }
  private pipe = new DatePipe('en-US')
  ngOnInit(): void {


   // this.isLoder=true;
    this.authUser = this.getAuthUser.transform();
    this.jobForm = this.fb.group({
      date_opened: ['', Validators.required],
        country: ['', Validators.required],
        jobTitle: ['', Validators.required],
        employment: ['', Validators.required],
        city: [''],
        date_closed: ['', Validators.required],
        companyAddress: ['', Validators.required],
        experience:['', Validators.required],
        level: ['', Validators.required],
        salary: ['', Validators.required],
        email: ['', Validators.required],
        category: [''],
        job_description: ['', Validators.required],
        job_brief:['', Validators.required],
        assistant_job: [''],
        requirement:['', Validators.required],
        responsibility:['', Validators.required],
        companyId:['' ],
        jobId:[''],
    });
    
    this.employmentForm = this.fb.group({
      employment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), patternValidator(TEXT_ONLY_PATTERN)]],

    });
    this.seniorityForm = this.fb.group({
      seniority: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), patternValidator(TEXT_ONLY_PATTERN)]],

    });

    this.responsibilityForm = this.fb.group({
      responsibility: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    });

    this.requirementsForm = this.fb.group({
      requirement: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    });
    this.questionForm = this.fb.group({
        jobId:['', Validators.required],
        questionText:['', Validators.required],
        createdBy:[''],
    })
    this.profileForm = this.fb.group({
      country:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      name:['', Validators.required],
    });
    this.changeEmailForm = this.fb.group({
      old_email: [this.authUser.email, [Validators.required, patternValidator(EMAIL_PATTERN)]],
      new_email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]],
      confirm_email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]]
      });
      this.profileImgTextForm = this.fb.group({
        // avatar: [''],
        about_text: ['']
      });
      this.coverImgForm = this.fb.group({
        cover: ['']
      });
        this.getCompanyData();
        // this.isLoder=false;

        //For Add Class active to Anchor Tag
        let anchors = $(".left-bar ul li a").click(function() {
          $(this).addClass("active")
          anchors.not(this).removeClass("active")
        })
  }

  ngAfterViewInit(): void{
    //This for Chart
    //this.lineChartMethod();
  }

  stopPlayer(){
    console.log("Player Stopped");
      var memory = $('#add-modal-candidate .modal-body .select-your-job').html();
        //console.log("modal Hide",memory);
      // $('#add-modal-candidate .modal-body').empty();
      $('#add-modal-candidate .modal-body .select-your-job').html("");
      this.userquestions = '';
      this.firstQuestion = '';
      this.nextIndex = 0;
      this.questionLenth = 0;
  }

    getCompanyData(){
      //let that=this;
      this.isLoder=true;
      this.postArry = {
      user_id:this.authUser.user_id
    }
    this.companiesService.getCompanyData(this.postArry)
    .subscribe((response : any)=> {
      this.isLoder=false;
      if (response.statusCode == 200) {
        $('.loader').hide();
        //console.log("Company Data>>",response);
        this.companyData = response['data']['companydata'];
        this.employments = response['data']['employment']; 
        this.seniorityLevels = response['data']['seniority']; 
        this.responsibilities = response['data']['responsibility']; 
        this.requirements = response['data']['requirement']; 
        this.categories = response['data']['categories']; 
         } else if (response.statusCode == 401) {
          this.toastr.error(response.message)
          this.auth.logOut();
          this.router.navigate(['auth/login']);
          }
          else this.toastr.error(response.message)
          
    });

  }

  applyFilterOne(filterValue: string) {
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();
  }

  applyFilterTwo(filterValue: string) {
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();
  }

  applyFilterThree(filterValue: string) {
    this.dataSourceThree.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFour(filterValue: string) {
    this.dataSourceFour.filter = filterValue.trim().toLowerCase();
  }

  clickEvent(){
    //console.log("ClickEvent>>>",this.status);
    this.status = !this.status;       
  }

  addEmployment(){
    $("#add-modal-employment").modal("show");
    $("#add-modal-employment").appendTo("body");
  }

  addSeniority(){
    $("#add-modal-seniority").modal("show");
    $("#add-modal-seniority").appendTo("body");
  }
  addResponsibilities(){
    $("#add-modal-responsibilities").modal("show");
    $("#add-modal-responsibilities").appendTo("body");
  }
  addRequirements(){
    $("#add-modal-requirements").modal("show");
    $("#add-modal-requirements").appendTo("body");
  }
  getJobCategory(){
 
    let JobData = this.paviAdminService.getJobCategory()
    .subscribe(response => {
      this.categories = response['data']['categories'];  
    });
  }
  getEmployment(){
    this.employmentArry = {
      companyId:this.companyData.id
    }
    let companData = this.companiesService.getEmployment( this.employmentArry)
    .subscribe(response => {
      if(response['data']){
        this.employments = response['data']['employment']; 
        
      } else {
        this.employments =[]; 
      }
       
    });
  }

  getSeniority(){
    this.employmentArry = {
      companyId:this.companyData.id
    }
    let companData = this.companiesService.getSeniority( this.employmentArry)
    .subscribe(response => {
      if(response['data']){
        this.seniorityLevels = response['data']['seniority']; 
      } else {
        this.seniorityLevels =[]; 
      }
       
    });
  }

  getResponsibility(){
    this.employmentArry = {
      companyId:this.companyData.id
    }
    let companData = this.companiesService.getResponsibility( this.employmentArry)
    .subscribe(response => {
      if(response['data']){
        this.responsibilities = response['data']['responsibility']; 
      } else {
        this.responsibilities =[]; 
      }
       
    });
  }

  getRequirements(){
    this.employmentArry = {
      companyId:this.companyData.id
    }
    let companData = this.companiesService.getRequirements( this.employmentArry)
    .subscribe(response => {
      if(response['data']){
        this.requirements = response['data']['requirement']; 
      } else {
        this.requirements =[]; 
      }
       
    });
  }

  saveEmployment(){
    if(this.employmentForm.valid){
      this.isLoder=true;
      this.employmentArry = {
        companyId:this.companyData.id,
        employment:this.employmentForm.get('employment').value
      }
      this.companiesService.saveEmployment(this.employmentArry).subscribe(response => {
        this.getEmployment();
        this.toastr.success('Data updated suceesfully');
        (<any>$(`#add-modal-employment`)).modal('hide');
       });
    } else {
      this.toastr.error('Please check all fields');
    }
    this.isLoder=false;
  }

  saveSeniority(){
    if(this.seniorityForm.valid){
      this.isLoder=true;
      this.employmentArry = {
        companyId:this.companyData.id,
        seniority:this.seniorityForm.get('seniority').value
      }
      this.companiesService.saveSeniority(this.employmentArry).subscribe(response => {
        this.getSeniority();
        this.toastr.success('Data updated suceesfully');
        (<any>$(`#add-modal-seniority`)).modal('hide');
       });
    } else {
      this.toastr.error('Please check all fields');
    }
    this.isLoder=false;
  }

  saveResponsibility(){
    if(this.responsibilityForm.valid){
      this.isLoder=true;
      this.employmentArry = {
        companyId:this.companyData.id,
        responsibility:this.responsibilityForm.get('responsibility').value
      }
      this.companiesService.saveResponsibility(this.employmentArry).subscribe(response => {
        this.getResponsibility();
        this.toastr.success('Data updated suceesfully');
        (<any>$(`#add-modal-responsibilities`)).modal('hide');
       });
    } else {
      this.toastr.error('Please check all fields');
    }
    this.isLoder=false;
  }

  saveRequirements(){
    if(this.requirementsForm.valid){
      this.isLoder=true;
      this.employmentArry = {
        companyId:this.companyData.id,
        requirement:this.requirementsForm.get('requirement').value
      }
      this.companiesService.saveRequirements(this.employmentArry).subscribe(response => {
        this.getRequirements();
        this.toastr.success('Data updated suceesfully');
        (<any>$(`#add-modal-requirements`)).modal('hide');
       });
    } else {
      this.toastr.error('Please check all fields');
    }
    this.isLoder=false;
  }

  createJobs(){
    if(this.jobForm.get('jobId').value){
         this.jobForm.reset(); 
    }
  }

  jobFormRest(){
    this.jobForm.reset();
  }
  saveJob(){
    if(this.jobForm.valid){
      this.isLoder=true;
      this.jobForm.patchValue({
        companyId:this.companyData.id
      });
      if(this.jobForm.get('jobId').value){
        this.companiesService.editJobs(this.jobForm.getRawValue()).subscribe((response : any) => {
            if (response.statusCode == 200) {
            this.toastr.success('Data updated suceesfully');
            } else if (response.statusCode == 401) {
              this.toastr.error(response.message);
            }
            else this.toastr.error(response.message);
         });
      } else {
        this.companiesService.saveJobs(this.jobForm.getRawValue()).subscribe(response => {
         
          this.jobForm.reset();
          this.toastr.success('Data added suceesfully');
          this.getJobs();
          $('#pills-tab a[href="#interviews"]').tab('show');
         });
      }
    
    } else {
      this.toastr.error('Please check all fields');
    }
    this.isLoder=false;
  }
 
  getJobs(){
    this.isLoder=true;
    this.postArry = {
      companyId:this.companyData.id
    }
    let JobData = this.companiesService.getJobs(this.postArry)
    .subscribe(response => {
      this.isLoder=false;
      // $('.loader').hide();
      this.dataSourceOne.data = response['data']['jobs'] as JobsElements[];
      this.dataSourceOne.paginator = this.tableOnePaginator;
        this.dataSourceOne.sort = this.tableOneSort;
     
      this.jobs = response['data']['jobs'];
      //console.log("View Jobs>>",this.jobs);
      
    });
    
  }

  getUsers(){
    this.isLoder=true;
    this.postArry = {
      companyId:this.companyData.id
    }
    let JobData = this.companiesService.getJobsUser(this.postArry)
    .subscribe(response => {
      this.isLoder=false;
      // $('.loader').hide();
      let latest = response['data']['user'].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.dataSourceThree.data = latest as User[];
      this.dataSourceThree.paginator = this.tableThreePaginator;
        this.dataSourceThree.sort = this.tableThreeSort;
        this.allusers = response['data']['user'];
        
      //console.log(latest);
      
    });
    
  }
  showJob(index){
    this.singleJob =this.jobs[index];
    $("#show-job").modal("show");
    $("#show-job").appendTo("body");
    
    //console.log("Index>>",index,"Single jOB>>",this.singleJob);
  }
  editJob(index){
    this.singleJob =this.jobs[index];
    
    if(this.singleJob ){
        // $('#pills-tab a[href="#create-job"]').tab('show');
        this.selectedV(1);
        this.jobForm.patchValue({
          jobId:this.jobs[index].id,
          date_opened:new Date(this.jobs[index].dateOpened).toISOString().substring(0, 10),
          date_closed:new Date(this.jobs[index].dateClose).toISOString().substring(0, 10)
        });

        this.jobForm.patchValue(this.singleJob);
    } 
  }
  deleteJob(jobId){
    this.postArry = {
      jobId:jobId,
    }
    this.companiesService.deleteJob(this.postArry).subscribe(response => {
      this.getJobs();
      this.toastr.success('Data deleted suceesfully');
     });
  }
  addQuestion(){
    this.getJobs();
  }
  saveQuestion(){
    if(this.questionForm.valid){
      this.questionForm.patchValue({
        createdBy:this.authUser.id
      });
        this.companiesService.saveQuestion(this.questionForm.getRawValue()).subscribe(response => {
          this.questionForm.reset();
          this.toastr.success('Data added suceesfully');
         });
    } else {
      this.toastr.error('Please check all fields');
    }
  }
  listQuestion(){
    //this.getJobs();
    this.isLoder=true;
    this.postArry = {
      companyId:this.companyData.id
    }
    let JobData = this.companiesService.getJobs(this.postArry)
    .subscribe(response => {
      this.isLoder=false;
      this.dataSourceFour.data = response['data']['jobs'] as Question[];
      this.dataSourceFour.paginator = this.tableFourPaginator;
        this.dataSourceFour.sort = this.tableFourSort;
      
      this.jobs = response['data']['jobs'];
      //console.log("View Jobs>>",this.jobs);
      
    });
    
  }
  showQuestions(jobId){
    this.isLoder=true;
    this.postArry = {
      jobId:jobId,
    }
    this.companiesService.showQuestion(this.postArry).subscribe(response => {
      if(Object.keys(response['data']).length > 0){
        this.isLoder=false;
        this.questions = response['data']['question'];
        $("#show-question").modal("show");
      } else {
        this.isLoder=false;
        this.toastr.error('No question found');
      }
     });
  }
  deleteQuestion(index,questionId){
    this.postArry = {
      questionId:questionId,
    }
    this.companiesService.deleteQuestion(this.postArry).subscribe(response => {
      this.questions.splice(index, 1);     
      this.toastr.success('Data deleted suceesfully');
     });
  }
  showProfile(){
    this.profileForm.patchValue({
      name:this.companyData.name,
      address:this.companyData.address,
      phone:this.companyData.phone,
      country:this.companyData.country
    });
    
    if(this.companyData.logo_image!=undefined){
      this.profileImage= `${AVATAR_URL}uploads/avatars/${this.companyData.logo_image}`;
    }

    if(this.companyData.cover_image!=undefined){
      this.coverImage = `${AVATAR_URL}uploads/avatars/${this.companyData.cover_image}`;
    }
  }
  get oldEmail() {
    return this.changeEmailForm.get('old_email');
  }

  get newEmail() {
      return this.changeEmailForm.get('new_email');
  }

  get confirmEmail() {
      return this.changeEmailForm.get('confirm_email');
  }
  changeEmail() {
    this.isSubmitted = true;
    if (this.changeEmailForm.valid && this.emailsMatch && !this.newOldEmailsMatch) {
        this.usersService.changeEmail({...this.changeEmailForm.value, ...{user_id: this.authUser._id}}).subscribe((dt: any) => {
            this.toastr.success('Email has been changed successfully');
            localStorage.setItem('token', dt.token);
        });
    }
}

compareEmails() {
    this.compareNewOldEmails();
    this.emailsMatch = this.confirmEmail.value === this.newEmail.value;
}

compareNewOldEmails() {
    this.newOldEmailsMatch = this.newEmail.value && this.oldEmail.value && this.newEmail.value === this.oldEmail.value;
}
saveProfileDetails() {
  if (this.profileForm.valid) {

    this.companiesService.updateProfileInfo({
      ...this.profileForm.value, ...{companyId:this.companyData._id}
    }).subscribe((dt: any) => {
      this.toastr.success('The profile changes has been saved successfully');
    });
  }
}
changeProfileImage(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    // this.profileImgTextForm.patchValue({
    //   avatar: file
    // });

    const formData = new FormData();
    formData.append('company_id', this.companyData.id);
    formData.append('column','logo');
    formData.append('avatar', file);
    this.usersService.uploadProfileImg(formData).subscribe((response: any) => {
      this.profileImage = `${AVATAR_URL}uploads/avatars/${response['data']['image']}`;
    });
  }
}
changeCoverImage(event){
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    // this.profileImgTextForm.patchValue({
    //   avatar: file
    // });

    const formData = new FormData();
    formData.append('company_id', this.companyData.id);
    formData.append('column','cover');
    formData.append('avatar', file);
    this.usersService.uploadProfileImg(formData).subscribe((response: any) => {
      this.coverImage = `${AVATAR_URL}uploads/avatars/${response['data']['image']}`;
    });
  }
}

showCandidateAnswers(element){
   this.isLoder=true;
    let parmsa ={
      jobId:element.job_id,
      user_id:element.id,
      interview_id:element.interview_id
    }
    this.companiesService.showQuestionAnswer(parmsa)
    .subscribe((response : any) => {
      
      if (response.statusCode == 200) {
          this.userquestions = response['data']['question']; 
          this.isLoder=false;
          $("#add-modal-candidate").modal("show");
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

getSafeUrl(url){
  return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
}
showRecordedAnswer(recordString){
  window.open("https://d1iruxeyl67hmv.cloudfront.net/web/index.php/archive/"+recordString+"/view" , "_blank");
}
selectedV(value){
  let select = +value;
  this.status = false;
  // let that = this;
  switch(select) {
    case 0: { 
      // setTimeout(function(){ that.lineChartMethod(); }, 1000)
      this.home = true;
      this.addJobs = false;
      this.viewjobs = false;
      this.addInterviewQuestions = false;
      this.viewQuestions = false;
      this.Applicants = false;
      this.Profile = false;
      
       break; 
    } 
    case 1: { 
      this.home = false;
      this.addJobs = true;
      this.viewjobs = false;
      this.addInterviewQuestions = false;
      this.viewQuestions = false;
      this.Applicants = false;
      this.Profile = false;
      
       break; 
    } 
    case 2: { 
      this.getJobs();
      this.home = false;
      this.addJobs = false;
      this.viewjobs = true;
      this.addInterviewQuestions = false;
      this.viewQuestions = false;
      this.Applicants = false;
      this.Profile = false;
      
       break; 
    }
    case 3: { 
      this.addQuestion();
      this.home = false;
      this.addJobs = false;
      this.viewjobs = false;
      this.addInterviewQuestions = true;
      this.viewQuestions = false;
      this.Applicants = false;
      this.Profile = false;
      
      break; 
    }
    case 4: { 
      this.listQuestion();
      this.home = false;
      this.addJobs = false;
      this.viewjobs = false;
      this.addInterviewQuestions = false;
      this.viewQuestions = true;
      this.Applicants = false;
      this.Profile = false;
      
      break; 
    }
    case 5: { 
      this.getUsers();
      this.home = false;
      this.addJobs = false;
      this.viewjobs = false;
      this.addInterviewQuestions = false;
      this.viewQuestions = false;
      this.Applicants = true;
      this.Profile = false;
      
      break; 
    }
    case 6: { 
      this.showProfile();
      this.home = false;
      this.addJobs = false;
      this.viewjobs = false;
      this.addInterviewQuestions = false;
      this.viewQuestions = false;
      this.Applicants = false;
      this.Profile = true;
      
      break; 
    }  
    default: { 
       
       break; 
    } 
 } 
}

lineChartMethod() {
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Job Statistics',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#fff',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
          spanGaps: false,
        }
      ]
    }
  });
}

setView(view: CalendarView) {
  this.view = view;
}

closeOpenMonthViewDay() {
  this.activeDayIsOpen = false;
}

}
