import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeVisitPage } from './home-visit.page';

describe('HomeVisitPage', () => {
  let component: HomeVisitPage;
  let fixture: ComponentFixture<HomeVisitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
