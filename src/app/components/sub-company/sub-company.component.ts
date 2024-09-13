import { Component, AfterViewInit,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelSubCompany } from '../../models/model-sub-company';
import { SubCompanyService } from '../../services/sub-company.service';
declare var $:any// Import jQuery
//import * as $ from 'jquery';
@Component({
  selector: 'app-sub-company',
  templateUrl: './sub-company.component.html',
  styleUrl: './sub-company.component.css'
})
export class SubCompanyComponent implements AfterViewInit {
  model: ModelSubCompany = {
    id: 0,
    CompanyId: 0,
    companyName: "",
    employees: "",
    country: "",
    website: ""
  };
  Subcompanies: ModelSubCompany[] = []; // Use the Company model
  //floor: ModelSubCompany[] = []; // Array to hold all floor
  currentSubCompany: ModelSubCompany = { id: 0, CompanyId:1, companyName: '', employees:'', country: '',website:'' }; // For getting single floor

  constructor(private _companyService: SubCompanyService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
  }
  ngAfterViewInit(): void {
    $(document).ready(function(){
      $('.js-example-basic-singles').select2({
        width: '100%'  // or 'resolve'
      });
      $('.js-example-basic-single').select2();
    });
  }

  onSubmit(): void {
    console.log('onSubmit method called');
    console.log(this.model);

    if (this.model.id === 0) {
      this.addingSubCompany();
    } else {
      this.updateSubCompany(this.model.id);
    }
  }

  addingSubCompany(): void {
    debugger;
    this._companyService.addSubCompany(this.model).subscribe({
      next: () => {
        debugger;
        console.log('SubCompany Added Successfully');
        this.loadCompanies();
      //  this.router.navigate(['/floor']); // Navigate to the desired route
      },
      error: (err: any) => {
        console.error('Error Adding Floor:', err);
      }
    });
  }

    updateSubCompany(id: number): void {
      this._companyService.updateSubCompany(id, this.model).subscribe({
        next: () => {
          console.log('SubCompany Updated Successfully');
          this.loadCompanies();
         // this.router.navigate(['/']);
        },
        error: (err: any) => console.error('Error Updating Block:', err)
      });
    }

  editSubCompany(id: number): void {
    debugger
    this._companyService.EditSubCompany(id).subscribe({
      next: (data) => {
        this.model = data; // Populate the model with data received from the server
      },
      error: (err: any) => console.error('Error Getting Floor:', err)
    });
  }
  
  deleteSubCompany(id: number): void {
    debugger
    this._companyService.deleteSubCompany(id).subscribe({
      next: () => {
        console.log('SubCompany Deleted Successfully');
        this.loadCompanies();
      },
      error: (err: any) => console.error('Error Deleting Floor:', err)
    });
  }

  loadCompanies(): void {
    this._companyService.getCompanies().subscribe({
      next: (data) => {
        this.Subcompanies = data;
      },
      error: (error: any) => {
        console.error('Error fetching companies:', error);
        if (error.status === 0) {
          console.error('Network error - Check if the server is running and accessible.');
        } else {
          console.error(`HTTP Error ${error.status}: ${error.message}`);
        }
      }
    });
  }
  clearModel(): void {
    this.model.id = 0;
    this.model.companyName = '';
    this.model.country = '';
    this.model.employees ='';
    this.model.CompanyId =0;
    this.model.website='';
  }
}
