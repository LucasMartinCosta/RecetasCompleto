import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecetasService } from '../../service/recetas.service';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receta-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './receta-update.component.html',
  styleUrl: './receta-update.component.css'
})
export class RecetaUpdateComponent implements OnInit {

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        const idString = param.get('id'); // Obtener el valor como string o null
        this.id = idString !== null ? Number(idString) : null; // Convertir a número si no es null
  
        if (this.id === null || isNaN(this.id)) {
          console.log('El valor de id no es un número válido');
          this.id = null; // Opcional: asignar null si no es un número válido
        } else {
          console.log('ID numérico:', this.id);
        }
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }

serviceRec = inject(RecetasService);
serviceListo = inject(ListasPersonalizadasService);
fb = inject(FormBuilder);
router = inject(Router);
route = inject(ActivatedRoute);

id: number|null=null;

formulario=this.fb.nonNullable.group({
  title: ['', Validators.required],  
  vegetarian: [false, Validators.required],  // Tipo boolean
  vegan: [false, Validators.required],       // Tipo boolean
  glutenFree: [false, Validators.required],  // Tipo boolean
  readyInMinutes: [0, [Validators.required, Validators.min(1)]],  // Tipo number
  servings: [1, [Validators.required, Validators.min(1)]],        // Tipo number
  instructions: ['', Validators.required],
  image: [''],
  spoonacularScore: [0]
});

updateRecipe() {
  if (this.formulario.invalid || this.id === null) return;
  const receta = this.formulario.getRawValue();

  this.serviceRec.updateReceta(this.id, receta).subscribe({
    next: () => {
      alert('¡Receta actualizada con éxito!');
     
      this.router.navigate(['home']);
    },
    error: (e: Error) => {
      console.error('Error al actualizar receta:', e.message);
    }
  });
}


}
