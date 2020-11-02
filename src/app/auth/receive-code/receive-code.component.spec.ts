import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveCodeComponent } from './receive-code.component';

describe('ReceiveCodeComponent', () => {
  let component: ReceiveCodeComponent;
  let fixture: ComponentFixture<ReceiveCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
