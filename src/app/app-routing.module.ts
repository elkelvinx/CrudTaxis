import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/structure/login/login.component';
import { HomeComponent } from './components/structure/home/home.component';
import { ErrorComponent } from './components/structure/error/error.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { AdminsComponent } from './components/admins/admins.component';
import { PermissionairesComponent } from './components/permissionaires/permissionaires.component';
import { UnitsComponent } from './components/units/units.component';
import { SinistersComponent } from './components/sinisters/sinisters.component';
import { DocumentsPDFComponent } from './components/documents-pdf/documents-pdf.component';
import { MenuExtraDataComponent } from './components/extraData/menu-extra-data/menu-extra-data.component';
import { CreateUserComponent } from './components/structure/create-user/create-user.component';
import { AuthGuardService } from './services/security/auth-guard.service';

const routes: Routes = [
  //la ruta base cuando inicia la aplicacion
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path:  'newLogIn', component: CreateUserComponent},
  { path: 'home', component: HomeComponent},
  { path: 'drivers', component: DriversComponent, canActivate: [AuthGuardService],data: { section: 'Driver' } },
  { path: 'admins', component: AdminsComponent, canActivate: [AuthGuardService],data: { section: 'Admin' } },
  { path: 'permission', component: PermissionairesComponent, canActivate: [AuthGuardService],data: { section: 'Permissionaire' } },
  { path: 'units', component: UnitsComponent, canActivate: [AuthGuardService],data: { section: 'Unit' } },
  { path: 'sinisters', component: SinistersComponent, canActivate: [AuthGuardService],data: { section: 'Sinister' } },
  { path: 'documents', component: DocumentsPDFComponent, canActivate: [AuthGuardService],data: { section: 'PDF' } },
  { path: 'extraData', component: MenuExtraDataComponent, canActivate: [AuthGuardService],data: { section: 'ExtraData' } },
  
  //ruta para cuando no se encuentre la url
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
