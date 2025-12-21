import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSiteOverview } from './open-site-overview';

describe('OpenSiteOverview', () => {
  let component: OpenSiteOverview;
  let fixture: ComponentFixture<OpenSiteOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenSiteOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSiteOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
