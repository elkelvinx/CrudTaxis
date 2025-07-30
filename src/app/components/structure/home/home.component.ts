import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  visibleCards = 3;
  currentIndex = 0;
  autoSlideInterval: any;

  slides = [
    {
      title: 'Conductores',
      icon: 'person',
      description: 'Gestión completa de los datos personales y documentación de los taxistas.'
    },
    {
      title: 'Permisionarios',
      icon: 'assignment_ind',
      description: 'Administración de los propietarios de concesiones y permisos.'
    },
    {
      title: 'Unidades',
      icon: 'local_taxi',
      description: 'Registro de placas, modelo, color y pólizas de las unidades de taxi.'
    },
    {
      title: 'Siniestros',
      icon: 'car_crash',
      description: 'Control de accidentes y reportes de incidentes relacionados a los taxis.'
    },
    {
      title: 'Administradores',
      icon: 'supervisor_account',
      description: 'Usuarios con privilegios especiales para modificar el sistema.'
    },
    {
      title: 'PDF / Documentos',
      icon: 'picture_as_pdf',
      description: 'Subida de licencias, seguros y otros archivos importantes.'
    },
    {
      title: 'Historial y Logs',
      icon: 'history',
      description: 'Visualiza cambios en el sistema y errores del backend.'
    },
    {
      title: 'Extras Admin',
      icon: 'local_library',
      description: 'Funciones avanzadas para administradores del sistema.'
    }
  ];


  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.setupResponsiveBehavior();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    clearInterval(this.autoSlideInterval);
  }

  private setupResponsiveBehavior(): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.breakpoints[Breakpoints.Handset]) {
          this.visibleCards = 1;
        } else if (result.breakpoints[Breakpoints.Tablet]) {
          this.visibleCards = 2;
        } else {
          this.visibleCards = 3;
        }
        this.currentIndex = 0; // Reset index on resize
      });
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 500000);
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }


  get visibleSlides() {
    const visible = [];
    for (let i = 0; i < this.visibleCards; i++) {
      const index = (this.currentIndex + i) % this.slides.length;
      visible.push(this.slides[index]);
    }
    return visible;
  }

}