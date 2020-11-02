import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConfirmDialogComponent } from './show-confirm-dialog.component';

describe('ShowConfirmDialogComponent', () => {
  let component: ShowConfirmDialogComponent;
  let fixture: ComponentFixture<ShowConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
