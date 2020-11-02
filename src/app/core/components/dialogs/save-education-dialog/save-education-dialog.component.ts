import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../services/profile.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {FORM_OWL_CAROUSEL_OPTIONS, TEXT_ONLY_PATTERN, YEAR_ONLY_PATTERN} from '../../../constants/general';
import {patternValidator} from '../../../helpers/pattern-validator';
import {isYearValid} from '../../../helpers/is-year-valid';
import {compareDates} from '../../../helpers/compare-dates';

@Component({
  selector: 'app-save-education-dialog',
  templateUrl: './save-education-dialog.component.html',
  styleUrls: ['./save-education-dialog.component.css']
})
export class SaveEducationDialogComponent implements OnInit {

  educationForm: FormArray;
  editData;
  edit;
  owlOptions: OwlOptions = FORM_OWL_CAROUSEL_OPTIONS;
  isSubmitted = false;
  @ViewChild('carousel') carousel;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private dialog: MatDialogRef<SaveEducationDialogComponent>,
    // private renderer: Renderer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.educationForm = this.fb.array([
      this.createEducationFormFields(),
      // this.createEducationFormFields()
    ]);

    this.edit = !!data;
    if (data) {

      this.editData = data;
      this.educationItems[0].patchValue(data);
    }
  }

  ngOnInit(): void {

  }

  saveEducation() {
    const formValue = this.educationForm.value;
    this.isSubmitted = true;
    if (this.educationForm.valid) {

      if (!this.edit) {
        this.profileService.addEducation(formValue).subscribe(() => {
          this.dialog.close();
        });
      } else {
        formValue[0].index = this.editData.index;
        this.profileService.updateEducationInfo(formValue[0]).subscribe(() => {
          this.dialog.close();
        });
      }
    }
  }


  get educationItems() {
    return this.educationForm.controls;
  }

  createEducationFormFields(): FormGroup {
    return this.fb.group({
      institution: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
      degree: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
      speciality: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
      start_year: ['', [Validators.required, patternValidator(YEAR_ONLY_PATTERN), isYearValid()]],
      end_year: ['', [Validators.required, patternValidator(YEAR_ONLY_PATTERN), isYearValid()]]
    }, {validator: compareDates('start_year', 'end_year')});
  }


  addOneMoreFieldsGroup() {
    this.educationItems.push(this.createEducationFormFields());
    // console.log(document.body.querySelector('.owl-next'))
    console.log(this.carousel.slidesOutputData)
    console.log(this.carousel.slidesData)
    console.log(this.carousel)
    console.log(this.educationItems.length.toString())
    this.carousel.to('1');
  }


  initialized(e) {
    console.log(e)
  }
}
