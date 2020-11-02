import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardArchiveJobsComponent } from './dasboard-archive-jobs.component';

describe('DasboardArchiveJobsComponent', () => {
  let component: DasboardArchiveJobsComponent;
  let fixture: ComponentFixture<DasboardArchiveJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DasboardArchiveJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardArchiveJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
