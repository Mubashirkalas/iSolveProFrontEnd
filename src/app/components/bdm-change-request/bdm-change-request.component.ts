import { Component } from '@angular/core';
import { BdmChangeRequestService } from '../../services/bdm-change-request.service';
import { BDMChangeRequest } from '../../models/model-bdm-change-request';
import { BusinessPartnerService } from '../../services/business-partner-service.service';
import { BusinessPartner } from '../../models/model- business-partner';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


import { ColDef,GridApi,GridReadyEvent,ColGroupDef} from 'ag-grid-community';

declare var bootstrap: any;
@Component({
  selector: 'app-bdm-change-request',
  templateUrl: './bdm-change-request.component.html',
  styleUrl: './bdm-change-request.component.css'
})
export class BdmChangeRequestComponent {

  bdmChangeRequests: BDMChangeRequest[] = [];
  public themeClass: string = "ag-theme-quartz";
  private gridApi!: GridApi<any>;
  selectedBdm: string = '';
  name: string = ''; 
  showModal: boolean = false; // To control modal visibility
  reason: string = '';
  businessPartners: any[] = []; // Assuming you have a list of BDMs
  currentRequestId: number | null = null; // Track the current request ID
  isLoading: boolean = false;

  colDefs: ColDef[] = [
    { headerName: "UserId", field: "userId" },
    { headerName: "Name", field: "name" },
    { headerName: "Requested BDM", field: "requestedBDM" },
    { headerName: "Reason", field: "reason" },
    { headerName: "Requested On", field: "requestedOn" },
    { headerName: "Status", field: "status" }
  ];

  defaultColDef = {
    editable: true,
    floatingFilter: true,
    filter: true,
    flex: 1,
    resizable: true,
    minWidth: 100,
    sortable: true,
    wrapText: true,
    autoHeight: true,
  };

  constructor ( private bdmChangeRequestService: BdmChangeRequestService,private businessPartnerService: BusinessPartnerService,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadBdmChangeRequests();
    this.loadBusinessPartners(); 
    this.loadUserName();
    
  }

  loadBusinessPartners(): void {
    this.businessPartnerService.getBusinessPartners().subscribe((data: BusinessPartner[]) => {
      this.businessPartners = data;
    });
  }

  loadBdmChangeRequests(): void {
    this.bdmChangeRequestService.getAllRequests().subscribe({
      next: (data) => {
        this.bdmChangeRequests = data;
        // Assuming only one request should be present
        if (this.bdmChangeRequests.length > 0) {
          this.currentRequestId = this.bdmChangeRequests[0].id;
        } else {
          this.currentRequestId = null;
        }
      },
      error: (err: any) => console.error('Error loading BDM change requests', err)
    });
  }

  // Load the logged-in user's name
  loadUserName(): void {
   debugger
    const userId = this.authService.getUserId() || ''; // Assuming you get userId from AuthService
    this.businessPartnerService.getBusinessPartnerNameByUserId(userId).subscribe({
      next: (name: string) => {
        console.log('User name from API:', name);
        this.name = name; // Set the user name
       
         
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

  onFilterTextBoxChanged(){
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box")as HTMLInputElement).value,
    );
  }
  openChangeRequestModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('changeRequestModal')!);
    modal.show();
  }

  closeChangeRequestModal(): void {
    const modal = bootstrap.Modal.getInstance(document.getElementById('changeRequestModal')!);
    modal?.hide();
  }

  addRequest(): void {

    if (this.isLoading  ) return; 
    const userId = this.authService.getUserId() || '';
    this.isLoading = true;
    const newRequest: BDMChangeRequest = {
      id: 0,
      userId: userId,
      name: this.name, // Leave name empty
      requestedBDM: this.selectedBdm,
      reason: this.reason,
      requestedOn:new Date().toISOString().split('T')[0], // Set requested date to now
      status: 'pending' // Default status
    };

   // If there is an existing request, delete it first
  if (this.currentRequestId) {
    this.bdmChangeRequestService.deleteRequest(this.currentRequestId).subscribe({
      next: () => {
        console.log('Existing request deleted');
        // Now add the new request after deletion
        this.addNewRequest(newRequest);
      },
      error: (err: any) => {
        console.error('Error deleting existing request', err);
        this.isLoading = false; // Reset loading state on error
      }
    });
  } else {
    // No existing request, just add the new one
    this.addNewRequest(newRequest);
  }
    // } else {

    // this.bdmChangeRequestService.addRequest(newRequest).subscribe({
    //   next: () => {
    //     this.loadBdmChangeRequests(); // Reload requests to include newly added one
    //     this.closeChangeRequestModal(); // Close the modal
    //   },
    //   error: (err) => console.error('Error adding BDM change request', err)
    // });
  }

  addNewRequest(newRequest: BDMChangeRequest): void {
    this.bdmChangeRequestService.addRequest(newRequest).subscribe({
      next: (data) => {
        console.log('Request added:', data);
        this.loadBdmChangeRequests(); // Reload the grid with the new request
        this.closeChangeRequestModal(); // Close the modal

        // Show SweetAlert notification for success
      Swal.fire({
        title: 'Success!',
        text: 'BDM Change Request added successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      this.isLoading = false; // Reset loading state after adding the request
      },
      error: (err) => {
        console.error('Error adding BDM change request', err);
        this.isLoading = false; // Reset loading state on error
      }
    });
  }

}
  

