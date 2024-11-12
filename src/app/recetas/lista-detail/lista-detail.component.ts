import { ListaRecetasPersonalizadas, Receta, RecipeInfo } from './../../interfaces/recetas';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UsuariosService } from '../../service/usuarios.service';
import { UserActivo } from '../../interfaces/user-activo';
import { User } from '../../interfaces/user';
import { RecetaCardComponent } from "../receta-card/receta-card.component";
import { DeleteUpdateOutputComponent } from "../delete-update-output/delete-update-output.component";

@Component({
  selector: 'app-lista-detail',
  standalone: true,
  imports: [NavBarLoginComponent, FooterComponent, RecetaCardComponent, DeleteUpdateOutputComponent],
  templateUrl: './lista-detail.component.html',
  styleUrl: './lista-detail.component.css'
})
export class ListaDetailComponent implements OnInit {



  userACT: UserActivo = {
    id: 0,
    nombreUsuario: ''
  };

  userComun: User = {
    nombreUsuario: '',
    contrasena: '',
    listas: []
  };
  rutas = inject(Router)
  lista?: ListaRecetasPersonalizadas;
  route = inject(ActivatedRoute);
  service = inject(ListasPersonalizadasService)
  servicioUser = inject(UsuariosService);
  cdr = inject(ChangeDetectorRef)

  recetasarreglo: Array<RecipeInfo> = [];

  recetamostrar: Receta = {
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    title: '',
    readyInMinutes: 0,
    servings: 0,
    instructions: '',
    spoonacularScore: 0,
    image: '',
    anotaciones: ""
  };

  cargararreglo() {
    this.lista?.recetas.forEach(recetas => {
      this.recetasarreglo.push(recetas as RecipeInfo);
    })
  }

  ngOnInit(): void {
    // Obtener el ID de la lista desde la URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.servicioUser.getUserActivo().subscribe(
        {
          next: (userEncontrado) => {
            this.userACT = userEncontrado[0]
            this.servicioUser.getUSerById(this.userACT.id).subscribe({
              next: (usuario) => {
                this.userComun = usuario
                this.lista = this.userComun.listas.find((lista: any) => lista.id === Number(id))
                this.cargararreglo();

              },
              error: (err: Error) => {
                console.log(err.message);
              }
            })
          },
          error: (err: Error) => {
            console.log(err.message);
          }
        }
      )
    }
  }

  navigateToDetails(event: { listaId: number; recetaId: number }) {
    const { listaId, recetaId } = event;
    this.rutas.navigate([`receta-lista-detalle/${listaId}/${recetaId}`]);
  }

  deleteRecipe(recipeId: number) {



    this.lista?.recetas.splice(recipeId - 1!, 1);

    this.servicioUser.editUser(this.userComun).subscribe({
      next: () => {
        alert('Receta eliminada exitosamente de la lista seleccionada!');
        this.cdr.detectChanges();

        this.rutas.navigate([`lista/${this.lista?.id}'`])
      },
      error: (err) => {
        console.error("Error al eliminar la receta:", err);
      }
    });
  }



  deleterecipe2(recipeId: number) {

    const index = this.lista?.recetas.findIndex(receta => receta.id === recipeId);

    if (index !== -1) {
      // Elimina la receta del arreglo de recetas
      this.lista?.recetas.splice(index!, 1);

    }

  }


  deleterecipe22(recipeId: number) {

    if (this.lista?.recetas) {
      const index = this.lista.recetas.findIndex(receta => receta.id === recipeId);


      if (index !== -1) {

        this.lista.recetas.splice(index, 1);


        this.servicioUser.editUser(this.userComun).subscribe({
          next: () => {
            alert('Receta eliminada exitosamente!');
            this.cdr.detectChanges();
            this.rutas.navigate([`lista/${this.lista?.id}'`])
          },
          error: (err) => {
            console.error("Error al eliminar la receta:", err);
          }
        });
      } else {
        console.log('Receta no encontrada.');
      }
    } else {
      console.error('No se encontraron recetas.');
    }
  }

  Onupdate(recipeId: number) {

    if (this.lista?.recetas) {
      const index = this.lista.recetas.findIndex(receta => receta.id === recipeId);


      if (index !== -1) {

        this.rutas.navigate([`modificar-receta/${index}`]);



      } else {
        console.log('Receta no encontrada.');
      }
    } else {
      console.error('No se encontraron recetas.');
    }

  }

  onUpdate(recipeId: number) {
    if (this.lista?.recetas) {
      const receta = this.lista.recetas.find(receta => receta.id === recipeId);


      if (receta) {

        this.rutas.navigate([`modificar-receta/${recipeId}`]);



      } else {
        console.log('Receta no encontrada.');
      }
    } else {
      console.error('No se encontraron recetas.');
    }
  }

}

