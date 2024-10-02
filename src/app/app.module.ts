import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { FormsComponent } from './components/forms/forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormschildComponent } from './components/formschild/formschild.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule,withFetch,HTTP_INTERCEPTORS} from '@angular/common/http';

import { ProjectComponent } from './components/project/project.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ProfileComponent } from './components/profile/profile.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { RealtorComponent } from './components/realtor/realtor.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { ProjectInventoryComponent } from './components/project-inventory/project-inventory.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PaymentPlanComponent } from './components/payment-plan/payment-plan.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { EditCompanyProfileComponent } from './components/edit-company-profile/edit-company-profile.component';
import { ProjectMaterialsComponent } from './components/project-materials/project-materials.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { EventRequestComponent } from './components/event-request/event-request.component';
import { EventReportTableComponent } from './components/event-report-table/event-report-table.component';
import { AgGridAngular} from 'ag-grid-angular';
import { DataTablesModule } from 'angular-datatables';

import DataTable from 'datatables.net-dt';
import { BdmChangeRequestComponent } from './components/bdm-change-request/bdm-change-request.component';
import { FloorPlanComponent } from './components/floor-plan/floor-plan.component';
import { ComissionsComponent } from './components/comissions/comissions.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';







@NgModule({
  declarations: [
    AppComponent,
    BottomMenuComponent,
    FormsComponent,
    HeaderComponent,
    FormschildComponent,
    
   
    ProjectComponent,
   
  
    ProfileComponent,
    RealtorComponent,
   
    ProjectInventoryComponent,
         LoginComponent,
         DashboardComponent,
         PaymentPlanComponent,
         ProfileSettingsComponent,
         EditCompanyProfileComponent,
         ProjectMaterialsComponent,
         UpdatePasswordComponent,
         EventRequestComponent,
         EventReportTableComponent,
         BdmChangeRequestComponent,
         FloorPlanComponent,
         ComissionsComponent,
         BookingsComponent
    
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AgGridAngular
  
    
   
    
    
    
  
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
   
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
