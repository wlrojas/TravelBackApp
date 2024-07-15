import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePage } from './welcome.page';
import { Router } from '@angular/router';

describe('WelcomePage', () => {
  let component: WelcomePage;
  let fixture: ComponentFixture<WelcomePage>;
  let router: Router

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar a la pestaña principal', () => {
    spyOn(router, 'navigate');

    component.navigateToEntries();

    expect(router.navigate).toHaveBeenCalledWith(['/entries']);
  });
});
