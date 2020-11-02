import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InvitationDialogComponent} from '../../core/components/dialogs/invitation-dialog/invitation-dialog.component';

@Component({
  selector: 'app-find-employees',
  templateUrl: './find-employees.component.html',
  styleUrls: ['./find-employees.component.css']
})
export class FindEmployeesComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openInvitationDialog() {
    this.matDialog.open(InvitationDialogComponent).afterClosed().subscribe(dt => {

    });
  }

}
