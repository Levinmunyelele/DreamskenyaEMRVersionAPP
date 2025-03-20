import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrepRastPage } from './prep-rast.page';

describe('PrepRastPage', () => {
  let component: PrepRastPage;
  let fixture: ComponentFixture<PrepRastPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepRastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
