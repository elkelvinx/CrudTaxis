import { ChangeLog, DMLs, ErrorLog, InfoHistoryLog } from '../../models/logs';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceLogsService } from '../../services/service-logs.service';
import { NotificationService } from '../tools/info-dialog/notification.service';
import { Sort, MatSort,MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeLogPipe } from '../../pipes/changeLog.pipe';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  private _liveAnnouncer = inject(LiveAnnouncer);
  DMLs: string[] = DMLs;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  historyLogForm: FormGroup;
  changeLogForm: FormGroup;
  errorLogForm: FormGroup;
  historyLogs: MatTableDataSource<any>;
  changelogs: MatTableDataSource<any>;
  errorLogs: MatTableDataSource<any>;
  public pipeLog: ChangeLogPipe;

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


  constructor(private fb: FormBuilder, private serviceLog: ServiceLogsService,
    private notificationService: NotificationService,private datePipe: DatePipe, private sanitazer: DomSanitizer) {
      this.pipeLog = new ChangeLogPipe(datePipe,sanitazer);
     }

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
    this.changelogs = new MatTableDataSource<any>([]); this.errorLogForm = this.fb.group({
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
    this.GetAllLoadPage();
    this.errorLogs = new MatTableDataSource<any>([]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  GetAllLoadPage() {
    this.serviceLog.GetHistoryLogIn().subscribe(
      (data:any) => {
        data = this.pipeLog.mixNameIdLoop(data);
        console.log(data);
        this.historyLogs = new MatTableDataSource<any>(data);
      }
    );
    this.serviceLog.GetChangeLog().subscribe(
      (data : any) => {
       data= this.pipeLog.mixNameIdLoop(data);
        console.log(data);
        this.changelogs = new MatTableDataSource<any>(data);
      }
    );
    this.serviceLog.GetErrorLog().subscribe(
      (data) => {
        data = this.pipeLog.mixNameIdLoop(data);        
        this.errorLogs = new MatTableDataSource<any>(data);
      }
    );
  }
  openInfoDialog(query: string) {
    this.notificationService.displayMessageError("El query ejecutado", "El query que se ejecuto es el siguiente \"" + query + "\"");
  }
  openErroMensaje(error: string) {
    this.notificationService.displayMessageError("Error anterior", "El error que le aparecio al usuario es:\"" + error + "\"");
  }
  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }
    return this.tabLoadTimes[index];
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
  MostrarObj() {
    console.log(this.changeHistoryLogs);
  }
  guardarStatus(event: any) {
    console.log(this.changeHistoryLogs);
  }
}