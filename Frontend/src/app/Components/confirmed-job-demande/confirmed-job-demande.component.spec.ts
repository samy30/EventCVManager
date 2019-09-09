import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedJobDemandeComponent } from './confirmed-job-demande.component';

describe('ConfirmedJobDemandeComponent', () => {
  let component: ConfirmedJobDemandeComponent;
  let fixture: ComponentFixture<ConfirmedJobDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedJobDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedJobDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
