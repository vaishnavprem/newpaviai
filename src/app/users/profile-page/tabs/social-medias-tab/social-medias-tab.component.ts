import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UploadPdfDialogComponent} from '../../../../core/components/dialogs/upload-pdf-dialog/upload-pdf-dialog.component';
import {AddSocialLinksDialogComponent} from '../../../../core/components/dialogs/add-social-links-dialog/add-social-links-dialog.component';

@Component({
  selector: 'app-social-medias-tab',
  templateUrl: './social-medias-tab.component.html',
  styleUrls: ['./social-medias-tab.component.css']
})
export class SocialMediasTabComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  showUploadPdfDialog() {
    this.matDialog.open(UploadPdfDialogComponent).afterClosed().subscribe(dt => {

    });
  }

  showAddSocialLinksDialog() {
    this.matDialog.open(AddSocialLinksDialogComponent).afterClosed().subscribe(dt => {

    });
  }

}
