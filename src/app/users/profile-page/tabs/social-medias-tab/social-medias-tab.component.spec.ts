import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediasTabComponent } from './social-medias-tab.component';

describe('SocialMediasTabComponent', () => {
  let component: SocialMediasTabComponent;
  let fixture: ComponentFixture<SocialMediasTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediasTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediasTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
