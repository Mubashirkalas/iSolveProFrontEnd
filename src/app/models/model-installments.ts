export interface InstallmentPlan {
    serialNo: number;            // The serial number for the installment plan
    sNo:number;
    planName: string;            // The name of the plan
    noOfInstallment: number;     // The number of installments
    projectName: string;         // The project name associated with the plan
    description: string;         // The description of the installment plan
    amountPercentage: number;  // Use number for byte value
    amount:string;
    due:string;
    webPlan: boolean;          // Use boolean for WebPlan
    fileUpload: string; 
    areaName:string;
    salesPrice:number;
    status:string;
    blockName:string;
    propertyDescription:string;
    propertyDetailsTitle:string;

  }