import { Component,OnInit, AfterViewInit } from '@angular/core';
import { ProjectInventoryDetail } from '../../models/model-project-inventory';
import { ProjectService } from '../../services/project-inventory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrl: './payment-plan.component.css'
})
export class PaymentPlanComponent implements AfterViewInit{

  serialNo: string | null = null;
  projectDetails: ProjectInventoryDetail[] = [];
  selectedDetails: ProjectInventoryDetail[] = [];
  

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.serialNo = this.route.snapshot.paramMap.get('serialNo');

    if (this.serialNo) {
      this.fetchProjectDetails(this.serialNo);
    }
  }

  fetchProjectDetails(serialNo: string): void {
    this.projectService.getProjectInventoryDetailsByserialNo(serialNo).subscribe(
      (data: ProjectInventoryDetail[]) => {
        this.projectDetails = data;
        this.selectedDetails = data.filter(item => item.serialNo === serialNo);
        // You can also process the data here as needed
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  printPage() {
    window.print();
  }
  
}
