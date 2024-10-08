import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-inventory.service';
import { ProjectmaterialService } from '../../services/project.service';
import { Project } from '../../models/model-projects';
import { MarketingMaterial } from '../../models/model-marketing-material';
import { MarketingMMaterial } from '../../models/model-marketing-material';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-project-materials',
  templateUrl: './project-materials.component.html',
  styleUrls: ['./project-materials.component.css'] 
})
export class ProjectMaterialsComponent implements OnInit{

  selectedProject: Project | null = null;
  isSuperAdmin: boolean = false;
  marketingMaterials: MarketingMaterial = {
    serialNo: 0, // Initialize with a default value
    eBrochure: null,
    photos: null,
    floorplans: null,
    projectphoto: null,
    videoLink: '',
    eBrochureFilePath: '',
    photosZipFilePath: '',
 floorplansZipFilePath: '',
 projectphotoFilePath: ''
  };

  fetchedMarketingMaterials: MarketingMaterial | null = null;



  constructor(private projectMaterialService: ProjectmaterialService, 
    private projectService:ProjectService, 
    private authService: AuthService) {}

  ngOnInit(): void {

    const role = this.authService.getpartyType();
    this.isSuperAdmin = role === 'Super Admin';

    this.projectService.selectedProject$.subscribe(project => {
      this.selectedProject = project;
      if (project) {
        this.marketingMaterials.serialNo = project.id;
        this.loadMarketingMaterials(project.id);
      }
    });
  }

  
  onFileChange(event: Event, type: 'eBrochure' | 'photos' | 'floorplans'|'projectphoto'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      if (type === 'eBrochure') {
        this.marketingMaterials.eBrochure = file;
      } else if (type === 'photos') {
        this.marketingMaterials.photos = file;
      } else if (type === 'floorplans') {
        this.marketingMaterials.floorplans = file;
      }
      else if (type === 'projectphoto'){
        this.marketingMaterials.projectphoto = file;
      }
    }
  }



  uploadFiles(): void {
    this.projectMaterialService.uploadMarketingMaterials(this.marketingMaterials).subscribe(
      response => {
        console.log('Upload successful:', response);
        this.loadMarketingMaterials(this.marketingMaterials.serialNo);
      },
      error => {
        console.error('Upload failed:', error);
      }
    );
  }


  loadMarketingMaterials(serialNo: number): void {
    this.projectMaterialService.getProjectBySerialNumber(serialNo).subscribe(
      materials => {
        this.fetchedMarketingMaterials = materials;
      },
      error => {
        console.error('Error fetching marketing materials:', error);
      }
    );
  }

  getFileType(filePath: string): string {
    const extension = filePath.split('.').pop();
    if (extension === 'pdf') {
      return 'brochure';
    } else if (extension === 'zip') {
      return 'zip';
    } else {
      return 'link';
    }
  }

  getFullFilePath(filePath: string): string {
    return `https://localhost:7026/${filePath}`;
  }
}