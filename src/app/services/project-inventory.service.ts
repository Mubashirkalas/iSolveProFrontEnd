import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/model-projects';
import { ProjectInventoryDetail } from '../models/model-project-inventory';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsApiUrl  = 'https://localhost:7026/api/Projects'
  private projectInventoryApiUrl = 'https://localhost:7026/api/ProjectInventory';
  private selectedProjectSubject = new BehaviorSubject<any>(null);
  selectedProject$ = this.selectedProjectSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsApiUrl );
  }

   // Method to get details of a specific project by its SerialNo
   getProjectInventoryDetails(projectId: number): Observable<ProjectInventoryDetail[]>{
    return this.http.get<ProjectInventoryDetail[]>(`${this.projectInventoryApiUrl}/${projectId}`);
   }
   
    setSelectedProject(project: any) {
      this.selectedProjectSubject.next(project);
  }
   
   // Method to get distinct project inventory details (summary)
   getDistinctProjectInventoryDetails(projectId: number): Observable<ProjectInventoryDetail[]> {
    return this.http.get<ProjectInventoryDetail[]>(`${this.projectInventoryApiUrl}/${projectId}/summary`);
  }

  getProjectInventoryDetailsByserialNo(serialNo: string): Observable<ProjectInventoryDetail[]> {
    return this.http.get<ProjectInventoryDetail[]>(`${this.projectInventoryApiUrl}/${serialNo}`);
  }
  }