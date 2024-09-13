import { Component } from '@angular/core';
import { ProjectService } from '../../services/project-inventory.service';
import { Project } from '../../models/model-projects';
import { MarketingMaterials } from '../../models/model-project-material';

@Component({
  selector: 'app-project-materials',
  templateUrl: './project-materials.component.html',
  styleUrl: './project-materials.component.css'
})
export class ProjectMaterialsComponent {

  selectedProject: Project | null = null;
  marketingMaterials: { name: string; link: string; type: string }[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.selectedProject$.subscribe(project => {
      this.selectedProject = project;
      if (project) {
        this.loadMarketingMaterials();
      } else {
        this.marketingMaterials = [];
      }
    });
  }

  loadMarketingMaterials(): void {
    // Example static data
    this.marketingMaterials = [
      { name: 'Project Brochure', link: 'assets/brochure.pdf', type: 'brochure' },
      { name: 'Project Image', link: 'assets/images.zip', type: 'image' },
      { name: 'Project Video', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'video' },
      { name: 'Project Floorplan', link: 'assets/floorplans.zip', type: 'floorplan' }
    ];
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const material = {
            name: file.name,
            link: reader.result as string,
            type: this.getFileType(file)
          };
          this.marketingMaterials.push(material);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  uploadFiles(): void {
    // Handle file upload logic if needed (e.g., saving to local storage, etc.)
    console.log('Files uploaded:', this.marketingMaterials);
  }

  getFileType(file: File): string {
    if (file.type.startsWith('image/')) {
      return 'image';
    } else if (file.type.startsWith('video/')) {
      return 'video';
    } else if (file.type === 'application/pdf') {
      return 'link'; // PDF as a link for download
    } else {
      return 'link'; // Default to link for other types
    }
  }
}