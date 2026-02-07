import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dayplanning } from './dayplanning';

describe('Dayplanning', () => {
  let component: Dayplanning;
  let fixture: ComponentFixture<Dayplanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dayplanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dayplanning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
