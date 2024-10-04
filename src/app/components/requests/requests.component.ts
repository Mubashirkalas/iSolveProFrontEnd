import { Component,OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests-service.service';
import { BDMChangeRequest } from '../../models/model-bdm-change-request';
import { Realtor } from '../../models/model-realtor';
import { EventReport } from '../../models/model-event-report';
import { EventReportService } from '../../services/event-report.service';
import { RealtorService } from '../../services/realtor.service';
import { BdmChangeRequestService } from '../../services/bdm-change-request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit {
  requests: any[] = []; // You can define a specific interface for the requests if needed
  bdmChangeRequests: BDMChangeRequest[] = [];
  eventReports: EventReport[] = [];
  realtors: Realtor[] = [];

  constructor(private requestsService: RequestsService,private bdmChangeRequestService: BdmChangeRequestService,
    private eventReportService: EventReportService,
    private realtorService: RealtorService) {}

  ngOnInit(): void {
    this.fetchRequests();
    this.loadBDMChangeRequests();
    this.loadEventReports();
    this.loadRealtors();
  }

  isRealtorApproved(approved: string): boolean {
    return Number(approved) === 1;
  }

  loadBDMChangeRequests(): void {
    this.bdmChangeRequestService.getAllRequests().subscribe(requests => {
      this.bdmChangeRequests = requests;
    });
  }

  loadEventReports(): void {
    this.eventReportService.getAllEventReports().subscribe(reports => {
      this.eventReports = reports;
    });
  }

  loadRealtors(): void {
    this.realtorService.getAllRealtors().subscribe(realtors => {
      this.realtors = realtors;
    });
  }

  updateBdmChangeRequestStatus(id: number, status: string): void {
    // Fetch the full BDMChangeRequest object by its ID
    this.bdmChangeRequestService.getBdmChangeRequestById(id).subscribe(bdmRequest => {
      if (bdmRequest) {
        // Update the status
        bdmRequest.status = status;
  
        // Pass the full BDMChangeRequest object to the update method
        this.bdmChangeRequestService.updateRequest(bdmRequest).subscribe(() => {
          this.loadBDMChangeRequests(); // Refresh the list of requests
        });
      }
    });
  }
  

  updateEventReportStatus(id: number, status: string): void {
    // First, fetch the event report by its ID
    this.eventReportService.getEventReportById(id).subscribe(eventReport => {
      if (eventReport) {
        // Update the status of the fetched event report
        eventReport.status = status;
        
        // Now pass the entire eventReport object to the update method
        this.eventReportService.updateEventReport(eventReport).subscribe(() => {
          this.loadEventReports(); // Refresh the list
        });
      }
    });
  }

  deleteBDMChangeRequest(id: number): void {
    this.bdmChangeRequestService.deleteRequest(id).subscribe(() => {
      this.loadBDMChangeRequests(); // Refresh the list
    });
  }

  deleteEventReport(id: number): void {
    this.eventReportService.deleteEventReport(id).subscribe(() => {
      this.loadEventReports(); // Refresh the list
    });
  }



  updateRealtorStatus(id: number, status: string): void {
    const updatedRealtor = { id, status }; // Prepare status update object

    this.realtorService.updateRealtor(id,status, updatedRealtor).subscribe(() => {
      this.loadRealtors(); // Refresh the list after update
    });
  }

 

  deleteRealtor(id: number): void {
    this.realtorService.deleteRealtor(id).subscribe(() => {
      this.loadRealtors(); // Refresh the list
    });
  }

  fetchRequests(): void {
    this.requestsService.getAllRequests().subscribe(
      (data) => {
        this.requests = data; // Handle the fetched requests
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }

  approveRequest(requestId: number): void {
    this.requestsService.approveRequest(requestId).subscribe(() => {
      this.fetchRequests(); // Refresh the list after approval
    });
  }

  cancelRequest(requestId: number): void {
    this.requestsService.cancelRequest(requestId).subscribe(() => {
      this.fetchRequests(); // Refresh the list after cancellation
    });
  }
}
