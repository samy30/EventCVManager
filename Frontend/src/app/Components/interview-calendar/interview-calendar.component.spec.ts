import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCalendarComponent } from './interview-calendar.component';

describe('InterviewCalendarComponent', () => {
  let component: InterviewCalendarComponent;
  let fixture: ComponentFixture<InterviewCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
