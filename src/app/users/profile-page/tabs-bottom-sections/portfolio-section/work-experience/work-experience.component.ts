import {Component, OnInit} from '@angular/core';
import {SaveWorkExperienceDialogComponent} from '../../../../../core/components/dialogs/save-work-experience-dialog/save-work-experience-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ProfileService} from '../../../../../core/services/profile.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  showingEditDeleteBtns = true;
  workExperience = [];

  constructor(
    private matDialog: MatDialog,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.getWorkExperience();
  }

  getWorkExperience() {
    this.profileService.getWorkExperience({}).subscribe((dt: any) => {
      this.workExperience = dt;
    });
  }


  addWorkExperience() {
    this.matDialog.open(SaveWorkExperienceDialogComponent).afterClosed().subscribe(dt => {
      this.getWorkExperience();
    });
  }

  showEditDeleteBtns() {
    this.showingEditDeleteBtns = !this.showingEditDeleteBtns;
  }

  showEditDialog(data) {
    this.matDialog.open(SaveWorkExperienceDialogComponent, {data}).afterClosed().subscribe(dt => {
      this.getWorkExperience();
    });
  }

  removeExperience(experience) {
    this.profileService.removeWorkExperience({index: experience.index}).subscribe((dt: any) => {
      this.getWorkExperience();
    });
  }

}
