import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomyPage } from './homy.page';

describe('HomyPage', () => {
  let component: HomyPage;
  let fixture: ComponentFixture<HomyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
