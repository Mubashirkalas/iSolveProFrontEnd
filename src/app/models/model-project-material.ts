export interface MarketingMaterial {
    name: string;
    link: string;
    type: string;
  }
  
  export interface MarketingMaterials {
    [key: string]: MarketingMaterial[];
  }