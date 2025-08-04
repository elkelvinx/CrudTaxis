import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-carrousel',
  standalone: false,
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.css'
})
export class CarrouselComponent {
  private destroy$ = new Subject<void>();
  visibleCards = 3;
  currentIndex = 0;
  autoSlideInterval: any;

  slides = [
    {
      title: 'Conductores',
      icon: 'person',
      description: 'Gestiona los perfiles, documentos y permisos de cada conductor del sistema.'
    },
    {
      title: 'Permisionarios',
      icon: 'assignment_ind',
      description: 'Administra concesiones, permisos y propietarios responsables del servicio.'
    },
    {
      title: 'Unidades',
      icon: 'local_taxi',
      description: 'Consulta y edita placas, modelos, colores y pólizas de los taxis registrados.'
    },
    {
      title: 'Siniestros',
      icon: 'car_crash',
      description: 'Control y seguimiento de los accidentes o incidentes reportados por conductores.'
    },
    {
      title: 'Administradores',
      icon: 'supervisor_account',
      description: 'Usuarios especiales con privilegios para gestionar todo el sistema.'
    },
    {
      title: 'PDF / Documentos',
      icon: 'picture_as_pdf',
      description: 'Subida y administración de licencias, seguros, reportes y más documentos.'
    },
    {
      title: 'Historial y Logs',
      icon: 'history',
      description: 'Revisa quién modificó qué, errores técnicos y cambios críticos en el sistema.'
    },
    {
      title: 'Extras Admin',
      icon: 'local_library',
      description: 'Herramientas avanzadas para ajustar usuarios, roles, calles y colonias.'
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