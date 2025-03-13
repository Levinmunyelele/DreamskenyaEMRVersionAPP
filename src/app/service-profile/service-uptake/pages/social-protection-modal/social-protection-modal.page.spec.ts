import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialProtectionModalPage } from './social-protection-modal.page';

describe('SocialProtectionModalPage', () => {
  let component: SocialProtectionModalPage;
  let fixture: ComponentFixture<SocialProtectionModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialProtectionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
