import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessPartnerService {

  private apiUrl = 'https://localhost:7026/api/BusinessPartner'

  constructor(private http: HttpClient) {}

  getBusinessPartners(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
}

}