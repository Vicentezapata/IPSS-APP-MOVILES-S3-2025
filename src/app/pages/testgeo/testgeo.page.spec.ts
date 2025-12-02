import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestgeoPage } from './testgeo.page';

describe('TestgeoPage', () => {
  let component: TestgeoPage;
  let fixture: ComponentFixture<TestgeoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestgeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
