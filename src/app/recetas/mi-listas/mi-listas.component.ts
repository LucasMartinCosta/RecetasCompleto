import { Component, OnInit, inject } from '@angular/core';
import {Router, RouterModule } from '@angular/router';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ListasPersonalizadasComponent } from '../listas-personalizadas/listas-personalizadas.component';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { ListaRecetasPersonalizadas } from '../../interfaces/recetas';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../service/usuarios.service';
import { UserActivo } from '../../interfaces/user-activo';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-mi-listas',
  standalone: true,
  imports: [RouterModule, NavBarLoginComponent, FooterComponent,
     ListasPersonalizadasComponent, CommonModule],
  templateUrl: './mi-listas.component.html',
  styleUrl: './mi-listas.component.css'
})
export class MiListasComponent implements OnInit{

  listas: ListaRecetasPersonalizadas[]= [];
  servicio =inject(ListasPersonalizadasService);
  router= inject(Router)
  serviciouser= inject(UsuariosService);

  userACT:UserActivo={
    id:0,
    nombreUsuario:''
  };

  userComun:User={
    nombreUsuario:'',
    contrasena:'',
    listas:[]
  };


 ngOnInit(): void {
    this.serviciouser.getUserActivo().subscribe(
      {
        next:(usuario)=>{
          this.userACT=usuario[0];
          this.serviciouser.getUSerById(this.userACT.id).subscribe({

            next:(usuario)=>
            {
              this.userComun=usuario;
              this.listas=this.userComun.listas;
              this.mostrarNlistas();
            },
            error:(err:Error)=>
            {
              console.log(err.message);
            }
          })
        },
        error:(err:Error)=>{
          console.log(err.message);
        }
      }
    )
  }

  mostrarNlistas() {
    if (this.listas && this.listas.length > 0) {
        this.listas.forEach((lista, index) => {
            console.log(`Lista personalizada ${index + 1}:`, lista);
        });
    } else {
        console.log("No hay listas personalizadas para mostrar.");
    }
}
  verDetallesLista(id: number){
    if(this.listas.some(u=>u.id === id))
    {
      this.router.navigate([`lista/${id}`]);
    }

  }

  borrarLista(id: number) {

    if (this.listas.some(u => u.id === id)) {

      this.listas = this.listas.filter(lista => lista.id !== id);

      this.serviciouser.editUser(this.userComun).subscribe({
        next:()=>
        {
          
          alert("Lista eliminada")
        
          
        },
        error:(err:Error)=>{
          console.log(err.message);
        }
      })

    }
  }





}
