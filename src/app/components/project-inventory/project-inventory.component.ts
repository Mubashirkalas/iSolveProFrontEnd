import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ProjectInventoryDetail } from '../../models/model-project-inventory';
import { ProjectService } from '../../services/project-inventory.service';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Project } from '../../models/model-projects';
import { RouterModule } from '@angular/router';
import { PaymentPlanService } from '../../services/payment-plan.service';

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
  // selectedDetail: ProjectInventoryDetail | null = null;
  selectedDetail: ProjectInventoryDetail = {
   
        serialNo: '',
        propertyDescription: '',
        blockName: '',
        areaName: '',
        status: '',
        projectSerialNo: '',
        salesPrice: 0,
        sNo: 0,
        srno: '',
        financialYear: ''
    };

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute, private router: Router,
    private paymentPlanService : PaymentPlanService
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

  download(srno: string, sNo: number,financialYear: string): void {
    this.projectService.downloadFile(srno, sNo, financialYear).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${srno}_${sNo}_${financialYear}.file`; // Adjust the file name as needed
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('File download error:', error);
      alert('Failed to download the file.');
    });
  }
  goToPaymentPlan(projectSerialNo: string | undefined): void {
   

    
    if (this.selectedDetail) {
      const { sNo, srno, financialYear } = this.selectedDetail;

      console.log('Setting serialNo:', projectSerialNo, 'sNo:', sNo, 'srno:', srno, 'financialYear:', financialYear);

      // Create URL with query parameters
      this.paymentPlanService.setPaymentPlanDetails(projectSerialNo || '', sNo, srno, financialYear);

      // Open the payment plan in a new tab without passing values in the URL
      window.open('/payment-plan', '_blank');
    } else {
      console.error('selectedDetail is not defined');
    }
}
  // goToPaymentPlan(projectSerialNo: string): void {
  //   debugger
  //   console.log('goToPaymentPlan called with serialNo:', projectSerialNo);
  //  const url = this.router.createUrlTree(['/payment-plan', projectSerialNo]).toString();
  //   window.open(url, '_blank');
  // } 

  }


