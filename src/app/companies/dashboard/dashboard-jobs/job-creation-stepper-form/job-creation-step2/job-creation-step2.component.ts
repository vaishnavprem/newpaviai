import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-job-creation-step2',
  templateUrl: './job-creation-step2.component.html',
  styleUrls: ['./job-creation-step2.component.css']
})
export class JobCreationStep2Component implements OnInit {
  @Input('group') step2Group: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

}
