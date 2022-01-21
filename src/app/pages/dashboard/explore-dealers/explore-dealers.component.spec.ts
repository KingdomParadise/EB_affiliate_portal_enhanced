import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreDealersComponent } from './explore-dealers.component';

describe('ExploreDealersComponent', () => {
  let component: ExploreDealersComponent;
  let fixture: ComponentFixture<ExploreDealersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreDealersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
