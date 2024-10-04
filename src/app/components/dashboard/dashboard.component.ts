import { Component,OnInit,AfterViewInit } from '@angular/core';
import { ProjectService } from '../../services/project-inventory.service';
import { Project } from '../../models/model-projects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  projects: Project[] = [];

  constructor(private router: Router,private projectService: ProjectService) {}

  ngAfterViewInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  viewDetails(projectId: number) {
    const selectedProject = this.projects.find(project => project.id === projectId);
    this.projectService.setSelectedProject(selectedProject);
    this.router.navigate(['/projectDetails']);
  }

  getFullFilePath(filePath: string): string {
    return `http://173.212.251.175:8085/${filePath}`;
}


}
