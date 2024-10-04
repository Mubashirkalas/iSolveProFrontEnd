import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventReport } from '../models/model-event-report';

@Injectable({
  providedIn: 'root'
})
export class EventReportService {

  private apiUrl = 'http://173.212.251.175:8085/api/EventReport';

  constructor(private http: HttpClient) {}

  createEventReport(eventReport: EventReport): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, eventReport);
  }

  getAllEventReports(): Observable<EventReport[]> {
    return this.http.get<EventReport[]>(this.apiUrl);
  }

    // Update an existing event report
    updateEventReport(eventReport: EventReport): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${eventReport.eventId}`, eventReport);
    }

    getEventReportById(id: number): Observable<EventReport> {
      return this.http.get<EventReport>(`${this.apiUrl}/${id}`);
    }
    
  
    // Delete an event report by ID
    deleteEventReport(eventId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
    }

}
