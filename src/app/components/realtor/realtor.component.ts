import { Component,OnInit } from '@angular/core';
import { Realtor } from '../../models/model-realtor'; 
import { RealtorService } from '../../services/realtor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { BusinessPartnerService } from '../../services/business-partner-service.service';
import { BusinessPartner } from '../../models/model- business-partner';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrl: './realtor.component.css'
})
export class RealtorComponent implements OnInit{

 model: any = {
    id: 0,
    RealtorName: '',
    ContactNo: '',
    cnic: '',
    officeAddress: '',
    companyName: '',
    city: '',
    AgentId: '',
    CnicImage: null,
    OfficeImage: null,
    userType: ''
  };

  businessPartners: any[] = [];
  isFreelancer: boolean = false;

constructor(private realtorService: RealtorService, private router: Router,
  private businessPartnerService: BusinessPartnerService, private activatedRoute: ActivatedRoute,
){}

ngOnInit(): void {

  this.loadBusinessPartners(); 

  // Check for an existing ID in the route parameters for edit mode
  const realtorId = this.activatedRoute.snapshot.paramMap.get('id');
  if (realtorId) {
    this.loadRealtorData(parseInt(realtorId));
  }
}

loadRealtorData(id: number): void {
  this.realtorService.getRealtors(id).subscribe({
    next: (response) => {
      this.model = response;
      console.log('Loaded realtor data:', this.model);
    },
    error: (err) => {
      console.error('Error loading realtor data:', err);
    }
  });
}

onFileChange(event: any, field: string) {
  const file = event.target.files[0];
  if (field === 'CnicImage') {
      this.model.CnicImageFile = file;
  } else if (field === 'OfficeImage') {
      this.model.OfficeImageFile = file;
  }
}

markAllAsTouched(form: NgForm) {
  Object.keys(form.controls).forEach(field => {
    const control = form.controls[field];
    control.markAsTouched({ onlySelf: true });
  });
}

  onSubmit(realtorForm: NgForm) {
    console.log('Realtor Data:', this.model);

    if (realtorForm.invalid) {
      // Mark all controls as touched to show validation errors
      this.markAllAsTouched(realtorForm);
      return;
    }

    if(this.model.id === 0){
      this.addRealtor();
    } else{
      this.updateRealtor(this.model.id);
    }
   
    
  }

  addRealtor(): void{
    const formData = new FormData();
    for (const key in this.model) {
        formData.append(key, this.model[key]);
    }

    this.realtorService.addRealtor(formData).subscribe({
        next: (response) => {
            console.log('Realtor added successfully:', response);
            Swal.fire({
              title: 'Success!',
              text: 'Your details have been sent for approval. Once your details will be approved our representative will share login credential with you.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/login']); // Redirect to login page
            });
        },
        error: (err) => {
            console.error('Error adding realtor:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to add realtor. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
        }
    });
  }

  updateRealtor(id: number,status:string=""): void {
    this.realtorService.updateRealtor(id,status, this.model).subscribe({
        next: (response) => {
            console.log('Realtor updated successfully:', response);
            // Add any additional logic you need to handle after updating the realtor
        },
        error: (err) => {
            console.error('Error updating realtor:', err);
            // Handle the error accordingly
        }
    });
}

private loadBusinessPartners(): void {
  this.businessPartnerService.getBusinessPartners().subscribe((data: BusinessPartner[]) => {
    this.businessPartners = data;
  });
}

onUserTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.isFreelancer = target.value === 'freelancer';
  }
}
