import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {INDUSTRY_LIST} from '../../../core/constants/industries';
import {COUNTRY_LIST} from '../../../core/constants/countries';
import {CompaniesService} from '../../../core/services/companies.service';
import {CommonService} from '../../../core/services/common.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  @Input('group') companyInfoFormGroup: FormGroup;
  @Input('stepper') stepper;
  industries = INDUSTRY_LIST;
  countries = COUNTRY_LIST;
  isSubmitted = false;

  constructor(
    private companiesService: CompaniesService,
    public common: CommonService
  ) {
  }

  ngOnInit(): void {
  }

  changeCountry(e) {
    this.companyInfoFormGroup.patchValue({country: e.target.value});
  }

  changeIndustry(e) {
    this.companyInfoFormGroup.patchValue({industry: e.target.value});
  }

  checkCompanyName(e) {
    this.companiesService.checkCompanyName({name: e.target.value}).subscribe(dt => {
      if(dt['statusCode']==200){
        this.common.companyNameExists = true;
      } else {
       this.common.companyNameExists = false;
      }
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.common.companyNameExists) {
      return false;
    } else {
      this.stepper.next();
    }
  }

  get companyCtrl(): AbstractControl {
    return this.companyInfoFormGroup.get('name');
  }

  get industryCtrl(): AbstractControl {
    return this.companyInfoFormGroup.get('industry');
  }

  get countryCtrl(): AbstractControl {
    return this.companyInfoFormGroup.get('country');
  }

}
