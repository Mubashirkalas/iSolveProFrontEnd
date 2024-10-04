import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/model-projects';
import { ProjectInventoryDetail } from '../models/model-project-inventory';
import { MarketingMaterial } from '../models/model-marketing-material';

@Injectable({
  providedIn: 'root'
})
export class ProjectmaterialService {
  private projectsApiUrl  = 'http://173.212.251.175:8085/api/Projects'
  private projectInventoryApiUrl = 'http://173.212.251.175:8085/api/ProjectInventory';
  private apiUrl = 'http://173.212.251.175:8085/api/Projects/upload-materials';
  private url = 'http://173.212.251.175:8085/api/Projects';


  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url );
  }

   // Method to get details of a specific project by its SerialNo
   getProjectInventoryDetails(projectId: number): Observable<ProjectInventoryDetail> {
    return this.http.get<ProjectInventoryDetail>(`${this.projectInventoryApiUrl}/${projectId}`);
  }


  uploadMarketingMaterials(materials: MarketingMaterial): Observable<any> {
    const formData = new FormData();
    
    formData.append('serialNo', materials.serialNo.toString());
    if (materials.eBrochure) {
      formData.append('eBrochureFile', materials.eBrochure);
    }
    if (materials.photos) {
      formData.append('photosZipFile', materials.photos);
    }
    if (materials.floorplans) {
      formData.append('floorplansZipFile', materials.floorplans);
    }

    if (materials.projectphoto){
      formData.append('projectphoto',materials.projectphoto);
    }
    formData.append('videoLink', materials.videoLink);

    return this.http.post(this.apiUrl, formData);
  }
  

  getProjectBySerialNumber(serialNo: number): Observable<MarketingMaterial> {
    const params = new HttpParams().set('SerialNo', serialNo.toString());
    return this.http.get<MarketingMaterial>(`${this.url}/${serialNo}`, { params });
  }
  
}