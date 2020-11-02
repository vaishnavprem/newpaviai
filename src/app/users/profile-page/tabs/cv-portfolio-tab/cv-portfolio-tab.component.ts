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
  authUser;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private getAuthUser: GetAuthUserPipe,
    private toastr: ToastrService
  ) {

    this.authUser = this.getAuthUser.transform();

    this.positionForm = this.fb.group({
      position: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
      user_id: this.authUser._id
    });
  }

  ngOnInit(): void {
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

}
