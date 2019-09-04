import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseEditionComponent } from './enterprise-edition.component';

describe('EnterpriseEditionComponent', () => {
  let component: EnterpriseEditionComponent;
  let fixture: ComponentFixture<EnterpriseEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
