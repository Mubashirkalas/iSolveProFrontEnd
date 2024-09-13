export interface AgreementDetails{
    id: number;
    advance: number;                    
    recurringPayments: number;          
    securityDeposit: number;           
    annualIncrement: number;            
    leaseStartDate: string;             
    leaseEndDate: string;
    paymentFilePath?: string;  
    securityChequesFilePath?: string;   
    agreementFilePath?: string;  
}