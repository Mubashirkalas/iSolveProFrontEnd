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
  includeFloorPlan: boolean = true;
  installmentDates: Date[] = [];
  startDate: Date = new Date('2024-10-05');

  
  

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
          this.generateInstallmentDates();
        },
        (error) => {
          console.error('Error fetching installment plans:', error);
          this.isLoading = false;
          this.hasError = true;
        }
      );
    }
  }


  generateInstallmentDates(): void {
    const numberOfInstallments = this.installmentPlans.length;
    let currentDate = new Date(this.startDate);

    for (let i = 0; i < numberOfInstallments; i++) {
      this.installmentDates.push(new Date(currentDate)); // Push the current date to the array
      currentDate.setMonth(currentDate.getMonth() + 1); // Increment the month
    }
  }


  printPage() {
    // Temporarily hide the floor plan image if the user doesn't want it in the print version
    const floorPlanElement = document.querySelector('.payment-plan-image') as HTMLElement;
    if (floorPlanElement && !this.includeFloorPlan) {
      floorPlanElement.style.display = 'none';
    }

    // Trigger print
    window.print();

    // Restore the floor plan visibility after print if it was hidden
    if (floorPlanElement && !this.includeFloorPlan) {
      floorPlanElement.style.display = 'block';
    }
  }

//   getTotalPercentage(): number {
//     let totalDue = 0;
//     let totalAmount = 0;

//     this.installmentPlans.forEach(plan => {
//         totalDue += Number(plan.due) || 0; // Convert to number, default to 0 if NaN
//         totalAmount += Number(plan.amount) || 0; // Convert to number, default to 0 if NaN
//     });

//     return totalAmount > 0 ? (totalDue / totalAmount) * 100 : 0;
// }
getTotalPercentage(): number {
  return 100; // Default to 100%
}

getTotalAmount(): number {
    return this.installmentPlans.reduce((total, plan) => total + (Number(plan.amount) || 0), 0);
}

formatDuePercentage(due: string): string {
  // Remove the '%' sign and parse the number
  const percentage = parseFloat(due.replace('%', ''));
  
  // Format it to one decimal place and return it with '%' sign
  return percentage.toFixed(1) + '%';
}
  
}
