import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSpecialistComponent } from './job-specialist.component';

describe('JobSpecialistComponent', () => {
  let component: JobSpecialistComponent;
  let fixture: ComponentFixture<JobSpecialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSpecialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
