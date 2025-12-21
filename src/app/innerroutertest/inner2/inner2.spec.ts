import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inner2 } from './inner2';

describe('Inner2', () => {
  let component: Inner2;
  let fixture: ComponentFixture<Inner2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inner2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inner2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
