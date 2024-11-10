import { ListaRecetasPersonalizadas, Receta, RecipeInfo } from './../../interfaces/recetas';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UsuariosService } from '../../service/usuarios.service';
import { UserActivo } from '../../interfaces/user-activo';
import { User } from '../../interfaces/user';
import { RecetaCardComponent } from "../receta-card/receta-card.component";

@Component({
  selector: 'app-lista-detail',
  standalone: true,
  imports: [NavBarLoginComponent, FooterComponent, RecetaCardComponent],
  templateUrl: './lista-detail.component.html',
  styleUrl: './lista-detail.component.css'
})
export class ListaDetailComponent implements OnInit {
  


  userACT:UserActivo= {
    id: 0,
    nombreUsuario:''
  };

  userComun:User={
    nombreUsuario:'',
    contrasena:'',
    listas:[]
  };
  rutas = inject(Router)
 lista?: ListaRecetasPersonalizadas;
 route = inject(ActivatedRoute);
 service = inject(ListasPersonalizadasService)
 servicioUser = inject(UsuariosService);

recetasarreglo: Array<RecipeInfo>=[];

  recetamostrar:Receta ={
      vegan: false,
      vegetarian:false,
      glutenFree:false,
      title:'',
      readyInMinutes:0,
      servings:0,
      instructions:'',
      spoonacularScore:0,
      image:''
    };

 cargararreglo()
 {
  this.lista?.recetas.forEach(recetas=>{
    this.recetasarreglo.push(recetas as RecipeInfo);
  })
 }

ngOnInit(): void {
  // Obtener el ID de la lista desde la URL
  const id = this.route.snapshot.paramMap.get('id');

  if(id)
  {
    this.servicioUser.getUserActivo().subscribe(
      {
        next:(userEncontrado)=>{
          this.userACT = userEncontrado[0]
          this.servicioUser.getUSerById(this.userACT.id).subscribe({
            next:(usuario)=>{
              this.userComun= usuario
              this.lista = this.userComun.listas.find((lista: any) => lista.id === Number(id))
              this.cargararreglo();
              
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
}

navigateToDetails(id: number) {
  this.rutas.navigate([`recetas-detalles/${id}`]);
 }

 deleteRecipe(recipeId: number) {
  // Obtén el ID de la lista seleccionada
  const listaId = this.route.snapshot.paramMap.get('id');

  // Encuentra la lista seleccionada en el usuario
  const listaSeleccionada = this.userComun.listas.find(lista => lista.id === Number(listaId));

  if (listaSeleccionada) {
    // Encuentra el índice de la receta en la lista
    const index = listaSeleccionada.recetas.findIndex(receta => receta.id === recipeId);

    if (index !== -1) {
      // Elimina la receta de la lista
      listaSeleccionada.recetas.splice(index, 1);

      // Guarda los cambios en el backend
      this.servicioUser.editUser(this.userComun).subscribe({
        next: () => {
          alert('Receta eliminada exitosamente de la lista seleccionada!');
        },
        error: (err) => {
          console.error("Error al eliminar la receta:", err);
        }
      });
    } else {
      console.error("Receta no encontrada en la lista.");
    }
  } else {
    console.error("Lista seleccionada no encontrada.");
  }
}
}
