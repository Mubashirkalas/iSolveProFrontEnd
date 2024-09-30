export interface EventReport {
    eventId: number;
    eventTitle: string;
    dateOfEvent: string; // Use string or Date depending on how you handle date values
    city: string;
    country: string;
    eventVenue: string;
    focusProject: string;
    productType: string;
    salesSupportRequired: 'Yes' | 'No'; // Assuming Yes/No values
    noOfEventsCitySpecific: string;
    avgMeetingPerEvent: string;
    avgSalesVolumePerEvent: string;
    propertyType: string;
    leadSource: string;
    marketingMediumUsed: string;
    noOfExistingLeads: string;
    noOfInvestorDatabaseTarget: string;
    otherSourcesOfLeads?: string; // Optional field
    marketingBudget: string;
    marketingPlatform: string;
    noOfLeadsExpected: string;
    noOfWalkinsExpected: string;
    createdDate: string; 
    status: string; 
    requestedBy: string; 
    businessPartnersName: string;
  }
  