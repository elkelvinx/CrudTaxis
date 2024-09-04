import { ChangeLog, DMLs, ErrorLog, InfoHistoryLog } from '../../models/logs';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { query } from '@angular/animations';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {
  DMLs: string[] = DMLs;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  historyLogForm: FormGroup;
  changeLogForm: FormGroup;
  errorLogForm: FormGroup;
  historyLogs: MatTableDataSource<any>;
  changelogs: MatTableDataSource<any>;
  errorLogs: MatTableDataSource<any>;
  
  tabLoadTimes: Date[] = [];

   infoHistoryLogs: InfoHistoryLog[] = [
    new InfoHistoryLog(1, 101, 'John Doe', 'Admin', '2023-05-01T09:00:00', '2023-05-01T17:00:00'),
    new InfoHistoryLog(2, 102, 'Jane Smith', 'User', '2023-05-01T10:00:00', '2023-05-01T18:00:00')
  ];
  
   changeHistoryLogs: ChangeLog[] = [
    new ChangeLog(1, 'John Doe', 101, 'Admin', 'Users', '2023-05-01T11:30:00', 'UPDATE'),
    new ChangeLog(2, 'Jane Smith', 102, 'User', 'Products', '2023-05-01T14:45:00', 'INSERT')
  ];
  
   errorHistoryLogs: ErrorLog[] = [
    new ErrorLog(1, 'John Doe', 101, 'Orders', 'Invalid order status', '2023-05-01T13:15:00', 'UPDATE'),
    new ErrorLog(2, 'Jane Smith', 102, 'Inventory', 'Insufficient stock', '2023-05-01T16:20:00', 'DELETE')
  ];
  

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.historyLogForm = this.fb.group({
      id: [''],
      idUser: [''],
      userName: [''],
      roleName: [''],
      entry: [''],
      exits: ['']
    });
    this.historyLogs = new MatTableDataSource<any>([]);
    this.changeLogForm = this.fb.group({
      id: [''],
      UserName: [''],
      idUser: [''],
      roleName: [''],
      nameTable: [''],
      StartModDate: [''],
      EndModDate: [''],
      query: [''],
      DML: ['']
    });
    this.changelogs = new MatTableDataSource<any>([]);
    this.errorLogForm = this.fb.group({
      id: [''],
      UserName: [''],
      idUser: [''],
      nameTable: [''],
      MessageError: [''],
      StartDateError: [''],
      EndDateError: [''],
      query: [''],
      DML: ['']
    });
    this.errorLogs = new MatTableDataSource<any>([]);
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }
    return this.tabLoadTimes[index];
  }

  onTabChange(event: MatTabChangeEvent) {
    this.getTimeLoaded(event.index);
  }

  applyHistoryLogFilter() {
    console.log(this.historyLogForm.value);
    // Implement filter logic here
  }

  applyChangeLogFilter() {
    console.log(this.changeLogForm.value);
    // Implement filter logic here
  }

  applyErrorLogFilter() {
    console.log(this.errorLogForm.value);
    // Implement filter logic here
  }
  MostrarObj(){
    console.log(this.changeHistoryLogs);
  }
  guardarStatus(event: any){
    console.log(this.changeHistoryLogs);
  }
}