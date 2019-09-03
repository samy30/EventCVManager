import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseListingComponent } from './enterprise-listing.component';

describe('EnterpriseListingComponent', () => {
  let component: EnterpriseListingComponent;
  let fixture: ComponentFixture<EnterpriseListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
