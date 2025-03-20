import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViolenceScreeningPage } from './violence-screening.page';

describe('ViolenceScreeningPage', () => {
  let component: ViolenceScreeningPage;
  let fixture: ComponentFixture<ViolenceScreeningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolenceScreeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
