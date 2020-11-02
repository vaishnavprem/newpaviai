import {Component, OnInit} from '@angular/core';
import {SaveEducationDialogComponent} from '../../../../../core/components/dialogs/save-education-dialog/save-education-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ProfileService} from '../../../../../core/services/profile.service';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
    showingEditDeleteBtns = false;
    educationInfo = [];

    constructor(
        private matDialog: MatDialog,
        private profileService: ProfileService
    ) {
    }

    ngOnInit(): void {
        this.getEducationInfo();
    }

    addEducationInfo() {
        this.matDialog.open(SaveEducationDialogComponent, {
            width: '500px',
            // height: '1000px'
        }).afterClosed().subscribe(dt => {
            this.getEducationInfo();
        });
    }

    getEducationInfo() {
        this.profileService.getEducationInfo({}).subscribe((dt: any) => {
            this.educationInfo = dt;
        });
    }

    showEditDeleteBtns() {
        this.showingEditDeleteBtns = !this.showingEditDeleteBtns;
    }

    showEditDialog(data) {
        this.matDialog.open(SaveEducationDialogComponent, {data}).afterClosed().subscribe(dt => {
            this.getEducationInfo();
        });
    }

    removeEducationInfo(education) {
        this.profileService.removeEducationInfo({index: education.index}).subscribe(() => {
            this.getEducationInfo();
        });
    }

}
