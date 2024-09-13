import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelSubCompany } from '../models/model-sub-company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCompanyService {

  constructor(private http: HttpClient) { }

  addSubCompany(model: ModelSubCompany): Observable<void> {
    debugger
    console.log("SubCompany Model", model);
    return this.http.post<void>(`https://localhost:7072/api/SubCompany`, model);//give your Api full path here
  }
  EditSubCompany(id: number): Observable<any> {
    return this.http.get(`https://localhost:7072/api/SubCompany/${id}`);
  }
  getAllSubCompany(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7072/api/SubCompany');
  }
  deleteSubCompany(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7072/api/SubCompany/${id}`);
  }
      
  updateSubCompany(id: number, updatedBlock: any): Observable<any> {
    return this.http.put(`https://localhost:7072/api/SubCompany/${id}`, updatedBlock);
  }
  getCompanies(): Observable<ModelSubCompany[]> {
    return this.http.get<ModelSubCompany[]>(`https://localhost:7072/api/SubCompany`);
  }
}
