import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenedPage } from './screened.page';

describe('ScreenedPage', () => {
  let component: ScreenedPage;
  let fixture: ComponentFixture<ScreenedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
