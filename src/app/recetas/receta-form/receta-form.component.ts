import { RecetasService } from './../../service/recetas.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { CommonModule } from '@angular/common';
import { Receta2 } from '../../interfaces/recetas';

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './receta-form.component.html',
  styleUrl: './receta-form.component.css'
})
export class RecetaFormComponent implements OnInit {

  serviceRec = inject(RecetasService);
  serviceListo = inject(ListasPersonalizadasService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  recetas: Array<Receta2>= [];

 
 

  formulario=this.fb.nonNullable.group({
    title: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),  // Asegúrate de que los ingredientes son strings
      vegetarian: [false, Validators.required],  // Tipo boolean
      vegan: [false, Validators.required],       // Tipo boolean
      glutenFree: [false, Validators.required],  // Tipo boolean
      readyInMinutes: [0, [Validators.required, Validators.min(1)]],  // Tipo number
      servings: [1, [Validators.required, Validators.min(1)]],        // Tipo number
      instructions: ['', Validators.required] 
   
  });

  ngOnInit(){
    this.serviceRec.getRecetas().subscribe(
      {
        next: (recetas)=>{
         this.recetas=recetas;
      
        },
    
        error:(e:Error)=>{
          console.log(e);
        }
      }
    )
  }
get ingredients() {
  return this.formulario.get('ingredients') as FormArray;
}

addIngredient() {
  this.ingredients.push(this.fb.control(''));
}

removeIngredient(index: number) {
  this.ingredients.removeAt(index);
}

addRecipe(){
  if(this.formulario.invalid) return
  const receta = this.formulario.getRawValue()

  this.serviceRec.postRectea(receta).subscribe({
    next: ()=>{
      alert ('receta agregada con exito!')
    },
    error:(e : Error)=>{
      console.log(e.message)

    }
  })
} 

updateRecipe(id:string) {
  if (this.formulario.invalid || id === null) return;
  const receta = this.formulario.getRawValue();

  this.serviceRec.updateReceta(id, receta).subscribe({
    next: () => {
      alert('¡Receta actualizada con éxito!');
      this.router.navigate(['']);
    },
    error: (e: Error) => {
      console.error('Error al actualizar receta:', e.message);
    }
  });
}

// Método para eliminar receta
deleteRecipe(id:string) {
  if (id=== null) return alert('BOLUDAZO')

  this.serviceRec.deleteReceta(id).subscribe({
    next: () => {
      alert('¡Receta eliminada con éxito!');
      this.router.navigate(['']);
    },
    error: (e: Error) => {
      console.error('Error al eliminar receta:', e.message);
    }
  });
}

}




















