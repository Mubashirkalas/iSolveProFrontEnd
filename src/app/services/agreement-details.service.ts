import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgreementDetails } from '../models/model-agreement-details';

@Injectable({
  providedIn: 'root'
})
export class AgreementDetailsService {

  private apiUrl = 'https://localhost:7072/api/AgreementDetails';  
  

  constructor(private http: HttpClient) { }

  // createAgreement(agreementDetails: AgreementDetails ,files: { [key: string]: File | null }): Observable<any> {

  //   const formData = new FormData();
  //   formData.append('agreement', JSON.stringify(agreementDetails));

  //   for (const key in files) {
  //     if (files[key]) {
  //       formData.append(key, files[key]!);
  //     }
  //   }
  //   return this.http.post(this.apiUrl, formData);
  // }
  createAgreement(formData: FormData): Observable<any> {

    return this.http.post(this.apiUrl, formData);
  }

  
  getAgreements(): Observable<AgreementDetails[]> {
    return this.http.get<AgreementDetails[]>(this.apiUrl);
  }

  
  getAgreementById(id: number): Observable<AgreementDetails> {
    return this.http.get<AgreementDetails>(`${this.apiUrl}/${id}`);
  }

  
  updateAgreement(id: number, formData: FormData): Observable<any> {

   
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  
  deleteAgreement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadFile(file:File): Observable<any>
{
   const formData = new FormData();
   formData.append('file',file)
   return this.http.post(this.apiUrl,formData)
}
}

