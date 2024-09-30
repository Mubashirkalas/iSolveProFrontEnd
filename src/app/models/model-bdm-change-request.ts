export interface BDMChangeRequest {
    id: number;
    userId:string;
    name: string;
    requestedBDM: string;
    reason: string;
    requestedOn: string;
    status: string; // "pending", "approved", "declined"
  }