import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelAnnouncement } from '../models/model-announcement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  constructor(private http: HttpClient) { }

  addAnnouncement(model: ModelAnnouncement): Observable<void> {
    debugger
    console.log("Anouncement Model", model);
    return this.http.post<void>(`https://localhost:7163/api/Employee/AddEmployee`, model);//give your Api full path here
  }
}
