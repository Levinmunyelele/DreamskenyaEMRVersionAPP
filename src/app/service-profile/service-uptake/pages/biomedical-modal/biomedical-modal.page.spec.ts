import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomedicalModalPage } from './biomedical-modal.page';

describe('BiomedicalModalPage', () => {
  let component: BiomedicalModalPage;
  let fixture: ComponentFixture<BiomedicalModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomedicalModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
