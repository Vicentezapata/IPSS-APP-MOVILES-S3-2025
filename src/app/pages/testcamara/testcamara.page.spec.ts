import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestcamaraPage } from './testcamara.page';

describe('TestcamaraPage', () => {
  let component: TestcamaraPage;
  let fixture: ComponentFixture<TestcamaraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcamaraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
