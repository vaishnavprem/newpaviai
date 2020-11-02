import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-job-creation-step3',
  templateUrl: './job-creation-step3.component.html',
  styleUrls: ['./job-creation-step3.component.css']
})
export class JobCreationStep3Component implements OnInit {
  @Input('group') step3Group: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
