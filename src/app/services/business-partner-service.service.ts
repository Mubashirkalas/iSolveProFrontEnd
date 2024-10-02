import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commissions } from '../models/model-commissions';


@Injectable({
  providedIn: 'root'
})
export class BusinessPartnerService {

  private apiUrl = 'http://173.212.251.175:8085/api/BusinessPartner'

  constructor(private http: HttpClient) {}

  getBusinessPartners(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
}

getCommissionsByUserId(userId: string): Observable<Commissions> {
  return this.http.get<Commissions>(`${this.apiUrl}/user/${userId}`);
}

getBusinessPartnerNameByUserId(userId: string): Observable<string> {
  return this.http.get<string>(`${this.apiUrl}/GetBusinessPartnerName/${userId}`, { responseType: 'text' as 'json' });
}

}