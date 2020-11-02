import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SaveProgrammingSkillsDialogComponent} from '../../../../../core/components/dialogs/save-programming-skills-dialog/save-programming-skills-dialog.component';
import {ProfileService} from '../../../../../core/services/profile.service';

@Component({
  selector: 'app-programming-skills',
  templateUrl: './programming-skills.component.html',
  styleUrls: ['./programming-skills.component.css']
})
export class ProgrammingSkillsComponent implements OnInit {
  showingEditDeleteBtns = false;
  skillsInfo = [];

  constructor(
    private matDialog: MatDialog,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.getSkillsInfo();
  }

  getSkillsInfo() {
    this.profileService.getSkillsInfo({}).subscribe((dt: any) => {
      this.skillsInfo = dt;
    });
  }

  addProgrammingSkills() {
    this.matDialog.open(SaveProgrammingSkillsDialogComponent).afterClosed().subscribe(dt => {
      this.getSkillsInfo();
    });
  }

  removeSkill(skill) {
    this.profileService.removeSkillsInfo({index: skill.index}).subscribe(dt => {
      this.getSkillsInfo();
    });
  }

  showEditDeleteBtns() {
    this.showingEditDeleteBtns = !this.showingEditDeleteBtns;
  }

  showEditDialog(data) {
    this.matDialog.open(SaveProgrammingSkillsDialogComponent, {data}).afterClosed().subscribe(dt => {
      this.getSkillsInfo();
    });
  }
}
