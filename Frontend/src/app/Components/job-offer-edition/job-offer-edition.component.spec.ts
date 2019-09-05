import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferEditionComponent } from './job-offer-edition.component';

describe('JobOfferEditionComponent', () => {
  let component: JobOfferEditionComponent;
  let fixture: ComponentFixture<JobOfferEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOfferEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
