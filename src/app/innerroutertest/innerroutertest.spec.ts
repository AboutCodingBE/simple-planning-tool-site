import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Innerroutertest } from './innerroutertest';

describe('Innerroutertest', () => {
  let component: Innerroutertest;
  let fixture: ComponentFixture<Innerroutertest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Innerroutertest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Innerroutertest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
