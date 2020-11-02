import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-job-creation-step1',
  templateUrl: './job-creation-step1.component.html',
  styleUrls: ['./job-creation-step1.component.css']
})
export class JobCreationStep1Component implements OnInit {

  @Input('group') step1Group: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  dateChanged(e, f) {

  }

}
