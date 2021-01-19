import {Component, OnInit,Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {patternValidator} from '../../core/helpers/pattern-validator';
import {API_URL, EMAIL_PATTERN} from '../../core/constants/general';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../core/services/common.service';
import { Subject ,Observable} from 'rxjs';
import { map, tap, takeUntil,startWith} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
declare function typewriterlogin(params1, param2): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm: FormGroup;
  isSubmitted = false;
  private sub: any;
  id: number;
  loginid: number; //Decide to open Employer(2) Login Or User(1) Login 
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.loginid = this.route.snapshot.params['id']; // for open User Login Or Employer Login
  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => { 
          this.id = +params['job'] || null; // (+) converts string 'id' to a number
          const token = localStorage.getItem('token');
          if (token && this.id ) {
            this.router.navigate(['users/job-question',this.id]);
          }
   });
    this.loginForm = this.fb.group({
      email: new FormControl(null, {
        validators: [Validators.required, patternValidator(EMAIL_PATTERN)]
      }),
      password: ['', Validators.required]
    });

    //for calling Typing animation on text
    if(this.loginid==2){
      typewriterlogin("Employer","employertext");
    }else if(this.loginid==1){
      typewriterlogin("Employee","employeetext");
    }
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {

      this.auth.login(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (dt: any) => {
        if(dt.statusCode==200){
            localStorage.setItem('token', dt['data'].token);
            localStorage.setItem('data', JSON.stringify(dt['data']));
            this.toastr.success('User login successfully');
            if(dt['data'].roles=='admin'){
              await this.router.navigate(['pavi-admin/admin-dashboard']);
            } else if(dt['data'].roles=='company_user'){
              await this.router.navigate(['companies/dashboard']);
            } else if(dt['data'].roles=='employee'){
              await this.router.navigate(['companies/dashboard']);
            } else {
              if(this.id){
                await this.router.navigate(['users/job-question',this.id]);
              } else {
                 await this.router.navigate(['users/dashboard']);
              }
            }
          
      } else {
        this.toastr.error(dt.message)
      }
      });
    }
  }

  getGoogleAuthUrl() {
    return `${API_URL}auth/google`;
  }

  /**
   * E-mail field getter
   */
  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  /**
   * Password field getter
   */
  get pass(): AbstractControl {
    return this.loginForm.get('password');
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
