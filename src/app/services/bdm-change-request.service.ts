import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BDMChangeRequest } from '../models/model-bdm-change-request';
@Injectable({
  providedIn: 'root'
})
export class BdmChangeRequestService {

  private apiUrl = 'http://173.212.251.175:8085/api/BDMChangeRequest'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Get all BDM Change Requests
  getAllRequests(): Observable<BDMChangeRequest[]> {
    return this.http.get<BDMChangeRequest[]>(`${this.apiUrl}`);
  }

  // Add a new BDM Change Request
  addRequest(request: BDMChangeRequest): Observable<BDMChangeRequest> {
    
    return this.http.post<BDMChangeRequest>(`${this.apiUrl}`, request);
  }

  updateRequest(request: BDMChangeRequest): Observable<BDMChangeRequest> {
    return this.http.put<BDMChangeRequest>(`${this.apiUrl}/${request.id}`, request);
  }

   // Delete a BDM Change Request
   deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
