import { Component,OnInit } from '@angular/core';
import { ColDef,GridApi,GridReadyEvent,ColGroupDef} from 'ag-grid-community';
import { Booking } from '../../models/model-booking';
import { BookingsService } from '../../services/bookings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];
  currentStatus: string  = 'All';
  errorMessage: string | null = null;
  filterStatus: string | null = null;
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


  constructor(private bookingService: BookingsService,private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentStatus = params['status'] || 'All';
      this.loadBookings(this.currentStatus);
    });
  }

  loadBookings(status: string): void {
    let projectStatus = status === 'All' ? 'All' : 'Cancel';
    this.bookingService.loadBookings(projectStatus).subscribe(
      (data: Booking[]) => {
        this.bookings = data;
      },
      (error) => {
        this.errorMessage = error.message; // Handle error
        console.error('Error loading bookings:', error);
      }
    );
  }

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
