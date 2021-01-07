import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTermComponent } from './job-term.component';

describe('JobTermComponent', () => {
  let component: JobTermComponent;
  let fixture: ComponentFixture<JobTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
