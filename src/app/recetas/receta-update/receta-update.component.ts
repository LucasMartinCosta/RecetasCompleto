import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecetasService } from '../../service/recetas.service';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navegadores/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { User } from '../../interfaces/user';
import { UserActivo } from '../../interfaces/user-activo';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-receta-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NavBarLoginComponent,FooterComponent],
  templateUrl: './receta-update.component.html',
  styleUrl: './receta-update.component.css'
})
export class RecetaUpdateComponent implements OnInit {

  ngOnInit(): void {
    this.servicio.getUserActivo().subscribe(
      {
        next:(usuario)=>{
          this.userACT=usuario[0];
          this.servicio.getUSerById(this.userACT.id).subscribe({

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
  //serviceListo = inject(ListasPersonalizadasService);
  servicio=inject(UsuariosService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  idLista = 0;

  formulario=this.fb.nonNullable.group({

    id:[0],
    title: ['', Validators.required],
    vegetarian: [false, Validators.required],  // Tipo boolean
    vegan: [false, Validators.required],       // Tipo boolean
    glutenFree: [false, Validators.required],  // Tipo boolean
    readyInMinutes: [0, [Validators.required, Validators.min(1)]],  // Tipo number
    servings: [1, [Validators.required, Validators.min(1)]],        // Tipo number
    instructions: ['', Validators.required],
    image: [''],
    spoonacularScore: [0],
    listaId: [0, Validators.required]
  });

  userACT:UserActivo={
    id:0,
    nombreUsuario:''
  };

  userComun:User={
    nombreUsuario:'',
    contrasena:'',
    listas:[]
  };

id: number|null=null;

updateRecipe() {
  if (this.formulario.invalid || this.id === null) return;

  const receta = this.formulario.getRawValue();
  const listaId = this.formulario.get('listaId')?.value;
  const listaSeleccionada = this.userComun.listas.find(lista => lista.id === Number(listaId));

  if (listaSeleccionada) {
    // Encuentra el índice de la receta en la lista utilizando el id de la receta
    const recetaIndex = listaSeleccionada.recetas.findIndex(receta => receta.id === this.id);

    if (recetaIndex !== -1) {
      // Actualiza la receta en el índice encontrado
      listaSeleccionada.recetas[recetaIndex] = { ...listaSeleccionada.recetas[recetaIndex], ...receta };

      // Guarda los cambios en el backend
      this.servicio.editUser(this.userComun).subscribe({
        next: () => {
          alert('Receta modificada exitosamente!');
          this.router.navigate(['/mis-listas'])
        },
        error: (e: Error) => {
          console.error("Error al modificar la receta:", e);
        }
      });
    } else {
      console.error('Receta no encontrada en la lista.');
    }
  } else {
    console.error("Lista seleccionada no encontrada.");
  }
}


}
