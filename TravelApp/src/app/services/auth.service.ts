import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FingerPrintAuth } from 'capacitor-fingerprint-auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly patternKey = 'userPattern';
  constructor(private router: Router) { }

  setPattern(pattern: string) {
    localStorage.setItem(this.patternKey, pattern);
  }

  validatePattern(pattern: string): boolean {
    const storedPattern = localStorage.getItem(this.patternKey);
    return storedPattern === pattern;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.patternKey) !== null;
  }

  logout(){
    localStorage.removeItem(this.patternKey);
    this.router.navigate(['/entries'])
  }
}
