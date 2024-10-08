import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdatePasswordDto } from '../models/model-update-password';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl ='https://localhost:7026/api/BusinessPartner/login';
  private updatePasswordUrl = 'https://localhost:7026/api/BusinessPartner/update-password';
  
  constructor(private http: HttpClient) { }

// Mock function to check if the user is logged in
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');  // Adjust based on how you handle login
}

login(userId: string, password: string): Observable<any> {
  const loginData = { userId, password };
  return this.http.post<any>(this.apiUrl, loginData).pipe(
    tap(response => {

      
      if (response && response.Token) {

        
        localStorage.setItem('token', response.token);  // Save the JWT token
        localStorage.setItem('userId', response.userId);  // Save user ID
        localStorage.setItem('userName', response.businessPartnerName); // Save user name
        localStorage.setItem('role', response.partyType); // Changed from partytype to partyType
      }
    })
  );
}

logout(): void {
  localStorage.removeItem('token');  // Clear token on logout
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
}

getUserName(): string | null {
  return localStorage.getItem('userName');  // Retrieve the user's name
}

getpartyType(): string | null {
  return localStorage.getItem('role')
}

getUserId(): string | null {
  return localStorage.getItem('userId');
}

updatePassword(updatePasswordDto: UpdatePasswordDto) {
  const userId = this.getUserId();
  if (!userId) {
    throw new Error('User ID not found');
  }
  updatePasswordDto.userId = userId;
  console.log('Update Password DTO:', updatePasswordDto); // Debugging line
  return this.http.post(this.updatePasswordUrl, updatePasswordDto);

}
}