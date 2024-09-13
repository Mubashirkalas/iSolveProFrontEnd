import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl ='https://localhost:7026/api/BusinessPartner/login'
  
  constructor(private http: HttpClient) { }

// Mock function to check if the user is logged in
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');  // Adjust based on how you handle login
}

login(userId: string, password: string): Observable<any> {
  const loginData = { userId, password };
  return this.http.post<any>(this.apiUrl, loginData);
}

logout(): void {
  localStorage.removeItem('token');  // Clear token on logout
}
}