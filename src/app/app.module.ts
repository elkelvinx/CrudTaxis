import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/structure/header/header.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { AdminsComponent } from './components/admins/admins.component';
import { PermissionairesComponent } from './components/permissionaires/permissionaires.component';
import { HomeComponent } from './components/structure/home/home.component';
import { ErrorComponent } from './components/structure/error/error.component';
import { FooterComponent } from './components/structure/footer/footer.component';
import { YesNoDialogComponent } from './components/tools/yes-no-dialog/yes-no-dialog.component';
import { SinistersComponent } from './components/sinisters/sinisters.component';
import { TableComponent } from './components/tools/table/table.component';

import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//estos no se
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
//estas son para el autocompletar
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutoCompleteComponent } from './components/tools/auto-complete/auto-complete.component';
import { UnitsComponent } from './components/units/units.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DatepickerDateClass } from './components/tools/date-picker/date-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatCardModule } from '@angular/material/card';
import { ContactDialogComponent } from './components/tools/contact-dialog/contact-dialog.component';
import { CommonModule } from '@angular/common';
import { TableModule } from './components/tools/table/table.module';
import { Tables2} from './components/tools/tableExtraData/table2.module';
import { MatIconModule } from '@angular/material/icon';
import { carAutoCompleteComponent } from './components/tools/car_auto-complete/car-auto-complete.component';
import { DocumentsPDFComponent } from './components/documents-pdf/documents-pdf.component';
import { MenuExtraDataComponent } from './components/extraData/menu-extra-data/menu-extra-data.component';
import {MatTabsModule } from '@angular/material/tabs';
import { InsertDialogComponent } from './components/tools/edit-dialog/insert-dialog/insert-dialog.component';
import { EditDialogComponent } from './components/tools/edit-dialog/edit-dialog.component';

//import {  MatDialogModule,  MatButtonModule} from '@angular/material'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DriversComponent,
    AdminsComponent,
    PermissionairesComponent,
    HomeComponent,
    ErrorComponent,
    FooterComponent,
    UnitsComponent,
    ContactDialogComponent,
    SinistersComponent,
    DocumentsPDFComponent,
    MenuExtraDataComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    //este es para el autocompletar creado por mi
    //AutoCompleteComponent,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    AutoCompleteComponent,
    YesNoDialogComponent,
    DatepickerDateClass,
    MatDatepickerModule,
    CommonModule,
    MatIconModule,
    carAutoCompleteComponent,
    MatTabsModule,
    TableModule,
    Tables2,
    EditDialogComponent,
    InsertDialogComponent,

  ],
  // entryComponents: [YesNoDialogComponent ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
