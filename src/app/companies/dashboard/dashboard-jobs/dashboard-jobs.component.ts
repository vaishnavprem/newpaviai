import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ShowConfirmDialogComponent} from '../../../core/components/dialogs/show-confirm-dialog/show-confirm-dialog.component';

@Component({
  selector: 'app-dashboard-jobs',
  templateUrl: './dashboard-jobs.component.html',
  styleUrls: ['./dashboard-jobs.component.css']
})
export class DashboardJobsComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  showConfirmDialog() {
    this.matDialog.open(ShowConfirmDialogComponent).afterClosed().subscribe(dt => {
    });
  }


}
