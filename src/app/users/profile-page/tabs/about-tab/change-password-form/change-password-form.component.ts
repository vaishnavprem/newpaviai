import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GetAuthUserPipe} from '../../../../../shared/pipes/get-auth-user.pipe';
import {UsersService} from '../../../../../core/services/users.service';
import {ToastrService} from 'ngx-toastr';
import {patternValidator} from "../../../../../core/helpers/pattern-validator";
import {NO_SPACE_PATTERN} from "../../../../../core/constants/general";

@Component({
    selector: 'app-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {
    changePasswordForm: FormGroup;
    passwordsMatch = true;
    newOldPasswordsMatch = false;
    isSubmitted = false;
    authUser;

    @Output('back') back = new EventEmitter();

    constructor(
        private getAuthUser: GetAuthUserPipe,
        private fb: FormBuilder,
        private usersService: UsersService,
        private toastr: ToastrService
    ) {
        this.changePasswordForm = this.fb.group({
            new_pass: ['', [Validators.required, patternValidator(NO_SPACE_PATTERN)]],
            confirm_password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.authUser = this.getAuthUser.transform();
    }

    comparePasswords() {
        this.passwordsMatch = this.newPass.value === this.confirmPass.value;
    }

   
    changePassword() {
        this.isSubmitted = true;
        if (this.changePasswordForm.valid  && this.passwordsMatch) {
            this.usersService.changePassword({...this.changePasswordForm.value, ...{user_id: this.authUser.user_id}}).subscribe((response: any) => {
                if (response.statusCode == 200) {
                    this.toastr.success('Password has been changed successfully');
                } else {
                  this.toastr.error(response.message);
                }
            });
        }
    }

    backToMainForm() {
        this.back.emit();
    }



    get newPass(): AbstractControl {
        return this.changePasswordForm.get('new_pass');
    }

    get confirmPass(): AbstractControl {
        return this.changePasswordForm.get('confirm_password');
    }

}
