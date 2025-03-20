import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherModalPage } from './other-modal.page';

describe('OtherModalPage', () => {
  let component: OtherModalPage;
  let fixture: ComponentFixture<OtherModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
