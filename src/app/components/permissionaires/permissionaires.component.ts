import { Component } from '@angular/core';
import { ServicesPermissionaireService } from '../../services/services-permissionaire.service'; 
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-permissionaires',
  templateUrl: './permissionaires.component.html',
  styleUrl: './permissionaires.component.css'
})
export class PermissionairesComponent {

  public Permission : any = {
    id: 0,
    name: null,
    lm1: null,
    lm2: null,
    birth: null,
    phone: null,
    st1:0,
    st2:0,
    st3:0,
    settlement:0,
    extNumber:0,
    registerD: null,
    lastModDate: null,
    street1: null,
    street2: null,
    street3: null,
    settlementS: null,   
     fecha : new Date()
  };
  
  public listPermission : any [] = [];
  constructor(private datePipe: DatePipe,private servicioPermission: ServicesPermissionaireService) { 
   
    
  }

  ngOnInit(): void {
    debugger;
    
    this.Permission.lastModDate= `${this.Permission.fecha.getFullYear()}-${this.Permission.fecha.getMonth()+1}-${this.Permission.fecha.getDate()}`;
    this.consultarPermission(this.Permission.id);
    this.consultarPermissions();
    console.log(this.Permission.lastModDate);
  }
//LastModD se obtiene automaticamente en el backend

  searchPermission(){
  this.consultarPermission(this.Permission.id);
  }
  consultarPermission(idPermission: any){
    this.Permission=this.servicioPermission.consultarPermissionId(idPermission).subscribe(
    (data)=>{
      this.Permission=data;
      this.Permission.birth = this.datePipe.transform(this.Permission.birth, 'yyyy-MM-dd'); 
      if(this.Permission.birth=='0001-01-01'){
        debugger;
        this.Permission.birth='1990-06-06';
        this.consultarPermissions();
      }
      debugger;
    },
    error=>{
      console.log(error);
    }
    )
  }
  consultarPermissions(){

    this.servicioPermission.consultarPermissions().subscribe(
      (data: any[])=>{
        this.listPermission=data;
      },
      error=>{
        console.log(error);
        
      }
      )
    }
  public grabar(){
    this.Permission=this.servicioPermission.Grabar(this.Permission).subscribe(
    (data)=>{
      debugger;
      console.log("Guardado correctamente")
      this.consultarPermissions();
  },
    error=>{
      console.log(error);
    }
    )
  }
  public actualizar(){
    this.Permission=this.servicioPermission.Actualizar(this.Permission).subscribe(
    (data)=>{
      debugger;
      console.log("Actualizado correctamente")
      this.consultarPermissions();
  },
    error=>{
      console.log(error);
    }
    )
  }
  public eliminar(){
    debugger;
    this.Permission=this.servicioPermission.Eliminar(this.Permission.id).subscribe(
    (data)=>{
      debugger;
      console.log("Eliminado correctamente")
      console.log(data)
      this.consultarPermissions();
  },
    error=>{
      console.log(error);
    }
    )
  }
}

