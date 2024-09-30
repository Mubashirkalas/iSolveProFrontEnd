import { Component,AfterViewInit,OnInit } from '@angular/core';
import { EventReport } from '../../models/model-event-report';
import { EventReportService } from '../../services/event-report.service';
import { ColDef,GridApi,GridReadyEvent,ColGroupDef} from 'ag-grid-community';
import { AuthService } from '../../services/auth.service';
import { BusinessPartnerService } from '../../services/business-partner-service.service';

declare var $: any; // Import jQuery

@Component({
  selector: 'app-event-report-table',
  templateUrl: './event-report-table.component.html',
  styleUrl: './event-report-table.component.css'
})
export class EventReportTableComponent {
  
  eventReports: EventReport[] = [];
  UserName: string = '';
  
  
  private gridApi!: GridApi<any>;
  public themeClass: string ="ag-theme-quartz";
  
  colDefs: ColDef[] = [
    { headerName: "Event Title", field: "eventTitle", headerClass: 'custom-header' },
    { headerName: "Requested By", field: "requestedBy", headerClass: 'custom-header' },
    { headerName: "Date of Event", field: "dateOfEvent", headerClass: 'custom-header' },
    { headerName: "Event Venue", field: "eventVenue", headerClass: 'custom-header' },
    { headerName: "Focus Project", field: "focusProject", headerClass: 'custom-header' },
    { headerName: "Investor Database Target", field: "noOfInvestorDatabaseTarget", headerClass: 'custom-header' },
    { headerName: "Existing Leads", field: "noOfExistingLeads", headerClass: 'custom-header' },
    { headerName: "Marketing Budget", field: "marketingBudget", headerClass: 'custom-header' },
    { headerName: "Leads Expected", field: "noOfLeadsExpected", headerClass: 'custom-header' },
    { headerName: "Walk-ins Expected", field: "noOfWalkinsExpected", headerClass: 'custom-header' },
    { headerName: "Created Date", field: "createdDate", headerClass: 'custom-header' },
    { headerName: "Status", field: "status", headerClass: 'custom-header' }
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

  constructor(private eventReportService: EventReportService,private authService: AuthService,private businessPartnerService: BusinessPartnerService){}

  ngOnInit(): void {
    this.loadUserName();
    this.loadEventReports();
    

  }

  loadEventReports():void{
    this.eventReportService.getAllEventReports().subscribe({
      next:(data) =>{
        this.eventReports=data.map((report) => {
          return {
            ...report,
            requestedBy: this.UserName // Set the "Requested By" field
          };
        });
        console.log("Now data is binding");
      },
      error:(err:any) =>console.error('Error loading request')
    })
  }

  
  loadUserName(): void {
    debugger
     const userId = this.authService.getUserId() || ''; // Assuming you get userId from AuthService
     this.businessPartnerService.getBusinessPartnerNameByUserId(userId).subscribe({
       next: (name: string) => {
         console.log('User name from API:', name);
         this.UserName = name; // Set the user name
        
          
       },
       error: (err) => {
         console.error('Error fetching user name', err);
       }
     });
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

  onFirstDataRendered(params: any): void {
    params.api.sizeColumnsToFit();  // Resize columns to fit the available width
  }
  
  // onCellClicked(event:any){
  //   console.log(event);
  //   if(event.column.getColId()==='id_1'){
  //     this.EditRequestAllocation(event.data.id); 
  //   }
  //   if(event.column.getColId()==='id_2'){
  //     this.DeleteRequestAllocation(event.data.id);
  //       }
  // }

  onFilterTextBoxChanged(){
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box")as HTMLInputElement).value,
    );
  }

  onBtExport() {
    throw new Error('Method not implemented.');
    

  
  }

}