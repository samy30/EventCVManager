import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Scroll2Component } from './scroll2.component';

describe('Scroll2Component', () => {
  let component: Scroll2Component;
  let fixture: ComponentFixture<Scroll2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Scroll2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Scroll2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
