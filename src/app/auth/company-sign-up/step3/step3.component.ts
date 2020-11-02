import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {COUNTRY_LIST} from '../../../core/constants/countries';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  @Input('group') companyDetailsFormGroup: FormGroup;
  @Output('registerCompany') register = new EventEmitter();
  isSubmitted = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  registerCompany() {
    this.isSubmitted = true;
    if (this.companyDetailsFormGroup.valid) {
      this.register.emit();
    }
  }

  /**
   * E-mail field getter
   */
  get email(): AbstractControl {
    return this.companyDetailsFormGroup.get('email');
  }

  get phone(): AbstractControl {
    return this.companyDetailsFormGroup.get('phone');
  }

  get address(): AbstractControl {
    return this.companyDetailsFormGroup.get('address');
  }
}
