import { Component ,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ProjectService } from '../services/project-inventory.service';
import { Project } from '../models/model-projects';
import { error } from 'console';
import { ProjectInventoryDetail } from '../models/model-project-inventory'; 
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit{
  projects: Project[] = [];
  showHeader: boolean = true;
  
  selectedProjectInventoryDetails: ProjectInventoryDetail | null = null;
  constructor(private router:Router,private zone: NgZone, private projectService:ProjectService,
    private authService: AuthService,
  ){}
  gotopage(){
    this.zone.run(() => {
      console.log('Button clicked inside Angular zone!');
    });
  }

  ngAfterViewInit(): void {
    this.loadProjects();

     // Listen to route changes
     this.router.events.subscribe(() => {
      // Hide header for login route
      const currentRoute = this.router.url;
      this.showHeader =!['/login', '/realtor'].includes(currentRoute) && !currentRoute.includes('/payment-plan'); // Change '/login' based on your login route
      
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }
  
    onProjectSelect(projectId: number): void {
      const selectedProject = this.projects.find(project => project.id === projectId);
    this.projectService.setSelectedProject(selectedProject);
    
      this.router.navigate(['/projectDetails']);
}

onProjectMaterialSelect(projectId: number): void {
  const selectedProject = this.projects.find(project => project.id === projectId);
  if (selectedProject) {
    this.projectService.setSelectedProject(selectedProject);
    this.router.navigate(['/project-materials']);
  }

}

logout() {
  this.authService.logout();  // Clear token
  this.router.navigate(['/login']);  // Redirect to login page
}
  
}