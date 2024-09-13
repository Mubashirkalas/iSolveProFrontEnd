import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelTeam } from '../models/model-team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) { }

  addTeam(model: ModelTeam): Observable<void> {
    debugger
    console.log("Team Model", model);
    return this.http.post<void>(`https://localhost:7163/api/Employee/AddEmployee`, model);//give your Api full path here
  }
  // Uncomment and implement if needed
  // getTeam(): Observable<TeamModel[]> {
  //   return this.http.get<TeamModel[]>(${this.apiUrl}/GetAll);
  // }
}
