import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSite } from './create-site';

describe('CreateSite', () => {
  let component: CreateSite;
  let fixture: ComponentFixture<CreateSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
