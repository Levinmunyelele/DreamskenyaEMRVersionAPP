import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessFollowUpPage } from './business-follow-up.page';

describe('BusinessFollowUpPage', () => {
  let component: BusinessFollowUpPage;
  let fixture: ComponentFixture<BusinessFollowUpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFollowUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
