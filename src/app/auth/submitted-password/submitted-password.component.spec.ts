import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedPasswordComponent } from './submitted-password.component';

describe('SubmittedPasswordComponent', () => {
  let component: SubmittedPasswordComponent;
  let fixture: ComponentFixture<SubmittedPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
