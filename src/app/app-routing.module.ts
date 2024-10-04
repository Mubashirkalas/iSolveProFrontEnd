import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { FormsComponent } from './components/forms/forms.component';
import { FormschildComponent } from './components/formschild/formschild.component';

import { ProfileComponent } from './components/profile/profile.component';
import { RealtorComponent } from './components/realtor/realtor.component';
import { ProjectInventoryComponent } from './components/project-inventory/project-inventory.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentPlanComponent } from './components/payment-plan/payment-plan.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { EditCompanyProfileComponent } from './components/edit-company-profile/edit-company-profile.component';
import { ProjectMaterialsComponent } from './components/project-materials/project-materials.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { EventRequestComponent } from './components/event-request/event-request.component';
import { EventReportTableComponent } from './components/event-report-table/event-report-table.component';
import { BdmChangeRequestComponent } from './components/bdm-change-request/bdm-change-request.component';
import { FloorPlanComponent } from './components/floor-plan/floor-plan.component';
import { ComissionsComponent } from './components/comissions/comissions.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { RequestsComponent } from './components/requests/requests.component';


export const routes: Routes = [

  {path: 'login', component:LoginComponent},
  { path: '',redirectTo:'/login', pathMatch:'full' },

 
  {path: 'formschild',component:FormschildComponent},
  { path: 'profile' , component:ProfileComponent  , canActivate: [AuthGuard]},
  { path:  'realtor', component:RealtorComponent  },
  { path: 'projectDetails', component:ProjectInventoryComponent  , canActivate: [AuthGuard] },
  { path: 'dashboard', component:DashboardComponent  , canActivate: [AuthGuard] },
  { path: 'payment-plan', component: PaymentPlanComponent, canActivate:[AuthGuard] },
  { path: 'profileSettings',component: ProfileSettingsComponent, canActivate: [AuthGuard]},
  { path: 'edit-company-profile', component: EditCompanyProfileComponent, canActivate: [AuthGuard]},
  { path: 'project-materials', component: ProjectMaterialsComponent, canActivate: [AuthGuard]},
  { path: 'update-password', component:UpdatePasswordComponent, canActivate:[AuthGuard]},
  { path: 'event-request', component: EventRequestComponent, canActivate: [AuthGuard]},
  { path: 'event-table', component: EventReportTableComponent, canActivate: [AuthGuard]},
  {path: 'BDMChange-request', component: BdmChangeRequestComponent, canActivate: [AuthGuard]},
  {path: 'floor-plan', component:FloorPlanComponent, canActivate: [AuthGuard]},
  {path: 'comissions', component: ComissionsComponent, canActivate:[AuthGuard]},
  {path: 'bookings', component:BookingsComponent, canActivate:[AuthGuard]},
  {path: 'requests', component:RequestsComponent, canActivate:[AuthGuard]},
 

  { path: '**', redirectTo: '/login' } 
];

@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
