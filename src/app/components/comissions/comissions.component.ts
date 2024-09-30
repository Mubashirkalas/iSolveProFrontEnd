import { Component,OnInit } from '@angular/core';
import { ColDef,GridApi,GridReadyEvent,ColGroupDef} from 'ag-grid-community';
import { Booking } from '../../models/model-booking';
import { BookingsService } from '../../services/bookings.service';
import { Commissions } from '../../models/model-commissions';
import { BusinessPartnerService } from '../../services/business-partner-service.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-comissions',
  templateUrl: './comissions.component.html',
  styleUrl: './comissions.component.css'
})
export class ComissionsComponent implements OnInit{
  bookings: Booking[] = [];
  commissions: Commissions | null = null;
 
  errorMessage: string | null = null;
  
  private gridApi!: GridApi<any>;
  public themeClass: string ="ag-theme-quartz";
  
  colDefs: ColDef[] = [
    // { headerName: "SR No", field: "srno", headerClass: 'custom-header' },
    // { headerName: "Serial No", field: "serialNo", headerClass: 'custom-header' },
    { headerName: "Subsegment Name", field: "subsegmentName", headerClass: 'custom-header' },
    { headerName: "Date", field: "date", headerClass: 'custom-header',  },
    { headerName: "Client Name", field: "clientName", headerClass: 'custom-header' },
    { headerName: "Project Name", field: "projectName", headerClass: 'custom-header' },
    { headerName: "Property Description", field: "propertyDescription", headerClass: 'custom-header' },
    { headerName: "Area Title", field: "areaTitle", headerClass: 'custom-header' },
    { headerName: "Property Detail", field: "propertyDetail", headerClass: 'custom-header' },
    { headerName: "Category Title", field: "categoryTitle", headerClass: 'custom-header' },
    { headerName: "Block Name", field: "blockName", headerClass: 'custom-header' },
    { headerName: "Booking Type", field: "bookingType", headerClass: 'custom-header' },
    { headerName: "Total Amount", field: "totalAmount", headerClass: 'custom-header' },
    { headerName: "Project Status", field: "projectStatus", headerClass: 'custom-header' },
    { headerName: "Commission Amount", field: "dealerCommission", headerClass: 'custom-header' },
   
];
  
  defaultColDef={

    editable: true,
    floatingFilter: true,
    filter: true,
    flex: 1,
    resizable: true, 
    minWidth: 100,
    sortable: true,
  cellStyle: { textAlign: 'center'} ,
   
    wrapText: true, // Wrap Text
    autoHeight: true, // Adjust Cell Height to Fit Wrapped Text
  }


  constructor(private bookingService: BookingsService,private businessPartnerService: BusinessPartnerService,
    private authService: AuthService) { }


  ngOnInit(): void {
   
      this.loadBookings();
  
  }

  loadBookings(status: string = 'Commission'): void {
    this.bookingService.loadBookings(status).subscribe(
      (data: Booking[]) => {
        this.bookings = data; // Assign loaded bookings to the variable
        this.loadCommission();
      },
      (error) => {
        this.errorMessage = error.message; // Handle error
        console.error('Error loading bookings:', error);
      }
    );
  }

  loadCommission(){
    const userId = this.authService.getUserId() || '';  // Assuming this gets the logged-in user's ID

    this.businessPartnerService.getCommissionsByUserId(userId).subscribe(
      (data) => {
        this.commissions = data;
      },
      (error) => {
        console.error('Error fetching commissions', error);
  }
);
}

  // calculateCommissions(): void {
  //   this.totalCommission = this.bookings.reduce((acc, booking) => acc + (booking.dealerCommission || 0), 0);
  //   this.paidCommission = this.bookings.filter(booking => booking.projectStatus === 'Paid')
  //                                       .reduce((acc, booking) => acc + (booking.dealerCommission || 0), 0);
  //   this.remainingCommission = this.totalCommission - this.paidCommission;
  // }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit(); // Fit columns to grid width
    params.api.autoSizeAllColumns();
  }

  refreshGrid():void{
    if(this.gridApi){
      this.gridApi.refreshCells({force:true});
    }
  }

  dateFormatter(params: any) {
    return params.value ? params.value.toLocaleDateString() : '';
}


  onFirstDataRendered(params: any): void {
    params.api.sizeColumnsToFit();  // Resize columns to fit the available width
  }

  onFilterTextBoxChanged(){
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box")as HTMLInputElement).value,
    );
  }
}
