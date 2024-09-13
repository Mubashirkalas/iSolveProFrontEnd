import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelAssignTask } from '../models/model-assign-task';

@Injectable({
  providedIn: 'root'
})
export class AssignTaskService {
  constructor(private http: HttpClient) { }

  addAssignTask(model: ModelAssignTask): Observable<void> {
    debugger
    console.log("Assign Task Model", model);
    return this.http.post<void>(`https://localhost:7163/api/Employee/AddEmployee`, model);//give your Api full path here
  }
}
