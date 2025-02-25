import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsSummarryPage } from './patients-summarry.page';

describe('PatientsSummarryPage', () => {
  let component: PatientsSummarryPage;
  let fixture: ComponentFixture<PatientsSummarryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsSummarryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
