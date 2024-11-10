import { RecetasService } from './../../service/recetas.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { CommonModule } from '@angular/common';
import { Receta, Receta2 } from '../../interfaces/recetas';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { DeleteUpdateOutputComponent } from '../delete-update-output/delete-update-output.component';
import { UserActivo } from '../../interfaces/user-activo';
import { User } from '../../interfaces/user';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FooterComponent,NavBarLoginComponent,DeleteUpdateOutputComponent],
  templateUrl: './receta-form.component.html',
  styleUrl: './receta-form.component.css'
})
export class RecetaFormComponent implements OnInit {

  serviceRec = inject(RecetasService);
  //serviceListo = inject(ListasPersonalizadasService);
  servicio=inject(UsuariosService); 
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  recetas: Array<Receta>= [];

  idLista = 0; 

  formulario=this.fb.nonNullable.group({
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

  ngOnInit(){ // al renderizarse el formulario obtiene el usuario activo y lo carga a userComun, con ese usuario es con el que hay que trabajar. CON EL ARREGLO 
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
  }

  addRecipe() {
    if (this.formulario.invalid) return;
    
    // Obtiene los datos de la receta y el ID de la lista seleccionada
    const receta = this.formulario.getRawValue();
    const listaId = this.formulario.get('listaId')?.value;
    console.log('ID de lista seleccionada:', listaId);
  
    // Encuentra la lista seleccionada en el usuario y agrega la receta
    const listaSeleccionada = this.userComun.listas.find(lista => lista.id === Number(listaId));


    if (listaSeleccionada) {
      listaSeleccionada.recetas.push(receta);
  
      // Opcional: Guarda los cambios en el backend
      this.servicio.editUser(this.userComun).subscribe({
        next: () => {
          alert('Receta agregada exitosamente a la lista seleccionada!');
          this.router.navigate(['/home']); // Redirige al usuario si es necesario
        },
        error: (err) => {
          console.error("Error al guardar la receta:", err);
        }
      });
    } else {
      console.error("Lista seleccionada no encontrada.");
    }
  }
  
/*addRecipe(){  //este addrecipe tiene que guardar la receta en la lista que elige en el formulario 
  if(this.formulario.invalid) return
  const receta = this.formulario.getRawValue()
  const id =  // recibir el id de la receta

  this.userComun.listas[id].recetas.push(receta)
  
}

addRecipe(){  //este addrecipe tiene que guardar la receta en la lista que elige en el formulario 
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
}*/

updateRecipe(id:number) {

  this.router.navigate([`modificar-receta/:${id}`]);
   
}

// Método para eliminar receta 
deleteRecipe(id:number) { //este metodo tiene que eliminar la receta del arreglo en la que esta guardada
  if (id === null) return alert('BOLUDAZO')

  this.serviceRec.deleteReceta(id).subscribe({
    next: () => {
      alert('¡Receta eliminada con éxito!');
     // this.router.navigate(['']);
    },
    error: (e: Error) => {
      console.error('Error al eliminar receta:', e.message);
    }
  });
}

}




















