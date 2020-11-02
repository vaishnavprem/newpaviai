import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SaveCertificationDialogComponent} from '../../../../../core/components/dialogs/save-certification-dialog/save-certification-dialog.component';
import {ProfileService} from '../../../../../core/services/profile.service';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {
  showingEditDeleteBtns = false;
  certifications;

  constructor(
    private matDialog: MatDialog,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.getCertificationInfo();
  }

  getCertificationInfo() {
    this.profileService.getCertifications({}).subscribe((dt: any) => {
      this.certifications = dt;
    });
  }

  addCertificationInfo() {
    this.matDialog.open(SaveCertificationDialogComponent).afterClosed().subscribe(dt => {
      this.getCertificationInfo();
    });
  }

  showEditDeleteBtns() {
    this.showingEditDeleteBtns = !this.showingEditDeleteBtns;
  }

  showEditDialog(data) {
    this.matDialog.open(SaveCertificationDialogComponent, {data}).afterClosed().subscribe(dt => {
      this.getCertificationInfo();
    });
  }

  removeCertification(data) {
    this.profileService.removeCertification({index: data.index}).subscribe(dt => {
      this.getCertificationInfo();
    });
  }

}
