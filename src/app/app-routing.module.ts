import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/structure/home/home.component';
import { ErrorComponent } from './components/structure/error/error.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { AdminsComponent } from './components/admins/admins.component';
import { PermissionairesComponent } from './components/permissionaires/permissionaires.component';
import { UnitsComponent } from './components/units/units.component';
import { SinistersComponent } from './components/sinisters/sinisters.component';
import { DocumentsPDFComponent } from './components/documents-pdf/documents-pdf.component';
import { MenuExtraDataComponent } from './components/extraData/menu-extra-data/menu-extra-data.component';
const routes: Routes = [
  //la ruta base cuando inicia la aplicacion
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'admins', component: AdminsComponent },
  { path: 'permission', component: PermissionairesComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'sinisters', component: SinistersComponent },
  { path: 'documents', component: DocumentsPDFComponent },
  { path: 'extraData', component: MenuExtraDataComponent },

  //ruta para cuando no se encuentre la url
  { path: '**', component: ErrorComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
