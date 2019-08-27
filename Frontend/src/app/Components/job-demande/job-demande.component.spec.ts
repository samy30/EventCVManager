import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDemandeComponent } from './job-demande.component';

describe('JobDemandeComponent', () => {
  let component: JobDemandeComponent;
  let fixture: ComponentFixture<JobDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
