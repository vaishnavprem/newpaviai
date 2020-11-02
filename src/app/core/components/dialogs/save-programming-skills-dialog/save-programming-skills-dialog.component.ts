import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProfileService} from '../../../services/profile.service';
import {patternValidator} from "../../../helpers/pattern-validator";
import {NUMBERS_ONLY_PATTERN} from "../../../constants/general";
import {checkSkillRating} from "../../../helpers/check-skill-rating";

@Component({
  selector: 'app-save-programming-skills-dialog',
  templateUrl: './save-programming-skills-dialog.component.html',
  styleUrls: ['./save-programming-skills-dialog.component.css']
})
export class SaveProgrammingSkillsDialogComponent implements OnInit {

  skillsForm;
  editData;
  edit;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private dialog: MatDialogRef<SaveProgrammingSkillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    this.skillsForm = this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        rating: ['', [Validators.required, patternValidator(NUMBERS_ONLY_PATTERN), checkSkillRating()]],
      })]);

    this.edit = !!data;

    if (data) {
      this.editData = data;
      this.skills[0].patchValue(data);
    }
  }

  ngOnInit(): void {
  }

  get skills() {
    return this.skillsForm.controls;
  }

  saveSkill() {
    const formValue = this.skillsForm.value;
    this.isSubmitted = true;
    if (this.skillsForm.valid) {

      if (!this.edit) {
        this.profileService.addSkills(formValue).subscribe(() => {
          this.dialog.close();
        });
      } else {
        formValue[0].index = this.editData.index;
        this.profileService.updateSkillsInfo(formValue[0]).subscribe(() => {
          this.dialog.close();
        });
      }
    }
  }


}
