import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProgrammingSkillsDialogComponent } from './save-programming-skills-dialog.component';

describe('SaveProgrammingSkillsDialogComponent', () => {
  let component: SaveProgrammingSkillsDialogComponent;
  let fixture: ComponentFixture<SaveProgrammingSkillsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProgrammingSkillsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProgrammingSkillsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
