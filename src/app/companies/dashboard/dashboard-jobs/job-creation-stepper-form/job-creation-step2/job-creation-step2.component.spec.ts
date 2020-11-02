import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreationStep2Component } from './job-creation-step2.component';

describe('JobCreationStep2Component', () => {
  let component: JobCreationStep2Component;
  let fixture: ComponentFixture<JobCreationStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCreationStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreationStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
