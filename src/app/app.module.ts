import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { Tables2 } from './components/tools/tableExtraData/table2.module';
import { MatIconModule } from '@angular/material/icon';
import { carAutoCompleteComponent } from './components/tools/car_auto-complete/car-auto-complete.component';
import { DocumentsPDFComponent } from './components/documents-pdf/documents-pdf.component';
import { MenuExtraDataComponent } from './components/extraData/menu-extra-data/menu-extra-data.component';
import { MatTabsModule } from '@angular/material/tabs';
import { InsertDialogComponent } from './components/tools/edit-dialog/insert-dialog/insert-dialog.component';
import { EditDialogComponent } from './components/tools/edit-dialog/edit-dialog.component';
import { InfoDialogComponent } from './components/tools/info-dialog/info-dialog.component';

/////////////////////////////////////////////////

import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { LoginComponent } from './components/structure/login/login.component';
import { NotificationService } from './components/tools/info-dialog/notification.service';
import { CreateUserComponent } from './components/structure/create-user/create-user.component';
import { AuthViewComponent } from './AuthView.componet';
import { RoleNamePipe } from './pipes/role-name.pipe';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LogsComponent } from './components/logs/logs.component';

//Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../enviroment/enviroment';
import { getFirestore } from "firebase/firestore";
// import { NgbdSortableHeader } from './directives/sortable.directive';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
@NgModule({
    exports: [
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
        RoleNamePipe,
        ReactiveFormsModule,
        
    ],
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
        InfoDialogComponent,
        LoginComponent,
        CreateUserComponent,
        AuthViewComponent,
        RoleNamePipe,
        LogsComponent,
        
    ],
    bootstrap: [AuthViewComponent],

    imports: [
        BrowserModule,    
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
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
        MatMenuModule,
        ReactiveFormsModule,
        MatTableModule,
        
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideStorage(() => getStorage())
        
    ],
    providers: [DatePipe, NotificationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }, provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
