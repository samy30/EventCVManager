import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferDisplayComponent } from './job-offer-display.component';

describe('JobOfferDisplayComponent', () => {
  let component: JobOfferDisplayComponent;
  let fixture: ComponentFixture<JobOfferDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOfferDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
