import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelFloor } from '../models/model-floor';
import { ModelSubCompany } from '../models/model-sub-company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  constructor(private http: HttpClient) { }

  addFloor(model: ModelFloor): Observable<void> {
    debugger
    console.log("Floor Model", model);
    return this.http.post<void>(`https://localhost:7072/api/Floor`, model);//give your Api full path here
  }
  EditFloors(id: number): Observable<any> {
    return this.http.get(`https://localhost:7072/api/Floor/${id}`);
  }
  getAllFloors(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7072/api/Floor');
  }
  deleteFloor(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7072/api/Floor/${id}`);
  }
      
  updateFloor(id: number, updatedBlock: any): Observable<any> {
    return this.http.put(`https://localhost:7072/api/Floor/${id}`, updatedBlock);
  }
  getCompanies(): Observable<ModelSubCompany[]> {
    return this.http.get<ModelSubCompany[]>(`https://localhost:7072/api/SubCompany`);
  }
}
