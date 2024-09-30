export interface Booking {
    srno: number;
    serialNo?: number; // Optional field
    subsegmentName?: string; // Optional field
    date?: Date; // Optional field
    clientName?: string; // Optional field
    projectName?: string; // Optional field
    propertyDescription?: string; // Optional field
    areaTitle?: string; // Optional field
    propertyDetail?: string; // Optional field
    categoryTitle?: string; // Optional field
    blockName?: string; // Optional field
    bookingType?: string; // Optional field
    totalAmount?: number; // Optional field
    projectStatus?: string; // Optional field
    dealerCommission?: number;
}
