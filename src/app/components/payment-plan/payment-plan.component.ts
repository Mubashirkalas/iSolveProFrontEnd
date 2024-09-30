import { Component,OnInit, AfterViewInit } from '@angular/core';
import { PaymentPlanService } from '../../services/payment-plan.service';

import { ProjectService } from '../../services/project-inventory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css'] 
})
export class PaymentPlanComponent implements OnInit{

  serialNo?: string;
  sNo?: number;
  srno?: string;
  financialYear?: string;
  installmentPlans: any[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  imageSrc?: string;
  
  

  constructor(private projectService: ProjectService, private route: ActivatedRoute,private paymentPlanService : PaymentPlanService) {}

  ngOnInit(): void {
    
    const details = this.paymentPlanService.getPaymentPlanDetails();
    this.serialNo = details.projectSerialNo;
    this.sNo = details.sNo;
    this.srno = details.srno;
    this.financialYear = details.financialYear;

    // Validate and proceed to fetch installment plans
    if (this.serialNo) {
      this.getInstallmentPlans();
    } else {
      console.error('No serial number found');
      this.isLoading = false;
      this.hasError = true;
    }
  }


  displayImage(srno: string, sNo: number, financialYear: string): void {
    this.projectService.downloadFile(srno, sNo, financialYear).subscribe(blob => {
      console.log('Received blob:', blob); // Log the blob
      if (blob) {
        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);
        this.imageSrc = url; // Set the image source
      } else {
        console.error('No blob data received.');
      }
    }, error => {
      console.error('Failed to load the image:', error);
      alert('Failed to load the image.');
    });
  }
  
  getInstallmentPlans(): void {
    
    if (this.serialNo) {
      this.projectService.getInstallmentPlans(this.serialNo, this.sNo, this.srno, this.financialYear).subscribe(
        (data) => {
          this.installmentPlans = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching installment plans:', error);
          this.isLoading = false;
          this.hasError = true;
        }
      );
    }
  }
  printPage() {
    window.print();
  }
  
}
