import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgreementDetailsService } from '../../services/agreement-details.service';
import { AgreementDetails } from '../../models/model-agreement-details';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agreement-details',
  templateUrl: './agreement-details.component.html',
  styleUrl: './agreement-details.component.css'
})

export class AgreementDetailsComponent implements OnInit {
  model: AgreementDetails = {
    id: 0,
    advance: 0,
    recurringPayments: 0,
    securityDeposit: 0,
    annualIncrement: 0,
    leaseStartDate: '',
    leaseEndDate: '',
    paymentFilePath: '',
    securityChequesFilePath: '',
    agreementFilePath: '',
  };

  selectedFiles: { [key: string]: File | null } = {
    paymentFilePath: null,
    securityChequesFilePath: null,
    agreementFilePath: null,
  };

  successMessage: string = '';
  errorMessage: string = '';

  agreements: AgreementDetails[] = [];
  isEdit: boolean = false;
  agreementId: number = 0;

  constructor(
    private agreementService: AgreementDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAgreements();
  }

  loadAgreements(): void {
    this.agreementService.getAgreements().subscribe(data => {
      this.agreements = data;
    });
  }

  onFileSelected(event: Event, fileKey: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFiles[fileKey] = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.updateAgreement(this.agreementId);
    } else {
      this.addAgreement();
    }
  }

  addAgreement(): void {
    const formData = this.createFormData();
    this.agreementService.createAgreement(formData).subscribe({
      next: () => {
        this.successMessage = 'Agreement details added successfully';
        this.errorMessage = '';
        this.loadAgreements();
        this.resetForm();
      },
      error: (err: any) => {
        this.errorMessage = 'Error adding agreement details';
        this.successMessage = '';
        console.error('Error Adding Agreement Details:', err);
      }
    });
  }

  updateAgreement(id: number): void {
    const formData = this.createFormData();
    this.agreementService.updateAgreement(id, formData).subscribe({
      next: () => {
        this.successMessage = 'Agreement details updated successfully';
        this.errorMessage = '';
        this.router.navigate(['/agreement-details']);
        this.loadAgreements();
        this.resetForm();
      },
      error: (err: any) => {
        this.errorMessage = 'Error updating agreement details';
        this.successMessage = '';
        console.error('Error Updating Agreement Details:', err);
      }
    });
  }

  editAgreement(id: number): void {
    this.agreementService.getAgreementById(id).subscribe({
      next: (data) => {
        this.model = data;
        this.agreementId = id;
        this.isEdit = true;
        this.successMessage = '';
        this.errorMessage = '';
      },
      error: (err: any) => console.error('Error Getting Agreements:', err)
    });
  }

  deleteAgreement(id: number): void {
    this.agreementService.deleteAgreement(id).subscribe({
      next: () => {
        this.successMessage = 'Agreement deleted successfully';
        this.errorMessage = '';
        this.loadAgreements();
      },
      error: (err: any) => {
        this.errorMessage = 'Error deleting agreement';
        this.successMessage = '';
        console.error('Error Deleting Agreement:', err);
      }
    });
  }

  resetForm(): void {
    this.model = {
      id: 0,
      advance: 0,
      recurringPayments: 0,
      securityDeposit: 0,
      annualIncrement: 0,
      leaseStartDate: '',
      leaseEndDate: '',
      paymentFilePath: '',
      securityChequesFilePath: '',
      agreementFilePath: '',
    };
    this.selectedFiles = {
      paymentFilePath: null,
      securityChequesFilePath: null,
      agreementFilePath: null
    };
    this.isEdit = false;
    this.agreementId = 0;
  }

  createFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.model).forEach(key => {
      formData.append(key, this.model[key as keyof AgreementDetails] as any);
    });
    Object.keys(this.selectedFiles).forEach(key => {
      const file = this.selectedFiles[key];
      if (file) {
        formData.append(key, file);
      }
    });
    return formData;
  }
}













