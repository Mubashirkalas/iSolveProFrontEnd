import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Realtor } from '../models/model-realtor';

@Injectable({
  providedIn: 'root'
})
export class RealtorService {

  private apiUrl = 'https://localhost:7026/api/Realtor/realtors';
  private updateapiUrl = 'https://localhost:7026/api/Realtor/UpdateRealtor';

  constructor(private http: HttpClient ) { }

  addRealtor(data: FormData): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, data);

  }

 getRealtors(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllRealtors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateRealtor(id: number,status:string, updatedRealtor: any): Observable<any> {
    return this.http.put(`${this.updateapiUrl}?id=${id}&status=${status}`, updatedRealtor);
  }

  deleteRealtor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
