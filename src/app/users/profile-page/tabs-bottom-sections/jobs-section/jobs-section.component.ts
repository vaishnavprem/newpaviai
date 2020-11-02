import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {OWL_CAROUSEL_OPTIONS} from '../../../../core/constants/general';
import {SaveWorkExperienceDialogComponent} from '../../../../core/components/dialogs/save-work-experience-dialog/save-work-experience-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-jobs-section',
  templateUrl: './jobs-section.component.html',
  styleUrls: ['./jobs-section.component.css']
})
export class JobsSectionComponent implements OnInit {
  owlOptions: OwlOptions = OWL_CAROUSEL_OPTIONS;
  showAllJobs = false;

  constructor(

  ) { }

  ngOnInit(): void {
  }



}
