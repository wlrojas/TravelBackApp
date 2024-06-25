import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomMemoryPage } from './random-memory.page';

describe('RandomMemoryPage', () => {
  let component: RandomMemoryPage;
  let fixture: ComponentFixture<RandomMemoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMemoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
