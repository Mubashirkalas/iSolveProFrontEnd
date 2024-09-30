import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentPlanService {


  private paymentPlanDetails: { 
    projectSerialNo: string, 
    sNo?: number, 
    srno?: string, 
    financialYear?: string 
  } = { projectSerialNo: '', sNo: undefined, srno: undefined, financialYear: undefined };
  setPaymentPlanDetails(projectSerialNo: string, sNo?: number, srno?: string, financialYear?: string) {
    const details = { projectSerialNo, sNo, srno, financialYear };
    localStorage.setItem('paymentPlanDetails', JSON.stringify(details));
  }

  getPaymentPlanDetails() {
    const details = localStorage.getItem('paymentPlanDetails');
    return details ? JSON.parse(details) : { projectSerialNo: '', sNo: undefined, srno: undefined, financialYear: undefined };
  }
  // private projectSerialNo?: string;
  // private sNo?: number;
  // private srno?: string;
  // private financialYear?: string;

  // constructor() { }

  // setPaymentPlanDetails(serialNo: string, sNo?: number, srno?: string, financialYear?: string) {
  //   this.projectSerialNo = serialNo;
  //   this.sNo = sNo;
  //   this.srno = srno;
  //   this.financialYear = financialYear;
  // }

  // getPaymentPlanDetails() {
  //   return {
  //     projectSerialNo: this.projectSerialNo,
  //     sNo: this.sNo,
  //     srno: this.srno,
  //     financialYear: this.financialYear
  //   };
  // }
}
