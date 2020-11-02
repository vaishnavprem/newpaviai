import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../services/profile.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {patternValidator} from "../../../helpers/pattern-validator";
import {TEXT_ONLY_PATTERN, YEAR_ONLY_PATTERN} from "../../../constants/general";
import {isYearValid} from "../../../helpers/is-year-valid";
import {compareDates} from "../../../helpers/compare-dates";

@Component({
  selector: 'app-save-certification-dialog',
  templateUrl: './save-certification-dialog.component.html',
  styleUrls: ['./save-certification-dialog.component.css']
})
export class SaveCertificationDialogComponent implements OnInit {
  certificationForm: FormArray;
  editData;
  edit;
  certifications = [];
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private dialog: MatDialogRef<SaveCertificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.certificationForm = this.fb.array([
      this.fb.group({
        name: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
        description: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
        issued_by: ['', [Validators.required, patternValidator(TEXT_ONLY_PATTERN)]],
        start_year: ['', [Validators.required, patternValidator(YEAR_ONLY_PATTERN), isYearValid()]],
        end_year: ['', [Validators.required, patternValidator(YEAR_ONLY_PATTERN), isYearValid()]]
      }, {validator: compareDates('start_year', 'end_year')})
    ]);

    this.edit = !!data;
    if (data) {
      this.editData = data;
      this.certificationItems[0].patchValue(data);
    }
  }

  ngOnInit(): void {
    this.getCertifications();
  }

  getCertifications() {
    this.profileService.getCertifications({}).subscribe((dt: any) => {
      this.certifications = dt;
    });
  }

  saveCertification() {
    const formValue = this.certificationForm.value;
    this.isSubmitted = true;
    if (this.certificationForm.valid) {

      if (!this.edit) {
        this.profileService.addCertification(formValue).subscribe(() => {
          this.dialog.close();
        });
      } else {
        formValue[0].index = this.editData.index;
        this.profileService.updateCertifications(formValue[0]).subscribe(() => {
          this.dialog.close();
        });
      }
    }
  }

  get certificationItems() {
    return this.certificationForm.controls;
  }

}
