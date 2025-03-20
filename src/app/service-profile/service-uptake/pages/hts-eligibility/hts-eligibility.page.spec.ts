import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HtsEligibilityPage } from './hts-eligibility.page';

describe('HtsEligibilityPage', () => {
  let component: HtsEligibilityPage;
  let fixture: ComponentFixture<HtsEligibilityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HtsEligibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
