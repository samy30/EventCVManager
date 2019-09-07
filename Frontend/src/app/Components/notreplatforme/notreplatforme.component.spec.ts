import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotreplatformeComponent } from './notreplatforme.component';

describe('NotreplatformeComponent', () => {
  let component: NotreplatformeComponent;
  let fixture: ComponentFixture<NotreplatformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotreplatformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotreplatformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
