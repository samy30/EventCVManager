import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobRequestsComponent } from './admin-job-requests.component';

describe('AdminJobRequestsComponent', () => {
  let component: AdminJobRequestsComponent;
  let fixture: ComponentFixture<AdminJobRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminJobRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJobRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
