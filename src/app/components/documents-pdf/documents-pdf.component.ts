import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-documents-pdf',
  templateUrl: './documents-pdf.component.html',
  styleUrls: ['./documents-pdf.component.css']
})
export class DocumentsPDFComponent {
  // Grupo de formulario para manejar los campos
  form: FormGroup;
  
  // Variables para controlar el estado
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  isUploading: boolean = false;
  allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  maxFileSize = 5 * 1024 * 1024; // 5MB en bytes

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Inicialización del formulario con validaciones
    this.form = this.fb.group({
      file: [null, Validators.required],
      description: ['', [Validators.maxLength(500)]],
      documentType: ['', Validators.required]
    });
  }

  /**
   * Método que se ejecuta cuando se selecciona un archivo
   * @param event - Evento del input file
   */
  onFileChange(event: any): void {
    // Reiniciamos el estado previo
    this.selectedFile = null;
    this.form.patchValue({ file: null });

    // Verificamos si hay archivos seleccionados
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Validación 1: Tipo de archivo permitido
      if (!this.allowedFileTypes.includes(file.type)) {
        this.showError('Tipo de archivo no permitido. Solo se aceptan JPEG, PNG o PDF.');
        return;
      }

      // Validación 2: Tamaño máximo del archivo
      if (file.size > this.maxFileSize) {
        this.showError(`El archivo es demasiado grande. Máximo permitido: ${this.maxFileSize / 1024 / 1024}MB`);
        return;
      }

      // Si pasa las validaciones, asignamos el archivo
      this.selectedFile = file;
      this.form.patchValue({ file: file });
    }
  }

  /**
   * Método para mostrar mensajes de error
   * @param message - Mensaje a mostrar
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
    // Limpiamos el input file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  /**
   * Método que se ejecuta al enviar el formulario
   */
  onSubmit(): void {
    // Verificamos si el formulario es válido
    if (!this.form.valid || !this.selectedFile) {
      this.showError('Por favor complete todos los campos requeridos.');
      return;
    }

    // Preparamos los datos para enviar
    this.isUploading = true;
    this.uploadProgress = 0;

    // Creamos FormData para enviar el archivo y los metadatos
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('description', this.form.get('description')?.value);
    formData.append('documentType', this.form.get('documentType')?.value);
    formData.append('uploadDate', new Date().toISOString());

    // Aquí iría la llamada al servicio para subir el archivo
    // this.imagenService.subirDocumento(formData).subscribe(...);
    
    // Simulamos una subida para demostración
    this.simulateUpload(formData);
  }

  /**
   * Método para simular la subida de archivos (solo para demo)
   * @param formData - Datos a enviar
   */
  private simulateUpload(formData: FormData): void {
    console.log('Datos preparados para enviar:', {
      fileName: this.selectedFile?.name,
      size: this.selectedFile?.size,
      type: this.selectedFile?.type,
      formData: formData
    });

    // Simulamos progreso de subida
    const interval = setInterval(() => {
      this.uploadProgress += Math.random() * 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false;
        this.snackBar.open('Archivo subido exitosamente!', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.resetForm();
      }
    }, 300);
  }

  /**
   * Método para resetear el formulario después de una subida exitosa
   */
  private resetForm(): void {
    this.form.reset();
    this.selectedFile = null;
    this.uploadProgress = 0;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}