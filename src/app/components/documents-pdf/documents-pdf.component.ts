import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadPhotosService } from '../../services/upload-photos.service';
import { ReadService } from '../../services/crudDataArray/extra-Read.service';

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

  drivers: any[] = [];
  driverName: string[] = [];
public entityNames: string[] = []; // ← nombres filtrados para autocomplete
  //? Opciones fijas para tipo de entidad
  entityTypes = ['driver','administrador', 'permissionaire', 'unit', 'sinister'];

  //SIMULACION
  //? Simulación de registros para cada tipo
  entities: Entity[] = [];
  allEntities: { [key: string]: Entity[] } = {
    driver: [
      { id: 1, name: 'Juan Pérez' },
      { id: 2, name: 'María García' }
    ],
    permissionaire: [
      { id: 3, name: 'Transportes Gómez' },
      { id: 4, name: 'Taxi Express' }
    ],
    unit: [
      { id: 5, name: 'Unidad 123' },
      { id: 6, name: 'Unidad 456' }
    ],
    sinister: [
      { id: 7, name: 'Siniestro #2024-A' },
      { id: 8, name: 'Siniestro #2024-B' }
    ]
  };

  //? Simulación de tipos de documento desde la BD
  documentTypes = [
    { code: 'driver_license', name: 'Licencia de Conducir' },
    { code: 'insurance_policy', name: 'Póliza de Seguro' },
    { code: 'vehicle_registration', name: 'Tarjeta de Circulación' },
    { code: 'accident_report', name: 'Reporte de Siniestro' }
  ];

  constructor(
    private fb: FormBuilder, 
    private uploadService: UploadPhotosService,
    private servicioApp: ReadService
  ) { }

  //! no comprendo el uso de la propiedad "entityType" en el formulario, ya que no se encuentra en la interfaz Entity. ¿Es un error o es intencional? 

  ngOnInit(): void {
    this.consultarDriverName();
    this.form = this.fb.group({
      entityType: ['', Validators.required],
      entityId: ['', Validators.required],
      documentType: ['', Validators.required],
      description: [''],
      file: [null, Validators.required]
    });

    // Cargar tipos desde API
    this.loadEntities();

    // Cuando cambie el tipo de entidad, actualizamos los registros disponibles
    this.form.get('entityType')?.valueChanges.subscribe(type => {
      this.entities = this.allEntities[type] || [];
      const entityIdControl = this.form.get('entityId');
      entityIdControl?.setValue(''); // limpia la selección anterior

      if (this.entities.length) {
        entityIdControl?.enable();   // ← habilita si hay entidades
        this.form.get('entityId')?.setValue(''); // Reinicia el valor seleccionado
      } else {
        entityIdControl?.disable();  // ← deshabilita si no hay
      }
    });
  }

  loadEntities() {


  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.form.get('file')?.setValue(input.files[0]);
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
  }

  onSubmit(): void {
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
          // Notifica éxito con tu NotificationService si deseas
        },
        error: err => {
          console.error('Error al subir:', err);
          // Muestra error en UI si lo deseas
        }
      }
      );

      console.log('Datos a enviar:', formData);
      // Aquí se puede construir un FormData para enviarlo al backend con el archivo
    } else {
      this.form.markAllAsTouched();
    }
  }
//! GET ALL CATALOGS
  consultarDriverName() {
    this.servicioApp.consultarDriverName().subscribe(
      (data: any[]) => {
        this.drivers = data;
        this.driverName = this.drivers.map(driver => driver.name);
        this.entityNames = this.driverName
        console.log(this.drivers);
      },
        error => {
          console.log(error);
        }
    )
  }
handleSelectedEntity(selectedName: string) {
  const match = this.entities.find(e => e.name === selectedName);
  if (match) {
    this.form.get('entityId')?.setValue(match.id);
  } else {
    this.form.get('entityId')?.reset();
  }
}

}