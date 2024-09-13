import { Component } from '@angular/core';
import { ModelSubCompany } from '../../models/model-sub-company';
import { ModelFloor } from '../../models/model-floor';
import { Router } from '@angular/router';
import { FloorService } from '../../services/floor.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})
export class FloorComponent {
  model: ModelFloor = {
    id: 0,
    floorName: '',
    subCompID: 0,
  };

  companies: ModelSubCompany[] = []; // Use the Company model
  floor: ModelFloor[] = []; // Array to hold all floor
  currentFloor: ModelFloor = { id: 0, floorName: '', subCompID: 0 }; // For getting single floor

  constructor(private floorService: FloorService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.loadFloor();
    // let table = new $('#table').DataTable(); 
  }

  onSubmit(): void {
    console.log('onSubmit method called');
    console.log(this.model);

    if (this.model.id === 0) {
      this.addingFloor();
    } else {
      this.updateFloor(this.model.id);
    }
  }

  addingFloor(): void {
    this.floorService.addFloor(this.model).subscribe({
      next: () => {
        debugger;
        console.log('Floor Added Successfully');
        this.loadFloor();
      //  this.router.navigate(['/floor']); // Navigate to the desired route
      },
      error: (err: any) => {
        console.error('Error Adding Floor:', err);
      }
    });
  }

    updateFloor(id: number): void {
      this.floorService.updateFloor(id, this.model).subscribe({
        next: () => {
          console.log('Floor Updated Successfully');
          this.loadFloor();
         // this.router.navigate(['/']);
          this.clearModel(); // Reset ModelBlock
        },
        error: (err: any) => console.error('Error Updating Block:', err)
      });
    }

  editFloor(id: number): void {
    debugger
    this.floorService.EditFloors(id).subscribe({
      next: (data) => {
        this.model = data; // Populate the model with data received from the server
      },
      error: (err: any) => console.error('Error Getting Floor:', err)
    });
  }
  
  deleteFloor(id: number): void {
    debugger
    this.floorService.deleteFloor(id).subscribe({
      next: () => {
        console.log('Floor Deleted Successfully');
        this.loadFloor();
      },
      error: (err: any) => console.error('Error Deleting Floor:', err)
    });
  }

  loadFloor(): void {
    this.floorService.getAllFloors().subscribe({
      next: (data) => {
        this.floor = data;
      },
      error: (err: any) => console.error('Error loading blocks:', err)
    });
  }
  loadCompanies(): void {
    this.floorService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
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
    this.model.floorName = '';
    this.model.subCompID = 0;
  }
}
