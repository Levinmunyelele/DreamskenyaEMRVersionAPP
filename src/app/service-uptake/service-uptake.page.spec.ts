import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceUptakePage } from './service-uptake.page';

describe('ServiceUptakePage', () => {
  let component: ServiceUptakePage;
  let fixture: ComponentFixture<ServiceUptakePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceUptakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