// export class AgreementDetailsComponent implements OnInit{
//   model: AgreementDetails = {
//       id: 0,
//       advance: 0,
//       recurringPayments: 0,
//       securityDeposit: 0,
//       annualIncrement: 0,
//       leaseStartDate: '',
//       leaseEndDate: '',
//       paymentFilePath: '',
//       securityChequesFilePath: '',
//       agreementFilePath: '',
   
//   };

//   selectedFiles: { [key: string]: File | null } = {
//     paymentFilePath: null,
//     securityChequesFilePath: null,
//     agreementFilePath: null,
//   };

//   successMessage: string = '';
// errorMessage: string = '';


//   agreements: AgreementDetails[] = [];
 
//   selectedFile: File | null = null;

//   constructor(private agreementService: AgreementDetailsService, private router:Router) {}

//   ngOnInit(): void {
//     this.loadAgreements();
//   }

//   loadAgreements(): void {
//        this.agreementService.getAgreements().subscribe(data => {
//          this.agreements = data;
//        });
//      }

//      onFileSelected(event:Event, filekey: string): void{
//       const input = event.target as HTMLInputElement;
//       if(input.files?.length){
//         this.selectedFile = input.files[0];
//       }
//      }
  
//      onSubmit(): void {
//       console.log('onSubmit method call');
//       console.log(this.model.id);
      

//       if(this.model.id === 0)
//       {
//         console.log('Enter in onSubmit');
//         this.add();
//       }
//       else{
//         this.updateAgreement(this.model.id);
//       }
//      }


//      add(): void{
      
//       this.agreementService.createAgreement(this.model).subscribe({
//         next: () => {
//           console.log("model add",this.model);
//           console.log('Agreement details Added Successfully');
//           this.loadAgreements();
//           this.resetForm();

//         },
//         error: (err: any) => {
//           console.error('Error Adding Agreement Details:', err);
//         }
//       });


//      }

//      updateAgreement(id: number): void{
//       this.agreementService.updateAgreement(id, this.model).subscribe({
//         next: () => {
//           console.log('Agreement Details Updated Successfully');
//           this.router.navigate(['/agreement-details']);
//           this.loadAgreements();
//           this.resetForm();
          
//         },
//         error: (err: any) => console.error('Error Updating Agreement Details:', err)
//       });

//      }

//      editAgreement(id: number): void {
//       this.agreementService.getAgreementById(id).subscribe({
//         next: (data) => {
//           this.model = data; // Populate the model with data received from the server
//         },
//         error: (err: any) => console.error('Error Getting Agreements:', err)
//       });
//     }
    
