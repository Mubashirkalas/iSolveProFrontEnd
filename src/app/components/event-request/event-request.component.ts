import { Component } from '@angular/core';
import { EventReport } from '../../models/model-event-report';
import { EventReportService } from '../../services/event-report.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrl: './event-request.component.css'
})
export class EventRequestComponent {

 
  eventReport: EventReport = {
    eventId: 0,
    eventTitle: '',
    dateOfEvent: '',
    city: '',
    country: '',
    eventVenue: '',
    focusProject: '',
    productType: '',
    salesSupportRequired: 'Yes',
    noOfEventsCitySpecific: '',
    avgMeetingPerEvent: '',
    avgSalesVolumePerEvent: '',
    propertyType: '',
    leadSource: '',
    marketingMediumUsed: '',
    noOfExistingLeads: '',
    noOfInvestorDatabaseTarget: '',
    otherSourcesOfLeads: '',
    marketingBudget: '',
    marketingPlatform: '',
    noOfLeadsExpected: '',
    noOfWalkinsExpected: '',
    createdDate: '', 
    status: '', 
    requestedBy: '',
    businessPartnersName: ''
  };

  constructor(private eventReportService: EventReportService, private authService: AuthService) {}

  

  currentStep = 1;
  setStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit(form:NgForm) {
    if (form.valid) {

      this.eventReport.requestedBy = this.authService.getUserId() || '';
      // Send data to the server only on the last step
      this.eventReportService.createEventReport(this.eventReport).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Event report created successfully',
            confirmButtonText: 'OK'
          }).then(() => {
            this.resetForm(form);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error creating event report: ' + err.message,
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      form.control.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields before submitting.',
        confirmButtonText: 'OK'
      });
    }
  }

   // Reset the form after successful submission
   resetForm(form: NgForm) {
    form.resetForm(); // This resets the form
    this.eventReport = {
      eventId: 0,
      eventTitle: '',
      dateOfEvent: '',
      city: '',
      country: '',
      eventVenue: '',
      focusProject: '',
      productType: '',
      salesSupportRequired: 'Yes',
      noOfEventsCitySpecific: '',
      avgMeetingPerEvent: '',
      avgSalesVolumePerEvent: '',
      propertyType: '',
      leadSource: '',
      marketingMediumUsed: '',
      noOfExistingLeads: '',
      noOfInvestorDatabaseTarget: '',
      otherSourcesOfLeads: '',
      marketingBudget: '',
      marketingPlatform: '',
      noOfLeadsExpected: '',
      noOfWalkinsExpected: '',
      createdDate: '', 
      status: '', 
      requestedBy: '',
      businessPartnersName: ''
    }; // Clear the eventReport object
    this.currentStep = 1; // Return to the first step
  }
  }
 


