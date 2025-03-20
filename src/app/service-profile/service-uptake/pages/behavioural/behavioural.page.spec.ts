import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviouralPage } from './behavioural.page';

describe('BehaviouralPage', () => {
  let component: BehaviouralPage;
  let fixture: ComponentFixture<BehaviouralPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviouralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
