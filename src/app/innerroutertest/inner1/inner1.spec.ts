import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inner1 } from './inner1';

describe('Inner1', () => {
  let component: Inner1;
  let fixture: ComponentFixture<Inner1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inner1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inner1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
