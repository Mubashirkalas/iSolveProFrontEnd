import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Allow access to the route
      return true;
    } else {
      // Redirect to login if no token
      this.router.navigate(['/login']);
      return false;
    }
  }
}