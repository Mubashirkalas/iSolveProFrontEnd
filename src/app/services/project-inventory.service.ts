import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/model-projects';
import { ProjectInventoryDetail } from '../models/model-project-inventory';
import { FloorPlanDetail } from '../models/model-floor-plan';
import { BehaviorSubject } from 'rxjs';
import { InstallmentPlan } from '../models/model-installments';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsApiUrl  = 'http://173.212.251.175:8085/api/Projects'
  private projectInventoryApiUrl = 'http://173.212.251.175:8085/api/ProjectInventory';
  private upload = 'http://173.212.251.175:8085/api/ProjectInventory/upload';
 
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

   getFloorPlanDetails(): Observable<FloorPlanDetail[]> {
    return this.http.get<FloorPlanDetail[]>(`${this.projectInventoryApiUrl}`);
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

  uploadFile(formData: FormData): Observable<any> {
   
    return this.http.post(this.upload, formData, { responseType: 'text' });
}

downloadFile(srno: string, sNo: number,financialYear: string): Observable<Blob> {
  return this.http.get(`${this.projectInventoryApiUrl}/download?srno=${srno}&sNo=${sNo}&financialYear=${financialYear}`, {
    responseType: 'blob'
  });
}

getInstallmentPlans(serialNo: string, sNo?: number, srno?: string, financialYear?: string): Observable<InstallmentPlan[]> {
  const params = new HttpParams()
    .set('projectId', serialNo)
    .set('sNo', sNo?.toString() || '') // Convert to string if present
    .set('srno', srno || '') // Pass empty string if not present
    .set('financialYear', financialYear || ''); // Pass empty string if not present

  return this.http.get<InstallmentPlan[]>(`${this.projectInventoryApiUrl}/installment-plans`, { params });
}


  }