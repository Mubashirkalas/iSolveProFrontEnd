import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { FormsComponent } from './components/forms/forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormschildComponent } from './components/formschild/formschild.component';
import { TeamComponent } from './components/team/team.component';
import { SubCompanyComponent } from './components/sub-company/sub-company.component';
import { AnnouncemnetComponent } from './components/announcemnet/announcemnet.component';
import { AssignTaskComponent } from './components/assign-task/assign-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule,withFetch} from '@angular/common/http';
import { BlockComponent } from './components/block/block.component';
import { FloorComponent } from './components/floor/floor.component';
import { ProjectComponent } from './components/project/project.component';
import { TaskHistoryComponent } from './components/task-history/task-history.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AgreementDetailsComponent } from './components/agreement-details/agreement-details.component';
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






@NgModule({
  declarations: [
    AppComponent,
    BottomMenuComponent,
    FormsComponent,
    HeaderComponent,
    FormschildComponent,
    TeamComponent,
    SubCompanyComponent,
    AnnouncemnetComponent,
    AssignTaskComponent,
    BlockComponent,
    FloorComponent,
    ProjectComponent,
    TaskHistoryComponent,
    AgreementDetailsComponent,
    ProfileComponent,
    RealtorComponent,
   
    ProjectInventoryComponent,
         LoginComponent,
         DashboardComponent,
         PaymentPlanComponent,
         ProfileSettingsComponent,
         EditCompanyProfileComponent,
         ProjectMaterialsComponent,
   
   
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
    NgxMaskPipe
   
    
    
    
  
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNgxMask(),
   
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
