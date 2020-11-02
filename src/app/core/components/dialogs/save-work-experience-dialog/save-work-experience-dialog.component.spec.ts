import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWorkExperienceDialogComponent } from './save-work-experience-dialog.component';

describe('SaveWorkExperienceDialogComponent', () => {
  let component: SaveWorkExperienceDialogComponent;
  let fixture: ComponentFixture<SaveWorkExperienceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveWorkExperienceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWorkExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
