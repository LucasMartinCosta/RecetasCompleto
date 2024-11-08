import { Component, inject, OnInit } from '@angular/core';
import { ListaRecetasPersonalizadas, RecipeInfo } from '../../interfaces/recetas';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-listas-personalizadas',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './listas-personalizadas.component.html',
  styleUrl: './listas-personalizadas.component.css'
})
export class ListasPersonalizadasComponent{
    

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

