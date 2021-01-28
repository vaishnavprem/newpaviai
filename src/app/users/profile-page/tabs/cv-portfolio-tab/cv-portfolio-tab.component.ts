import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../../../../core/helpers/pattern-validator';
import {TEXT_ONLY_PATTERN} from '../../../../core/constants/general';
import {UsersService} from '../../../../core/services/users.service';
import {GetAuthUserPipe} from '../../../../shared/pipes/get-auth-user.pipe';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cv-portfolio-tab',
  templateUrl: './cv-portfolio-tab.component.html',
  styleUrls: ['./cv-portfolio-tab.component.css']
})
export class CvPortfolioTabComponent implements OnInit {

  editPosition = false;
  positionForm: FormGroup;
  resumeForm: FormGroup;
  authUser;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService
  ) {

    

    
  }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
    this.positionForm = this.fb.group({
      position: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
      user_id: this.authUser.user_id
    });

    this.resumeForm = this.fb.group({
      cover: ['']
    });
  }

  changePosition() {
    this.editPosition = !this.editPosition;
    this.positionForm.patchValue({position: this.authUser.position});
  }

  saveOnEnter(e) {
    if (e.key === 'Enter') {
      this.savePosition();
    }
  }

  savePosition() {
    if (this.positionForm.valid) {
      this.usersService.changePositionInfo(this.positionForm.value).subscribe((dt: any) => {
        this.editPosition = false;
        localStorage.setItem('token', dt.token);
        this.authUser.position = this.positionForm.value.position;
        this.toastr.success('The user position info has been changed successfully');
      });
    }
  }

  saveResume(event){
    const file = event.target.files[0];
    if(file.type == 'application/pdf' || file.type =='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
     
      if(file.size > 1000000){
        this.toastr.error('File size must be under 1 MB');
        return;
      }
      
      const formData = new FormData();
      formData.append('user_id', this.authUser.user_id);
      formData.append('avatar', file);
      //console.log("save Resume Called>>>>",formData.get('avatar'));
      this.usersService.uploadResume(formData).subscribe((response: any) => {
        this.toastr.success('Resume uploaded successfully');
        //console.log("Response>>>>",response);

        //this.profileImage = `${AVATAR_URL}uploads/avatars/${response['data']['image']}`;
      });
    }else{
      this.toastr.error('Please choose pdf/word file file');
      return;
    }
  }

}
