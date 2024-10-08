import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userId: string = '';
  password: string = '';
  errorMessage: string = '';


constructor(private authService: AuthService, private router: Router){}




login() {
  
  this.authService.login(this.userId, this.password).subscribe(
    response => {
       // Handle successful login
       if (response && response.token && response.userId) {
        localStorage.setItem('token', response.token);  // Save token in localStorage
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userName', response.businessPartnerName); // Save user name
          localStorage.setItem('role', response.partyType); // Save party type
          
        this.router.navigateByUrl('/dashboard').then(() => {
          window.location.reload();  // Reload after navigating to the target route
        });
      } else {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    },
    error => {
      // Handle error response
      this.errorMessage = 'Invalid credentials. Please try again.';
    }
  );
}
}
