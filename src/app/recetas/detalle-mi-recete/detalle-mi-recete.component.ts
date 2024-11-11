import { Component, inject, OnInit } from '@angular/core';
import { Receta } from '../../interfaces/recetas';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.service';
import { UserActivo } from '../../interfaces/user-activo';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-detalle-mi-recete',
  standalone: true,
  imports: [],
  templateUrl: './detalle-mi-recete.component.html',
  styleUrl: './detalle-mi-recete.component.css'
})
export class DetalleMiReceteComponent implements OnInit{
  

  receta : Receta = {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      id: 0,  // o el valor que desees como predeterminado
      title: "Receta no encontrada",
      readyInMinutes: 0,
      servings: 0,
      image: "",
      instructions: "",
      spoonacularScore: 0
  } 

  route = inject(ActivatedRoute)
  idLista!: number;
  idReceta!: number;
  servicio= inject(UsuariosService)

  userACT:UserActivo={
    id:0,
    nombreUsuario:''
  };

  userComun:User={
    nombreUsuario:'',
    contrasena:'',
    listas:[]
  };

  constructor() {}

  ngOnInit(): void {
    this.idLista = Number(this.route.snapshot.paramMap.get('idLista'));
    this.idReceta = Number(this.route.snapshot.paramMap.get('idReceta'));

    // Aquí puedes usar idLista e idReceta para cargar la información de la receta específica
    console.log('ID de la Lista:', this.idLista);
    console.log('ID de la Receta:', this.idReceta);

    this.buscaUser(); 


  }

  buscaUser() {
    this.servicio.getUserActivo().subscribe({
      next: (usuario) => {
        this.userACT = usuario[0];
        this.servicio.getUSerById(this.userACT.id).subscribe({
          next: (usuarioComun) => {
            this.userComun = usuarioComun;
            this.mostrarReceta(); // Llama a mostrarReceta después de asignar userComun
          },
          error: (err: Error) => {
            console.log(err.message);
          }
        });
      },
      error: (err: Error) => {
        console.log(err.message);
      }
    });
  }

  mostrarReceta() {
    const lista = this.userComun.listas.find((lista) => lista.id === this.idLista);
    
    if (lista) {
      this.receta = lista.recetas.find((receta) => receta.id === this.idReceta) || {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        id: 0,  // o el valor que desees como predeterminado
        title: "Receta no encontrada",
        readyInMinutes: 0,
        servings: 0,
        image: "",
        instructions: "",
        spoonacularScore: 0
      };
    } else {
      console.error('No se encontró la lista con el ID proporcionado');
    }
  }


}