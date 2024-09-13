import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ProjectInventoryDetail } from '../../models/model-project-inventory';
import { ProjectService } from '../../services/project-inventory.service';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Project } from '../../models/model-projects';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-project-inventory',
  templateUrl: './project-inventory.component.html',
  styleUrl: './project-inventory.component.css'
})
export class ProjectInventoryComponent implements AfterViewInit {
  projectDetails: ProjectInventoryDetail[] = [];
  groupedProjectDetails: { [blockName: string]: ProjectInventoryDetail[] } = {};
  selectedProject:  any;
  selectedDetail: ProjectInventoryDetail | null = null;
  

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute, private router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.projectService.selectedProject$.subscribe(project => {
      this.selectedProject = project;
      this.fetchProjectDetails(); // Fetch details when a project is selected
    });


    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.fetchProjectDetails();
    });
   
    
  // Fetch details initially as well
  this.fetchProjectDetails();
  }

  fetchProjectDetails(): void {
    if (this.selectedProject && this.selectedProject.id) {
      this.projectService.getProjectInventoryDetails(this.selectedProject.id).subscribe({
        next: (data) => {
          this.projectDetails = data;
          this.groupByBlockName();
          console.log('Project Inventory Details:', this.projectDetails); // Check the details
        },
        error: (err) => {
          console.error('Error fetching project details:', err);
        }
      });
    } else {
      console.error('No project selected or project ID missing!');
    }
  }

  // fetchProjectDetails(): void {
  //   const projectId = +this.route.snapshot.paramMap.get('id')!;
  //   this.projectService.getProjectInventoryDetails(projectId).subscribe({
  //     next: (data) => {
  //       this.projectDetails = data;
  //       this.groupByBlockName(); // Group the data by block name
  //       console.log('Project Details:', this.groupedProjectDetails); // Display data in the console
  //     },
  //     error: (err) => {
  //       console.error('Error fetching project details:', err); // Handle error and display in the console
  //     }
  //   });
  // }

  groupByBlockName(): void {
    this.groupedProjectDetails = this.projectDetails.reduce((acc, detail) => {
      const blockName = detail.blockName || 'Unknown Block'; // Handle undefined blockName
      if (!acc[blockName]) {
        acc[blockName] = [];
      }
      acc[blockName].push(detail);
      return acc;
    }, {} as { [blockName: string]: ProjectInventoryDetail[] });
  }

  openModal(detail: ProjectInventoryDetail): void {
    this.selectedDetail = detail;
    const modalElement = document.getElementById('detailModal');
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  }


