import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/model-projects';
import { ProjectInventoryDetail } from '../models/model-project-inventory';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsApiUrl  = 'http://173.212.251.175:8085/api/Projects'
  private projectInventoryApiUrl = 'http://173.212.251.175:8085/api/ProjectInventory';


  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsApiUrl );
  }

   // Method to get details of a specific project by its SerialNo
   getProjectInventoryDetails(projectId: number): Observable<ProjectInventoryDetail> {
    return this.http.get<ProjectInventoryDetail>(`${this.projectInventoryApiUrl}/${projectId}`);
  }

  
  
}