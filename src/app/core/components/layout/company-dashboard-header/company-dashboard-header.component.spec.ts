import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardHeaderComponent } from './company-dashboard-header.component';

describe('CompanyDashboardHeaderComponent', () => {
  let component: CompanyDashboardHeaderComponent;
  let fixture: ComponentFixture<CompanyDashboardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDashboardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
