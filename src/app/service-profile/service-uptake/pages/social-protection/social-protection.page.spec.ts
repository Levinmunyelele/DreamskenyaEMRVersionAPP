import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialProtectionPage } from './social-protection.page';

describe('SocialProtectionPage', () => {
  let component: SocialProtectionPage;
  let fixture: ComponentFixture<SocialProtectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialProtectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
