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

}
