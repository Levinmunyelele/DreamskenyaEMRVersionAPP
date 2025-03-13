import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostViolenceModalPage } from './post-violence-modal.page';

describe('PostViolenceModalPage', () => {
  let component: PostViolenceModalPage;
  let fixture: ComponentFixture<PostViolenceModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViolenceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
