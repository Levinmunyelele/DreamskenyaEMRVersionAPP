import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StiScreeningPage } from './sti-screening.page';

describe('StiScreeningPage', () => {
  let component: StiScreeningPage;
  let fixture: ComponentFixture<StiScreeningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StiScreeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
