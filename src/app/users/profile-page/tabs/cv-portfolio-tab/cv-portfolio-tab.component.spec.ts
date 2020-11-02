import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPortfolioTabComponent } from './cv-portfolio-tab.component';

describe('CvPortfolioTabComponent', () => {
  let component: CvPortfolioTabComponent;
  let fixture: ComponentFixture<CvPortfolioTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvPortfolioTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvPortfolioTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