//     deleteAgreement(id: number): void {
//       this.agreementService.deleteAgreement(id).subscribe({
//         next: () => {
//           console.log('Agreement Deleted Successfully');
//           this.loadAgreements(); // Refresh the list
//         },
//         error: (err: any) => console.error('Error Deleting Agreement:', err)
//       });
//     }

  // onSubmit(): void {
  //   if (this.editingId) {
  //     this.agreementService.updateAgreement(this.editingId, this.model).subscribe({
  //       next: (response) => {
  //         this.successMessage = 'Agreement updated successfully';
  //         this.errorMessage = '';
  //         this.loadAgreements();
  //         this.resetForm();
  //       },
  //       error: (err) => {
  //         this.errorMessage = 'Update failed';
  //         this.successMessage = '';
  //       }
  //     });
  //   } else {
  //     this.agreementService.createAgreement(this.model).subscribe({
  //       next: (response) => {
  //         this.successMessage = 'Agreement added successfully';
  //         this.errorMessage = '';
  //         this.loadAgreements();
  //         this.resetForm();
  //       },
  //       error: (err) => {
  //         this.errorMessage = 'Form submission failed';
  //         this.successMessage = '';
  //       }
  //     });
  //   }
  // }

  // resetForm(): void {
  //   this.model = {
  //     id: 0,
  //     advance: 0,
  //     recurringPayments: 0,
  //     securityDeposit: 0,
  //     annualIncrement: 0,
  //     leaseStartDate: 'jan 21,2024',
  //     leaseEndDate: 'jan 21,2024',
  //     paymentFilePath: '',
  //     securityChequesFilePath: '',
  //     agreementFilePath: '',
  //   };
  //   this.selectedFiles = {
  //     paymentFilePath: null,
  //     securityChequesFilePath: null,
  //     agreementFilePath: null,
  //   };
   

  // }

  // loadAgreements(): void {
  //   this.agreementService.getAgreements().subscribe(data => {
  //     this.agreements = data;
  //   });
  // }

  // editAgreement(id: number): void {
  //   this.agreementService.getAgreementById(id).subscribe(data => {
  //     this.model = data; // Populate the form with the selected agreement's data
  //     this.editingId = id;
  //     this.successMessage = ''; // Clear success message when editing
  //     this.errorMessage = ''; // Clear error message when editing
  //   });
  // }


  // deleteAgreement(id: number): void {
  //   this.agreementService.deleteAgreement(id).subscribe({
  //     next: () => {
  //       this.successMessage = 'Agreement deleted successfully';
  //       this.errorMessage = '';
  //       this.loadAgreements();
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Deletion failed';
  //       this.successMessage = '';
  //     }
  //   });
  // }


  // ngOnInit(): void {
  //   this.loadAgreements();
  // }

  // loadAgreements(): void {
  //   this.agreementService.getAgreements().subscribe(data => {
  //     this.agreements = data;
  //   });
  // }

  // onFileSelect(event: Event, field: string): void {
  //   const input = event.target as HTMLInputElement;
  
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  
  //     // Validate file type
  //     if (!validFileTypes.includes(file.type)) {
  //       alert('Invalid file type. Only images (JPEG, PNG, GIF) and PDF files are allowed.');
  //       return;
  //     }
  
  //     // If valid, store the file
  //     this.files[field] = file;
  //   }
  // }

  // onSubmit(): void {
  //   debugger;
  //  const model = new FormData();

  //   Object.keys(this.model).forEach(key => {
  //     model.append(key, this.model[key as keyof AgreementDetails] as string);
  //   });

  //   Object.keys(this.files).forEach(key => {
  //     model.append(key, this.files[key]);
  //   });

  //   this.agreementService.createAgreement(model).subscribe({
  //     next:(response) => {
  //       this.successMessage = 'Agreement form added successfully';
  //       this.errorMessage = '';
  //       this.loadAgreements();  // Reload agreements after submission
  //       this.resetForm();
  //     },
  //     error:(err:any) => {
  //       this.errorMessage = 'Form submission failed';
  //       this.successMessage = '';
  //     }
  // });
  // }


  // resetForm() {
  //   this.model = {
  //     advance: 0,
  //     recurringPayments: 0,
  //     securityDeposit: 0,
  //     annualIncrement: 0,
  //     leaseStartDate: '',
  //     leaseEndDate: '',
  //     paymentFilePath: '',  
  //     securityChequesFilePath: '',
  //     agreementFilePath: '',
  //   };
  // }

  // onUpdate(id: number): void {
  //   const model = new FormData();

  //   Object.keys(this.model).forEach(key => {
  //     model.append(key, this.model[key as keyof AgreementDetails] as string);
  //   });

  //   Object.keys(this.files).forEach(key => {
  //     model.append(key, this.files[key]);
  //   });

  //   this.agreementService.updateAgreement(id, model).subscribe(
  //     response => {
  //       console.log('Agreement updated successfully', response);
  //       this.loadAgreements();  // Reload agreements after update
  //     },
  //     error => {
  //       console.error('Update failed', error);
  //     }
  //   );
  // }

  // onDelete(id: number): void {
  //   this.agreementService.deleteAgreement(id).subscribe({
  //     next:(response) => {
  //       console.log('Agreement deleted successfully');
  //       this.loadAgreements();  // Reload agreements after deletion
  //     },
  //     error: (err:any) => {
  //       console.error('Deletion failed');
  //     }
  // });
  // }
  




