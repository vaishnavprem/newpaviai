import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../services/profile.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {patternValidator} from '../../../helpers/pattern-validator';
import {NUMBER_AFTER_TEXT_PATTERN, TEXT_ONLY_PATTERN, YEAR_ONLY_PATTERN} from '../../../constants/general';
import * as moment from 'moment';
import {isYearValid} from '../../../helpers/is-year-valid';
import {compareDates} from '../../../helpers/compare-dates';

@Component({
  selector: 'app-save-work-experience-dialog',
  templateUrl: './save-work-experience-dialog.component.html',
  styleUrls: ['./save-work-experience-dialog.component.css']
})
export class SaveWorkExperienceDialogComponent implements OnInit {

  workExperienceForm: FormArray;
  edit;
  editData;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private dialog: MatDialogRef<SaveWorkExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.workExperienceForm = this.fb.array([
      this.fb.group({
          company_name: ['', [Validators.required, patternValidator(NUMBER_AFTER_TEXT_PATTERN)]],
          speciality: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
          start_year: ['', [Validators.required, patternValidator(YEAR_ONLY_PATTERN), isYearValid()]],
          end_year: ['', [Validators.required, patternValidator(YEAR_ONLY_PATTERN), isYearValid()]]
        },
        {validator: compareDates('start_year', 'end_year')}
      )]);

    this.edit = !!data;

    if (data) {
      this.editData = data;
      this.experienceItems[0].patchValue(data);
    }
  }

  ngOnInit(): void {
  }

  saveExperience() {
    const formValue = this.workExperienceForm.value;
    this.isSubmitted = true;
    if (this.workExperienceForm.valid) {
      if (!this.edit) {

        this.profileService.addWorkExperience(formValue).subscribe(() => {
          this.dialog.close();
        });

      } else {
        formValue[0].index = this.editData.index;
        this.profileService.updateWorkExperience(formValue[0]).subscribe(() => {
          this.dialog.close();
        });

      }
    }
  }

  get experienceItems() {
    return this.workExperienceForm.controls;
  }


}
