import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreationStep1Component } from './job-creation-step1.component';

describe('JobCreationStep1Component', () => {
  let component: JobCreationStep1Component;
  let fixture: ComponentFixture<JobCreationStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCreationStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreationStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
