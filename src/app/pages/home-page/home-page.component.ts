import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecetasService } from '../../service/recetas.service';
import { RecipeInfo } from '../../interfaces/recetas';
import { RecetasRandom, Recipe } from '../../interfaces/recetasRandom';
import { RecetaCardComponent } from "../../recetas/receta-card/receta-card.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RecetaCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {


  rutas = inject(Router);
  servicio= inject(RecetasService);

  listaRecetas: Array<Recipe>= []
  
  obtenerRecetasRandom()
  {
    this.servicio.getRandomRecipe(5).subscribe(
      {
        next:(data)=>{
        console.log(data);
        this.listaRecetas=data.recipes;
        },
        error:(err:Error)=>{
          console.log(err.message);
        }
      }
    )
  }

  navigateToDetails(id: number) {
   this.rutas.navigate([`/receta-detalle/${id}`]);
  }


}
