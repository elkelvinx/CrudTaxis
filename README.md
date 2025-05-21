# TaxisSqlTeo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


# Sistema de Gestión de Documentos para Taxis

Sistema web para administrar documentos (PDFs, imágenes) asociados a entidades como conductores, unidades, siniestros y más.

## 🔧 Tecnologías utilizadas

- Angular
- .NET Framework API
- SQL Server
- Firebase Storage (solo para archivos)
- JWT para autenticación
- Angular Material para UI

## 📁 Funcionalidad principal

- Subida de documentos o imagenes desde Angular a la nube
-   El sistema está diseñado para usar servicios de almacenamiento modernos como Firebase o Cloudinary. La actual integración utiliza Cloudinary por facilidad de 
    demostración, pero puede adaptarse a Firebase Storage o AWS S3.
- Almacenamiento de metadatos en SQL Server
- Relación de documentos con conductores, permissionarios, unidades o siniestros
- Visualización de documentos por entidad
- Autenticación con roles y permisos

## 🧪 Próximas funciones (pendientes)
- [ ] Imagen de perfil por usuario
- [ ] Personalización de colores del sistema
- [ ] Cambio de contraseña por parte del usuario

## 📸 Capturas de pantalla

## 🚀 Cómo correr localmente

## 📦 Cómo desplegar

## 📄 Licencia
MIT
*****************TRASH******************
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
