export interface Realtor {
    id: number;
    RealtorName: string;
    ContactNo: string;
    cnic: string;
    officeAddress: string;
    companyName: string;
    city: string;
    AgentId: string;
    CnicImage: File | null;
    OfficeImage: File | null;
    userType: string;
  }