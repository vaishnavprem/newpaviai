import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMoreArchiveJobsComponent } from './dashboard-more-archive-jobs.component';

describe('DashboardMoreArchiveJobsComponent', () => {
  let component: DashboardMoreArchiveJobsComponent;
  let fixture: ComponentFixture<DashboardMoreArchiveJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMoreArchiveJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMoreArchiveJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
