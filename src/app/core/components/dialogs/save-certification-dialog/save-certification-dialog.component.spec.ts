import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCertificationDialogComponent } from './save-certification-dialog.component';

describe('SaveCertificationDialogComponent', () => {
  let component: SaveCertificationDialogComponent;
  let fixture: ComponentFixture<SaveCertificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCertificationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCertificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
