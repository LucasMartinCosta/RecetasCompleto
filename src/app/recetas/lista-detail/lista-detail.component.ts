import { ListaRecetasPersonalizadas } from './../../interfaces/recetas';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UsuariosService } from '../../service/usuarios.service';
import { UserActivo } from '../../interfaces/user-activo';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-lista-detail',
  standalone: true,
  imports: [NavBarLoginComponent, FooterComponent],
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
lista?: ListaRecetasPersonalizadas;
 route = inject(ActivatedRoute);
 service = inject(ListasPersonalizadasService)
 servicioUser = inject(UsuariosService);

 /*ngOnInit(): void {
  
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {

    this.service.getListabyId(id).subscribe({
      next: (data) => {
        this.lista = data;
      },
      error: (e: Error) => {
        console.log('Error al cargar los detalles de la lista', e);
      }
    });
  } else {
    console.log('ID no encontrado en la ruta');
  }
}*/

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


}
