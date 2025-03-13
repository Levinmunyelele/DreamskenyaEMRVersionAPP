import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostViolencePage } from './post-violence.page';

describe('PostViolencePage', () => {
  let component: PostViolencePage;
  let fixture: ComponentFixture<PostViolencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViolencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
