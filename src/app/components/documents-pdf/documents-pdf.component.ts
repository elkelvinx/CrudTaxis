import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadPhotosService } from '../../services/upload-photos.service';
import { ReadService } from '../../services/crudDataArray/extra-Read.service';
import { ServicesAdminService } from '../../services/services-admin.service';
import { ServicesPermissionaireService } from '../../services/services-permissionaire.service';
import { UnitsService } from '../../services/services-units.service';
import { NotificationService } from '../tools/info-dialog/notification.service';

interface Entity {
  id: number;
  name: string;
}

@Component({
  selector: 'app-documents-pdf',
  templateUrl: './documents-pdf.component.html',
  styleUrls: ['./documents-pdf.component.css']
})
export class DocumentsPdfComponent implements OnInit {
  form: FormGroup;

  entities: Entity[] = [];
  entityNames: string[] = []; // Para autocompletado

  // Tipos de entidades disponibles
  entityTypes = ['driver', 'administrador', 'permissionaire', 'unit', 'sinister'];

  // Tipos de documento (esto luego debería venir de API /DocumentTypes)
  documentTypes = [
    { code: 'driver_license', name: 'Licencia de Conducir' },
    { code: 'insurance_policy', name: 'Póliza de Seguro' },
    { code: 'vehicle_registration', name: 'Tarjeta de Circulación' },
    { code: 'accident_report', name: 'Reporte de Siniestro' }
  ];

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadPhotosService,
    private driverService: ReadService,
    private adminService: ServicesAdminService,
    private permissionaireService: ServicesPermissionaireService,
    private unitService: UnitsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      entityType: ['', Validators.required],
      entityId: ['', Validators.required],
      documentType: ['', Validators.required],
      description: [''],
      file: [null, Validators.required]
    });

    // Reaccionar cuando cambie el tipo de entidad
    this.form.get('entityType')?.valueChanges.subscribe(type => {
      this.loadEntities(type);
    });
  }

  /** Cargar entidades reales según tipo */
  loadEntities(type: string) {
    this.entities = [];
    this.entityNames = [];
    this.form.get('entityId')?.reset();

    switch (type) {
      case 'driver':
        this.driverService.consultarDriverName().subscribe(data => {
          this.entities = data.map(d => ({ id: d.id, name: d.name }));
          this.entityNames = this.entities.map(e => e.name);
          this.notificationService.success("El Conductor ha sido cargado correctamente ✅");
        });
        break;

      case 'administrador':
        this.adminService.consultarAdmins().subscribe(data => {
          this.entities = data.map(a => ({ id: a.id, name: a.name }));
          this.entityNames = this.entities.map(e => e.name);
        });
        break;

      case 'permissionaire':
        this.permissionaireService.consultarPermissions().subscribe(data => {
          this.entities = data.map(p => ({ id: p.id, name: p.name }));
          this.entityNames = this.entities.map(e => e.name);
        });
        break;

      case 'unit':
        this.unitService.consularUnits().subscribe((data) => {
          this.entities = data.map(u => ({ id: u.id, name: u.name }));
          this.entityNames = this.entities.map(e => e.name);
        });
        break;

      case 'sinister':
        // TODO: crear servicio para siniestros y reemplazar este mock
        this.entities = [
          { id: 7, name: 'Siniestro #2024-A' },
          { id: 8, name: 'Siniestro #2024-B' }
        ];
        this.entityNames = this.entities.map(e => e.name);
        break;
    }
  }

  /** Cuando el usuario selecciona una entidad en el autocomplete */
  handleSelectedEntity(selectedName: string) {
    const match = this.entities.find(e => e.name === selectedName);
    if (match) {
      this.form.get('entityId')?.setValue(match.id);
    } else {
      this.form.get('entityId')?.reset();
    }
  }

  /** Cargar archivo */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.form.get('file')?.setValue(input.files[0]);
    }
  }

  /** Enviar datos a la API */
  onSubmit(): void {
    debugger
    if (this.form.valid) {
      const formData = this.form.value;
      this.uploadService.uploadDocument({
        entityType: formData.entityType,
        entityId: formData.entityId,
        documentType: formData.documentType,
        description: formData.description,
        file: formData.file
      }).subscribe({
        next: res => {
          console.log('Respuesta de la API:', res);
         this.notificationService.success("El Conductor ha sido cargado correctamente ✅");
        },
        error: err => {
          console.error('Error al subir:', err);
          err.console.error('Error al subir:', err);
          
          // this.notificationService.error("Error al subir el documento ❌");
           this.notificationService.success("El Conductor ha sido cargado correctamente ✅");
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
