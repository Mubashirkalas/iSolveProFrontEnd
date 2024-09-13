import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { FormsComponent } from './components/forms/forms.component';
import { FormschildComponent } from './components/formschild/formschild.component';
import { TeamComponent } from './components/team/team.component';
import { AnnouncemnetComponent } from './components/announcemnet/announcemnet.component';
import { SubCompanyComponent } from './components/sub-company/sub-company.component';
import { AssignTaskComponent } from './components/assign-task/assign-task.component';
import { BlockComponent } from './components/block/block.component';
import { FloorComponent } from './components/floor/floor.component';
import { AgreementDetailsComponent } from './components/agreement-details/agreement-details.component';
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

export const routes: Routes = [

  {path: 'login', component:LoginComponent},
  { path: '',redirectTo:'/login', pathMatch:'full' },

 
  {path: 'formschild',component:FormschildComponent},
  { path: 'team',component:TeamComponent  , canActivate: [AuthGuard]  },
  { path: 'announcement',component:AnnouncemnetComponent  , canActivate: [AuthGuard]   },
  { path: 'subcompany',component:SubCompanyComponent  , canActivate: [AuthGuard]   },
  { path: 'assigntask',component:AssignTaskComponent   , canActivate: [AuthGuard]  },
  { path: 'block',component:BlockComponent  , canActivate: [AuthGuard]   },
  { path: 'floor',component:FloorComponent  , canActivate: [AuthGuard]   },
  { path: 'subcompany',component:SubCompanyComponent , canActivate: [AuthGuard]    },
  { path: 'agreementDetails',component:AgreementDetailsComponent  , canActivate: [AuthGuard]   },
  { path: 'profile' , component:ProfileComponent  , canActivate: [AuthGuard]},
  { path:  'realtor', component:RealtorComponent  },
  { path: 'projectDetails', component:ProjectInventoryComponent  , canActivate: [AuthGuard] },
  { path: 'dashboard', component:DashboardComponent  , canActivate: [AuthGuard] },
  { path: 'payment-plan/:serialNo', component: PaymentPlanComponent, canActivate:[AuthGuard] },
  { path: 'profileSettings',component: ProfileSettingsComponent, canActivate: [AuthGuard]},
  { path: 'edit-company-profile', component: EditCompanyProfileComponent, canActivate: [AuthGuard]},
  {path: 'project-materials', component: ProjectMaterialsComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '/login' } 
];

@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
