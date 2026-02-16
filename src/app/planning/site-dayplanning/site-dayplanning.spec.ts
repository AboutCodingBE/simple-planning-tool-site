import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDayplanning } from './site-dayplanning';

describe('SiteDayplanning', () => {
  let component: SiteDayplanning;
  let fixture: ComponentFixture<SiteDayplanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteDayplanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteDayplanning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
