import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindNewEmployeeComponent } from './find-new-employee.component';

describe('FindNewEmployeeComponent', () => {
  let component: FindNewEmployeeComponent;
  let fixture: ComponentFixture<FindNewEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindNewEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindNewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
