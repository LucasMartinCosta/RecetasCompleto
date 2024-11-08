import { Component, OnInit } from '@angular/core';
import { RecipeInfo } from '../../interfaces/recetas';
import { RecetasService } from '../../service/recetas.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receta-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receta-detail.component.html',
  styleUrl: './receta-detail.component.css'
})
export class RecetaDetailComponent implements OnInit{
  recipe?: RecipeInfo;

  constructor(
    private route: ActivatedRoute,
    private servicio: RecetasService
  ) {}


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicio.getRecipeInfotmation(id).subscribe({
      next: (data) => (this.recipe = data),
      error: (e: Error) => console.log('Error al cargar los detalles de la receta', e)
    });
  }

  getInstructions() {
    return this.recipe?.instructions.split('\n')
  }




}
