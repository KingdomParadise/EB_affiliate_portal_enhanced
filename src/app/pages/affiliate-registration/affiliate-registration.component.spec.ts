import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateRegistrationComponent } from './affiliate-registration.component';

describe('AffiliateRegistrationComponent', () => {
  let component: AffiliateRegistrationComponent;
  let fixture: ComponentFixture<AffiliateRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliateRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
