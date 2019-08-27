import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDemandeDetailComponent } from './job-demande-detail.component';

describe('JobDemandeDetailComponent', () => {
  let component: JobDemandeDetailComponent;
  let fixture: ComponentFixture<JobDemandeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDemandeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDemandeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
