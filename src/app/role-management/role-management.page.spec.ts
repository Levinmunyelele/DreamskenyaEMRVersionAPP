import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleManagementPage } from './role-management.page';

describe('RoleManagementPage', () => {
  let component: RoleManagementPage;
  let fixture: ComponentFixture<RoleManagementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
