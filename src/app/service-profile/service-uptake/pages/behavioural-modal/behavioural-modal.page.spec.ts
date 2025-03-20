import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviouralModalPage } from './behavioural-modal.page';

describe('BehaviouralModalPage', () => {
  let component: BehaviouralModalPage;
  let fixture: ComponentFixture<BehaviouralModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviouralModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
