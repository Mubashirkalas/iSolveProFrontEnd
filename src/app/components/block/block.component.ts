import { Component, OnInit } from '@angular/core';
import { ModelBlock } from '../../models/model-block';
import { BlockService } from '../../services/block.service';
import { Router } from '@angular/router';
import { ModelSubCompany } from '../../models/model-sub-company';
declare var $:any;
import DataTable from 'datatables.net-dt';
@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  model: ModelBlock = {
    id: 0,
    blockName: '',
    subCompID: 0,
  };

  companies: ModelSubCompany[] = []; // Use the Company model
  blocks: ModelBlock[] = []; // Array to hold all blocks
  currentBlock: ModelBlock = { id: 0, blockName: '', subCompID: 0 }; // For getting single block

  constructor(private blockService: BlockService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.loadBlocks();
    // let table = new $('#table').DataTable(); 
  }

  onSubmit(): void {
    console.log('onSubmit method called');
    console.log(this.model);

    if (this.model.id === 0) {
      this.addingBlock();
    } else {
      this.updateBlock(this.model.id);
    }
  }

  addingBlock(): void {
    this.blockService.addBlock(this.model).subscribe({
      next: () => {
        console.log('Block Added Successfully');
        this.router.navigate(['/']); // Navigate to the desired route
      },
      error: (err: any) => {
        console.error('Error Adding Block:', err);
      }
    });
  }

    updateBlock(id: number): void {
      this.blockService.updateBlock(id, this.model).subscribe({
        next: () => {
          console.log('Block Updated Successfully');
          this.router.navigate(['/']);
          this.clearModel(); // Reset ModelBlock
        },
        error: (err: any) => console.error('Error Updating Block:', err)
      });
    }

  editBlock(id: number): void {
    this.blockService.EditBlocks(id).subscribe({
      next: (data) => {
        this.model = data; // Populate the model with data received from the server
      },
      error: (err: any) => console.error('Error Getting Block:', err)
    });
  }
  
  deleteBlock(id: number): void {
    this.blockService.deleteBlock(id).subscribe({
      next: () => {
        console.log('Block Deleted Successfully');
        this.loadBlocks(); // Refresh the list
      },
      error: (err: any) => console.error('Error Deleting Block:', err)
    });
  }

  loadBlocks(): void {
    this.blockService.getAllBlocks().subscribe({
      next: (data) => {
        this.blocks = data;
      },
      error: (err: any) => console.error('Error loading blocks:', err)
    });
  }
  loadCompanies(): void {
    this.blockService.getCompanies().subscribe({
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
    this.model.blockName = '';
    this.model.subCompID = 0;
  }

 
}
