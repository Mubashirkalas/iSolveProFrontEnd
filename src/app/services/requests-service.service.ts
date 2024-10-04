import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealtorService } from './realtor.service';
import { BdmChangeRequestService } from './bdm-change-request.service';
import { EventReportService } from './event-report.service';
import { BDMChangeRequest } from '../models/model-bdm-change-request';
import { EventReport } from '../models/model-event-report';
import { Realtor } from '../models/model-realtor';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(
    private realtorService: RealtorService,
    private bdmChangeRequestService: BdmChangeRequestService,
    private eventReportService: EventReportService
  ) {}

  getAllRequests(): Observable<any[]> {
    return new Observable(observer => {
      // Combine all requests
      this.realtorService.getAllRealtors().subscribe(realtors => {
        this.bdmChangeRequestService.getAllRequests().subscribe(bdmRequests => {
          this.eventReportService.getAllEventReports().subscribe(eventReports => {
            // Combine all requests
            const requests = [
              ...realtors.map(r => ({ ...r, type: 'Realtor' })),
              ...bdmRequests.map(b => ({ ...b, type: 'BDM Change Request' })),
              ...eventReports.map(e => ({ ...e, type: 'Event Report' }))
            ];
            observer.next(requests);
            observer.complete();
          });
        });
      });
    });
  }

   // Updated method to approve request
   approveRequest(requestId: number): Observable<void> {
    return this.bdmChangeRequestService.getAllRequests().pipe(
      switchMap(requests => {
        const requestToUpdate = requests.find(r => r.id === requestId);
        if (!requestToUpdate) {
          throw new Error('Request not found');
        }

        const updatedRequest: BDMChangeRequest = {
          ...requestToUpdate,
          status: 'Approved' // Set the new status
        };

        return this.bdmChangeRequestService.updateRequest(updatedRequest).pipe(
          switchMap(() => of<void>(undefined)) // Return an Observable<void>
        );
      })
    );
  }

  // Updated method to cancel request
  cancelRequest(requestId: number): Observable<void> {
    return this.bdmChangeRequestService.getAllRequests().pipe(
      switchMap(requests => {
        const requestToUpdate = requests.find(r => r.id === requestId);
        if (!requestToUpdate) {
          throw new Error('Request not found');
        }

        const updatedRequest: BDMChangeRequest = {
          ...requestToUpdate,
          status: 'Cancelled' // Set the new status
        };

        return this.bdmChangeRequestService.updateRequest(updatedRequest).pipe(
          switchMap(() => of<void>(undefined)) // Return an Observable<void>
        );
      })
    );
  }



  // Approve Realtor Request
  // approveRealtor(requestId: number): Observable<void> {
  //   return this.realtorService.getAllRealtors().pipe(
  //     switchMap(realtors => {
  //       const requestToUpdate = realtors.find(r => r.id === requestId);
  //       if (!requestToUpdate) {
  //         throw new Error('Realtor not found');
  //       }

  //       const updatedRealtor: Realtor = {
  //         ...requestToUpdate,
  //         status: 'Approved' // Assuming the Realtor has a status field
  //       };

  //       return this.realtorService.updateRealtor(updatedRealtor.serialNo, updatedRealtor).pipe(
  //         switchMap(() => of<void>(undefined)) // Return an Observable<void>
  //       );
  //     })
  //   );
  // }

  // Cancel Realtor Request
  // cancelRealtor(requestId: number): Observable<void> {
  //   return this.realtorService.getAllRealtors().pipe(
  //     switchMap(realtors => {
  //       const requestToUpdate = realtors.find(r => r.id === requestId);
  //       if (!requestToUpdate) {
  //         throw new Error('Realtor not found');
  //       }

  //       const updatedRealtor: Realtor = {
  //         ...requestToUpdate,
  //         status: 'Cancelled' // Assuming the Realtor has a status field
  //       };

  //       return this.realtorService.updateRealtor(updatedRealtor.serialNo, updatedRealtor).pipe(
  //         switchMap(() => of<void>(undefined)) // Return an Observable<void>
  //       );
  //     })
  //   );
  // }

  // Approve Event Request
  approveEventReport(requestId: number): Observable<void> {
    return this.eventReportService.getAllEventReports().pipe(
      switchMap(eventReports => {
        const requestToUpdate = eventReports.find(e => e.eventId === requestId);
        if (!requestToUpdate) {
          throw new Error('Event report not found');
        }

        const updatedEventReport: EventReport = {
          ...requestToUpdate,
          status: 'Approved' // Assuming the Event Report has a status field
        };

        return this.eventReportService.updateEventReport(updatedEventReport).pipe(
          switchMap(() => of<void>(undefined)) // Return an Observable<void>
        );
      })
    );
  }

  // Cancel Event Request
  cancelEventReport(requestId: number): Observable<void> {
    return this.eventReportService.getAllEventReports().pipe(
      switchMap(eventReports => {
        const requestToUpdate = eventReports.find(e => e.eventId === requestId);
        if (!requestToUpdate) {
          throw new Error('Event report not found');
        }

        const updatedEventReport: EventReport = {
          ...requestToUpdate,
          status: 'Cancelled' // Assuming the Event Report has a status field
        };

        return this.eventReportService.updateEventReport(updatedEventReport).pipe(
          switchMap(() => of<void>(undefined)) // Return an Observable<void>
        );
      })
    );
  }
}
