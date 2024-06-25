import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditEntryPage } from './add-edit-entry.page';

describe('AddEditEntryPage', () => {
  let component: AddEditEntryPage;
  let fixture: ComponentFixture<AddEditEntryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
