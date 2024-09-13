import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelBlock } from '../models/model-block';
import { ModelSubCompany } from '../models/model-sub-company';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  constructor(private http: HttpClient) { }

  addBlock(model: ModelBlock): Observable<void> {
    debugger
    console.log("Block Model", model);
    return this.http.post<void>(`https://localhost:7072/api/Block`, model);//give your Api full path here
  }
  EditBlocks(id: number): Observable<any> {
    return this.http.get(`https://localhost:7072/api/Block/${id}`);
  }
  getAllBlocks(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7072/api/Block');
  }
  deleteBlock(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7072/api/Block/${id}`);
  }
      
  updateBlock(id: number, updatedBlock: any): Observable<any> {
    return this.http.put(`https://localhost:7072/api/Block/${id}`, updatedBlock);
  }
  getCompanies(): Observable<ModelSubCompany[]> {
    return this.http.get<ModelSubCompany[]>(`https://localhost:7072/api/SubCompany`);
  }
}
