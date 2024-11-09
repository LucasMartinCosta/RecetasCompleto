import { Component, inject, OnInit } from '@angular/core';
import { ListaRecetasPersonalizadas, RecipeInfo } from '../../interfaces/recetas';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { UsuariosService } from '../../service/usuarios.service';
import { UserActivo } from '../../interfaces/user-activo';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-listas-personalizadas',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule,
  FooterComponent,NavBarLoginComponent],
  templateUrl: './listas-personalizadas.component.html',
  styleUrl: './listas-personalizadas.component.css'
})
export class ListasPersonalizadasComponent implements OnInit{

  ngOnInit(): void {
    this.servicioUsuario.getUserActivo().subscribe(
      {
        next:(usuario)=>{
          this.userACT=usuario[0];
          this.servicioUsuario.getUSerById(this.userACT.id).subscribe({

            next:(usuario)=>
            {
              this.userComun=usuario;
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

  userACT:UserActivo={
    id:0,
    nombreUsuario:''
  };
  userComun:User={
    nombreUsuario:'',
    contrasena:'',
    listas:[]
  };


    servicioUsuario = inject(UsuariosService);


    listas: ListaRecetasPersonalizadas[] = []; //esta variable solo sirve para mostrar las todas las listas
    servicio = inject(ListasPersonalizadasService);
    fb = inject(FormBuilder);

    nombreLista ?= "";
    arrayRecetas : RecipeInfo[] = [];

    constructor() {}

    formulario = this.fb.nonNullable.group({
      nombre : ["", Validators.required]
    })

    setNombreLista () {
      if (this.formulario.invalid) return;
      this.nombreLista = this.formulario.get("nombre")?.value || "";
    }

    postLista () {

      this.setNombreLista();
      const listaNueva : ListaRecetasPersonalizadas = {
        nombre : this.nombreLista,
        recetas : this.arrayRecetas
      }

      this.servicio.postLista(listaNueva).subscribe({
        next: () => {
          console.log("Lista creada correctamente");
          this.userComun.listas.push(listaNueva);
        },
        error: (e:Error) => {
          console.log(e.message);
        }
      })
    }

    eliminarLista (id:string) {

      this.servicio.deleteLista(id). subscribe ({
        next : (lista) => {
          console.log("Lista eliminada correctamente", lista);
        },
        error: (e:Error) => {
          console.log(e.message);
        }
      })
    }






}

