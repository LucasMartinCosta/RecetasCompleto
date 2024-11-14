import { Component, inject, OnInit } from '@angular/core';
import { RecetasService } from '../../service/recetas.service';
import { Receta, RecipeInfo } from '../../interfaces/recetas';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ignoreElements, map } from 'rxjs';
import { RecetaCardComponent } from '../receta-card/receta-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';

@Component({
  selector: 'app-receta-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RecetaCardComponent,
    CommonModule,NavBarLoginComponent,FooterComponent],
  templateUrl: './receta-list.component.html',
  styleUrl: './receta-list.component.css'
})
export class RecetaListComponent{

  servicio = inject(RecetasService);
  fb = inject(FormBuilder);
  router = inject(Router)

  listaRecetas : RecipeInfo[]= [];
  ingredients : string = ""
  contenedorRecetas = false; 
  idRecetaModelo: number = 0 


  formulario = this.fb.nonNullable.group({
    ingredientes : ["", [Validators.required]]
  })

  setIngredientes () {
    if (this.formulario.invalid) {
      console.log("formulario Invalido");
       return;
    }
    const ingredientesForm :string = this.formulario.get("ingredientes")?.value || ""; 
    this.ingredients=ingredientesForm;   
    this.listarRecetasPorIngredientes(ingredientesForm) // llamo a la funcion de abajo que usa el servicio y carga en el arreglo las recetas
  }


  //Devuelve recetas por ingredientes buscados, se le pasa un array con los ingredientes y la cantidad de respuestas que
  //queres que te devuelva
  listarRecetasPorIngredientes (ingredientes : string) {
    this.servicio.getRecetasByIngredients(ingredientes, 5).subscribe({
      next : (data) => {
        console.log(ingredientes);
        console.log(data);
          this.listaRecetas=data
      },
      error: (e:Error) => {
        console.log("Error al bajar las recetas", e);
      }
    })
  }


  actualizarRecetas() {
    this.idRecetaModelo = this.listaRecetas[0].id;
    const idModelo = this.idRecetaModelo;
  
    this.servicio.getSimilarRecipes(idModelo, 5).subscribe({
      next: (recetasSimilares) => {
        // Usamos `Promise.all` para esperar a que todas las recetas tengan su información completa
        const recetasCompletas = recetasSimilares.map((receta: any) => 
          this.servicio.getRecipeInfotmation(receta.id).toPromise()
        );
  
        Promise.all(recetasCompletas).then((recetas) => {
          this.listaRecetas = recetas; // Ahora `listaRecetas` tendrá recetas con imágenes y más detalles
        }).catch((error) => console.log(error));
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }
  

  //devuelve la info de una receta por id
  recipe?:RecipeInfo;
  getRecipeInformation (id:number) {
    this.servicio.getRecipeInfotmation(id).subscribe({
      next : (data) => {
        console.log(data);
        this.recipe=data;
      },
      error:(e:Error) => {
        console.log(e.message);
      }
    })
  }

  navigateToDetails(id: number) {
    this.router.navigate([`/recetas-detalles/${id}`]);
}
}
