import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServicesAdminService } from '../../services/services-admin.service';
//importamos el servicio que forma la url
//https://localhost:44319/Api/Admin?id=1

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})


export class AdminsComponent {
  //es la clase de admins
  public Admin : any = {
    id: 0,
    name: null,
    lm1: null,
    lm2: null,
    phone: null,
    st1:0,
    st2:0,
    st3:0,
    settlement:0,
    extNumber:0,
    birthDate: '2023-06-15',
    registerD: null,
    lastModDate: null,
    mail:null,
    street1: null,
    street2: null,
    street3: null,
    settlementS: null,   
  };

  public listAdmin : any [] = [];


  constructor(private datePipe: DatePipe,
    private serviciosAdmin: ServicesAdminService) { }

  ngOnInit(): void {
    debugger;
    this.consultarAdmin(this.Admin.id);
    this.consultarAdmins();
  }
//LastModD se obtiene automaticamente en el backend

  searchAdmin(){
  this.consultarAdmin(this.Admin.id);
  }
  //CONSULTARADMIN CON EL ID 5
  consultarAdmin(idAdmin: any){
    this.Admin=this.serviciosAdmin.consultarAdminId(idAdmin).subscribe(
    (data)=>{
      this.Admin=data;
      this.Admin.birthDate = this.datePipe.transform(this.Admin.birthDate, 'yyyy-MM-dd'); 
      this.Admin.lastModDate = this.datePipe.transform(this.Admin.lastModDate, 'yyyy-MM-dd'); 
      if(this.Admin.birthDate=='0001-01-01'){
        debugger;
        this.Admin.birthDate='1990-06-06';
      }
      if(this.Admin.lastModDate=='0001-01-01'){
        debugger;
        this.Admin.lastModDate='2023-06-06';
      }

    },
    error=>{
      console.log(error);
    }
    )
  }

  consultarAdmins(){

  this.serviciosAdmin.consultarAdmins().subscribe(
    (data: any[])=>{
      this.listAdmin=data;
     
      
    
    },
    error=>{
      console.log(error);
    }
    )
  }
  public grabar(){
    this.Admin=this.serviciosAdmin.Grabar(this.Admin).subscribe(
    (data)=>{
      debugger;
      console.log("Guardado correctamente")
  },
    error=>{
      console.log(error);
    }
    )
  }
  //https://localhost:44319/Api/Admin
  public actualizar(){
    this.Admin=this.serviciosAdmin.Actualizar(this.Admin).subscribe(
    (data)=>{
      debugger;
      console.log("Actualizado correctamente")
  },
    error=>{
      console.log(error);
    }
    )
  }
  public eliminar(){
    debugger;
    this.Admin=this.serviciosAdmin.Eliminar(this.Admin.id).subscribe(
    (data)=>{
      debugger;
      console.log("Eliminado correctamente")
      console.log(data)
  },
    error=>{
      console.log(error);
    }
    )
  }
}

