import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreationStep3Component } from './job-creation-step3.component';

describe('JobCreationStep3Component', () => {
  let component: JobCreationStep3Component;
  let fixture: ComponentFixture<JobCreationStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCreationStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreationStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
