import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreationStepperFormComponent } from './job-creation-stepper-form.component';

describe('JobCreationStepperFormComponent', () => {
  let component: JobCreationStepperFormComponent;
  let fixture: ComponentFixture<JobCreationStepperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCreationStepperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreationStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
