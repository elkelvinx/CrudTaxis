import { OnInit, Component } from '@angular/core';
import { Input } from '@angular/core'; import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AutoCompleteComponent } from '../auto-complete/auto-complete.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
/**
 * @title Dialog elements
 */

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './dialog-Contact.html',
  styleUrl: './contact-dialog.component.css'
})
export class ContactDialogComponent {
  data = 'Contact';
  @Input() arraySt: any[] = [];
  @Input() arrayCol: any[] = [];
  @Input() streetName: string[] = [];
  @Input() settlementName: string[] = [];
  @Input() idContact: number = 0;
  constructor(public dialog: MatDialog) { }

  openDialog(arraySt: any[], arrayCol: any[], idContact: number, settlementName: string[], streetName: string[]) {
    this.dialog.open(DialogElementsExampleDialog, {
      data: {
        street: arraySt,
        settlement: arrayCol,
        idContact: idContact,
        settlementName: settlementName,
        streetName: streetName
      }
    });
  }
}
import { contactDriver } from '../../../models/contactDriver';
import { ServicesContactService } from '../../../services/contactDialog-service.service';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-ContactDialog',
  templateUrl: 'contact-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, AutoCompleteComponent, YesNoDialogComponent],
})
export class DialogElementsExampleDialog implements OnInit {
  public settlements: any[] = [];
  public streets: any[] = [];
  public settlementName: string[] = [];
  public streetName: string[] = [];
  public idContact: number = 0;
  public relationship: any[] = [];
  public relationshipName: string[] = [];
  public contactDriver = new contactDriver();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private serviciosContact: ServicesContactService,
  ) {
    this.streets = data.street;
    this.settlements = data.settlement;
    this.idContact = data.idContact;
    this.settlementName = data.settlementName;
    this.streetName = data.streetName;
  }

  ngOnInit(): void {
    debugger
    console.log(this.idContact)
    this.consultarContactDriver(this.idContact);
    this.consultarRelations();
  }

  consultarContactDriver(idAdmin: any) {
    this.serviciosContact.consultarContactId(idAdmin).subscribe(
      (data: any) => {
        this.contactDriver = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  public grabar() {
    this.serviciosContact.Grabar(this.contactDriver).subscribe(
      (data: any) => {
        console.log("Guardado correctamente" + data)
      },
      error => {
        console.log(error);
      }
    )
  }
  public actualizar() {
    debugger
    this.serviciosContact.Actualizar(this.contactDriver).subscribe(
      (data) => {
        console.log("Actualizado correctamente" + data)

      },
      error => {
        console.log(error);
      }
    )
  }
  consultarRelations() {
    this.serviciosContact.consultarRelations().subscribe(
      (data: any) => {
        this.relationship = data;
        this.relationshipName = this.relationship.map((x: any) => x.name);
        console.log(this.relationshipName);
        console.log(this.relationship);
      },
      error => {
        console.log(error);
      }
    )
  }
  public guardarStreet(event: Event, op: number) {
    console.log(event + "y el valor es ");
    for (let i = 0; i < this.streets.length; i++) {
      if (this.streets[i].name == event) {
        switch (op) {
          case 1:
            this.contactDriver.st1 = this.streets[i].id;
            this.contactDriver.street1 = this.streets[i].name;
            console.log(this.contactDriver.st1);
            break;
          case 2:
            this.contactDriver.st2 = this.streets[i].id;
            this.contactDriver.street2 = this.streets[i].name;
            break;
          case 3:
            this.contactDriver.st3 = this.streets[i].id;
            this.contactDriver.street3 = this.streets[i].name;
            break;
        }
        break;
      }
    }
  }
  public guardarDireccion(event: Event) {
    console.log(event + "y el valor es ");
    for (let i = 0; i < this.settlements.length; i++) {
      if (this.settlements[i].name == event) {
        this.contactDriver.settlement = this.settlements[i].id;
        console.log(this.contactDriver.settlement);
        break;
      }
    }
  }
  public guardarContact(event: Event) {
    debugger
    for (let i = 0; i < this.relationship.length; i++) {
      if (this.relationship[i].name == event) {
        this.contactDriver.relation = this.relationship[i].id;
        console.log(this.contactDriver.relation);
        debugger
        break;
      }
    }
  }
}

