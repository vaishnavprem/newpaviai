import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation-stepper-form.component.html',
  styleUrls: ['./job-creation-stepper-form.component.css']
})
export class JobCreationStepperFormComponent implements OnInit {
  currentStep = 1;
  jobForm;

  constructor(
    private fb: FormBuilder
  ) {
    this.jobForm = this.fb.group({
      step1Group: this.fb.group({
        date_opened: [''],
        country: [''],
        jobTitle: [''],
        employment: [''],
        city: [''],
        date_closed: ['']
      }),
      step2Group: this.fb.group({
        companyAddress: [''],
        level: [''],
        salary: [''],
        email: [''],
        category: [''],
      }),
      step3Group: this.fb.group({
        job_description: [''],
        assistant_job: ['']
      })
    });
  }

  ngOnInit(): void {
    console.log(this.jobForm.value)
  }

  stepChanged(e) {

  }

  get step1Group() {
    return this.jobForm.controls.step1Group as FormGroup;
  }

  get step2Group() {
    return this.jobForm.controls.step2Group as FormGroup;
  }

  get step3Group() {
    return this.jobForm.controls.step3Group as FormGroup;
  }
}
