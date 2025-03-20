import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrollmentFormPage } from './enrollment-form.page';

describe('EnrollmentFormPage', () => {
  let component: EnrollmentFormPage;
  let fixture: ComponentFixture<EnrollmentFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
