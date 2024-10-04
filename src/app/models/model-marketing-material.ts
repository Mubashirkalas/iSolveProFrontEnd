export interface MarketingMaterial {
    serialNo: number; // The serial number of the project
    eBrochure: File | null; // PDF file for E-Brochure
    photos: File | null; // ZIP file for project photos
    floorplans: File | null; // ZIP file for floorplans
    projectphoto:File | null;
    videoLink: string; // YouTube video link
     eBrochureFilePath: string;
    photosZipFilePath: string;
 floorplansZipFilePath: string;
 projectphotoFilePath: string;

  }
  


  export interface MarketingMMaterial {
    name: string;
    link: string;
    type: 'brochure' | 'image' | 'video' | 'floorplan'; // Specify types
   
  }