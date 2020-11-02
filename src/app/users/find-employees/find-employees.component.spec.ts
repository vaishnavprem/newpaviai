import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEmployeesComponent } from './find-employees.component';

describe('FindEmployeesComponent', () => {
  let component: FindEmployeesComponent;
  let fixture: ComponentFixture<FindEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
