import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferListingComponent } from './job-offer-listing.component';

describe('JobOfferListingComponent', () => {
  let component: JobOfferListingComponent;
  let fixture: ComponentFixture<JobOfferListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOfferListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
