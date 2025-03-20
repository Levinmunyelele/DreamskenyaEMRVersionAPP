import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessAssessmentPage } from './business-assessment.page';

describe('BusinessAssessmentPage', () => {
  let component: BusinessAssessmentPage;
  let fixture: ComponentFixture<BusinessAssessmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAssessmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
