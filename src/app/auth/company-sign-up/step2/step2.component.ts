import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  @Input('group') accountInfo: FormGroup;
  isSubmitted = false;
  constructor() { }

  ngOnInit(): void {
  }


  /**
   * First name field control getter
   */
  get firstName() {
    return this.accountInfo.get(`first_name`);
  }

  /**
   * Last name field control getter
   */
  get lastName(): AbstractControl {
    return this.accountInfo.get(`last_name`);
  }

  /**
   * E-mail field getter
   */
  get email(): AbstractControl {
    return this.accountInfo.get('email');
  }

  /**
   * Password field getter
   */
  get pass(): AbstractControl {
    return this.accountInfo.get('password');
  }

  // get gender(): AbstractControl {
  //   return this.accountInfo.get('gender');
  // }

}
