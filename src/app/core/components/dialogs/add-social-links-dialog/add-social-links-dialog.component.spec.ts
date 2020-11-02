import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialLinksDialogComponent } from './add-social-links-dialog.component';

describe('AddSocialLinksDialogComponent', () => {
  let component: AddSocialLinksDialogComponent;
  let fixture: ComponentFixture<AddSocialLinksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSocialLinksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocialLinksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
