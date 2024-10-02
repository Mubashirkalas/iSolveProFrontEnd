import { Component ,OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-inventory.service';
import { FloorPlanDetail } from '../../models/model-floor-plan';
import { ColDef,GridApi,GridReadyEvent,ColGroupDef} from 'ag-grid-community';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrl: './floor-plan.component.css'
})
export class FloorPlanComponent {

  private gridApi!: GridApi<any>;
  public themeClass: string ="ag-theme-quartz";
  public floorPlanDetails: FloorPlanDetail[] = [];
 
  
  colDefs: ColDef[] = [
    // { headerName: "Serial No", field: "serialNo", headerClass: 'custom-header' },
    { headerName: "Property Description", field: "propertyDescription", headerClass: 'custom-header' },
    { headerName: "Property Details Title", field: "propertyDetailsTitle", headerClass: 'custom-header' },
    { headerName: "Block Name", field: "blockName", headerClass: 'custom-header' },
    { headerName: "Area Name", field: "areaName", headerClass: 'custom-header' },
    { headerName: "Cost Per Property", field: "costPerProperty", headerClass: 'custom-header' },
    // { headerName: "Srno", field: "srno", headerClass: 'custom-header' },
    { headerName: "Financial Year", field: "financialYear", headerClass: 'custom-header' },
    { headerName: "Project Name", field: "projectName", headerClass: 'custom-header' },
    // { headerName: "SNo", field: "sNo", headerClass: 'custom-header' },
    { headerName: "Status", field: "status", headerClass: 'custom-header' },
    { headerName: "Sales Price", field: "salesPrice", headerClass: 'custom-header' },
   
    {
      headerName: 'Upload',
      field: 'upload',
      editable:false,
      filter: false,
      minWidth: 150,
      cellStyle: { textAlign: 'center' } ,
      cellRenderer: (params:any) => {
        return `  <button class="btn btn-primary" onclick="document.getElementById('fileUpload_${params.data.srno}_${params.data.sNo}_${params.data.financialYear}').click();">
      Upload file
    </button>
    <input type="file" id="fileUpload_${params.data.srno}_${params.data.sNo}_${params.data.financialYear}" style="display: none;" onchange="onFileChange(event, '${params.data.srno}', '${params.data.financialYear}', ${params.data.sNo})" />
          `;
      }
    },
    
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

  constructor(private projectService: ProjectService){ (window as any).onFileChange = this.onFileChange.bind(this);}
  ngOnInit(): void {
    this.loadFloorPlanDetails();
  }

  loadFloorPlanDetails(): void {
    this.projectService.getFloorPlanDetails().subscribe({
      next: (data) => {
        this.floorPlanDetails = data;
        console.log("Floor plan details loaded successfully.");
      },
      error: (err: any) => console.error('Error loading floor plan details', err)
    });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit(); // Fit columns to grid width
  }

  refreshGrid(): void {
    if (this.gridApi) {
      this.gridApi.refreshCells({ force: true });
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

  onBtExport(): void {
    this.gridApi.exportDataAsCsv();
  }

  onFileChange(event: Event, srno: string, financialYear: string, sNo: number): void {
    console.log('File selected event triggered');
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Check the file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File Type',
        text: 'Only images (JPEG, PNG) and PDFs are allowed.',
        confirmButtonText: 'OK'
      });
      return; // Exit the function if the file type is not allowed
    }

    this.uploadFile(file, srno, financialYear, sNo);
    }
  }

  uploadFile(file: File, srno: string, financialYear: string, sNo: number): void {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('Srno', srno);
    formData.append('FinancialYear', financialYear);
    formData.append('SNo', sNo.toString());

    console.log('Uploading file with data:', { srno, financialYear, sNo }); // Add this line

    this.projectService.uploadFile(formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'File Uploaded!',
          text: response,
          confirmButtonText: 'OK'
        });
        
      },
      error: (err) => {
        console.error('Error uploading file:', err);
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'There was an error uploading your file.',
          confirmButtonText: 'Try Again'
        });
       
      }
    });
  }

  // uploadButtonRenderer(params: any) {
  //   const button = document.createElement('button');
  //   button.innerHTML = 'Upload';
  //   button.onclick = () => {
  //     document.getElementById(`fileUpload_${params.data.id}`)?.click(); // Ensure the right file input is clicked
  //   };
  //   return button;
  // }

//   onUploadButtonClick(): void {
//     const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
//     if (fileInput) {
//       fileInput.click(); // Open the file dialog
//     } else {
//       console.error('File input not found');
//     }
//   }

//   onFileSelected(event: Event, srno: string, financialYear: string, sno: number): void {
//     const fileInput = event.target as HTMLInputElement;
//     if (fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0];
  
//       // Call the upload function with the selected file and required metadata
//       this.uploadFile(file, srno, financialYear, sno);
//     }
//   }

//   uploadButtonRenderer(params: any) {
//     const button = document.createElement('button');
//     button.innerHTML = 'Upload';
//     button.onclick = () => {
//       this.onUploadButtonClick();
//     };
  
//     // Listen for file selection and pass the necessary metadata
//     const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
//     fileInput?.addEventListener('change', (event) => {
//       this.onFileSelected(event, params.srno, params.financialYear, params.sno);
//     });
  
//     return button;
//   }

//   // Upload the selected file with metadata
// uploadFile(file: File, srno: string, financialYear: string, sno: number): void {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('Srno', srno);
//   formData.append('FinancialYear', financialYear);
//   formData.append('SNo', sno.toString());

//   // Call your service to upload the file
//   this.projectService.uploadFile(formData).subscribe({
//     next: (response) => {
//       console.log('File uploaded successfully:', response);
//     },
//     error: (err) => {
//       console.error('Error uploading file:', err);
//     }
//   });
// }

}
