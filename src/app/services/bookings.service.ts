import { Injectable } from '@angular/core';
import { Booking } from '../models/model-booking';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private apiUrl = 'https://localhost:7026/api/Bookings';

  constructor(private http: HttpClient,private authService: AuthService) {}

  loadBookings(projectStatus: string): Observable<Booking[]> {
    const userId = this.authService.getUserId(); // Get user ID from AuthService
    
    if (!userId) {
      throw new Error('User ID is required to load bookings.');
    }

    const params = { userId, projectStatus };

    // Make API call to get bookings by userId
    return this.http.get<Booking[]>(this.apiUrl, { params });
  }
}
  
