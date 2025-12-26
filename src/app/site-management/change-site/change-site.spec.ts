import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSite } from './change-site';

describe('ChangeSite', () => {
  let component: ChangeSite;
  let fixture: ComponentFixture<ChangeSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
