import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAffiliationsComponent } from './company-affiliations.component';

describe('CompanyAffiliationsComponent', () => {
  let component: CompanyAffiliationsComponent;
  let fixture: ComponentFixture<CompanyAffiliationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAffiliationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAffiliationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
