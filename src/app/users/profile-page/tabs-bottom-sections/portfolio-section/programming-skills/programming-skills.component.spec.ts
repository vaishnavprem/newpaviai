import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingSkillsComponent } from './programming-skills.component';

describe('ProgrammingSkillsComponent', () => {
  let component: ProgrammingSkillsComponent;
  let fixture: ComponentFixture<ProgrammingSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammingSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
