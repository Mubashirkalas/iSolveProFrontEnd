import { Component,OnInit,ViewChild, ElementRef,EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input-gg';
import { Country, State, City, IState, ICity, } from 'country-state-city';



declare var intlTelInput: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  @ViewChild('uploadedImage') uploadedImage!: ElementRef;
  @ViewChild('fileInput') fileInput: any;

  
  countries= Country.getAllCountries();
  states: IState[] = [];
  cities: ICity [] = [];
  selectedCountry: string = '';
  selectedState: string = '';

  selectedSection: string = 'editProfile'; // Default section
  

  ngOnInit(): void {
    // Fetch countries on component initialization
    
  }
  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const countryCode = selectElement.value;
    if (countryCode) {
      this.selectedCountry = countryCode;
      this.states = State.getStatesOfCountry(countryCode) || [];
      this.cities = [];
      this.selectedState = '';
    }
  }

  onStateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const stateCode = selectElement.value;
    if (stateCode) {
      this.selectedState = stateCode;
      this.cities = City.getCitiesOfState(this.selectedCountry, stateCode) || [];
    }
  }


  // Function to trigger the file input click
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Function to handle the file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Optionally display the selected image as the icon
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Set the image source to the uploaded file
        if (this.uploadedImage) {
          this.uploadedImage.nativeElement.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);

      // Proceed with uploading the file or other logic
      console.log('File selected:', file);
    }
  }


  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
 

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
  

}