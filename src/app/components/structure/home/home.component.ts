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
      title: 'Unidades',
      image: "../../../../assets/images/home_Carrousel/Unit_S.jpg",
      description: 'Registro de placas, modelo, color y pólizas de las unidades de taxi.'
    },
    {
      title: 'Permisionarios',
      image: "../../../../assets/images/home_Carrousel/Permissionaires_S.jpg",
      description: 'Administración de los propietarios de concesiones y permisos.'
    },
    {
      title: 'Siniestros',
      image: "../../../../assets/images/home_Carrousel/Sinister_S.jpg",
      description: 'Control de accidentes y reportes de incidentes relacionados a los taxis.'
    },
    {
      title: 'Conductores',
      image: "../../../../assets/images/home_Carrousel/driver.jpg",
      description: 'Gestión completa de los datos personales y documentación de los taxistas.'
    },
    
    {
      title: 'Administradores',
       image: "../../../../assets/images/home_Carrousel/Administrator_S.jpg",
      description: 'Usuarios con privilegios especiales para modificar el sistema.'
    },
    // C:\Archivos_progr-\ANGULAR\Teodoro programa\taxissqlteo\src\assets\images\home_Carrousel
    {
      title: 'PDF / Documentos',
      image: 'assets/img/docs.jpg',
      description: 'Subida de licencias, seguros y otros archivos importantes para cada entidad.'
    },
    {
      title: 'Historial y Logs',
      image: 'assets/img/history.jpg',
      description: 'Solo para administradores: cambios en el sistema y errores del backend.'
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

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
    if (this.currentIndex + this.visibleCards < this.slides.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(0, this.slides.length - this.visibleCards);
    }
  }

  get visibleSlides() {
    return this.slides.slice(this.currentIndex, this.currentIndex + this.visibleCards);
  }
}