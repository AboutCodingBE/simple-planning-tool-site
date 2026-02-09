import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlanning } from './detail-planning';

describe('DetailPlanning', () => {
  let component: DetailPlanning;
  let fixture: ComponentFixture<DetailPlanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPlanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPlanning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
