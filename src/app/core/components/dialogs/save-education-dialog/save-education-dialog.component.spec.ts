import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEducationDialogComponent } from './save-education-dialog.component';

describe('SaveEducationDialogComponent', () => {
  let component: SaveEducationDialogComponent;
  let fixture: ComponentFixture<SaveEducationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveEducationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveEducationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
