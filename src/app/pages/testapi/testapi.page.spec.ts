import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestapiPage } from './testapi.page';

describe('TestapiPage', () => {
  let component: TestapiPage;
  let fixture: ComponentFixture<TestapiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestapiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
