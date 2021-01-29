import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {INDUSTRY_LIST} from '../../../core/constants/industries';
import {COUNTRY_LIST} from '../../../core/constants/countries';
import {CompaniesService} from '../../../core/services/companies.service';
import {CommonService} from '../../../core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {GetAuthUserPipe} from '../../../shared/pipes/get-auth-user.pipe';
import {UsersService} from '../../../core/services/users.service';
// import { ImageCroppedEvent } from 'ngx-image-cropper';

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

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCroper = false;
  fileimage:any = '';
  authUser;
  isLoder;

  constructor(
    private companiesService: CompaniesService,
    public common: CommonService,
    private toastr: ToastrService,
    private getAuthUser: GetAuthUserPipe,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.authUser = this.getAuthUser.transform();
  }

  changeCountry(e) {
    this.companyInfoFormGroup.patchValue({country: e.target.value});
  }

  changeIndustry(e) {
    this.companyInfoFormGroup.patchValue({industry: e.target.value});
  }

  changeLogo(e){
    this.isLoder = true;
    const file = e.target.files[0];
    this.showCroper = true;
    // if(file.type != 'image/jpg' && file.type != 'image/png'){
    //   this.toastr.error('Please choose image file');
    //   return;
    // }
    // if(file.size > 1000000){
    //   this.toastr.error('File size must be under 1 MB');
    //   return;
    // }
   
    const formData = new FormData();
    formData.append('company_id', this.authUser.user_id);
    formData.append('column','logo');
    formData.append('avatar', file);
    this.usersService.uploadProfileImg(formData).subscribe((response: any) => {
      //this.profileImage = `${AVATAR_URL}uploads/avatars/${response['data']['image']}`;
      this.toastr.success('Logo Image is uploaded successfully');
      this.isLoder = false;
    });

    this.companyInfoFormGroup.patchValue({logo: "Test"});
    //this.imageChangedEvent = e;

  }
  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = event.base64;
    
  //   var blob = new Blob([this.croppedImage], {type: 'image/png'});
  //   var file = new File([blob], 'imageFileName.png');
  //   this.fileimage = file.name;
  //   this.companyInfoFormGroup.patchValue({logo: file});
  // }
  // imageLoaded(image: HTMLImageElement) {
  //   // show cropper
  // }
  // cropperReady() {
  //     // cropper ready
  // }
  // loadImageFailed() {
  //     // show message
  // }

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
    //console.log("CompanyInfo>>>>>",this.companyInfoFormGroup.getRawValue())
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

  get logoCtrl(): AbstractControl {
    return this.companyInfoFormGroup.get('logo');
  }

}
