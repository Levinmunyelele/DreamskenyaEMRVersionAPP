import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BioMedicalPage } from './bio-medical.page';

describe('BioMedicalPage', () => {
  let component: BioMedicalPage;
  let fixture: ComponentFixture<BioMedicalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BioMedicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
