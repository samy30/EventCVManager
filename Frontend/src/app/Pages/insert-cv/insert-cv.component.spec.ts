import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCVComponent } from './insert-cv.component';

describe('InsertCVComponent', () => {
  let component: InsertCVComponent;
  let fixture: ComponentFixture<InsertCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
