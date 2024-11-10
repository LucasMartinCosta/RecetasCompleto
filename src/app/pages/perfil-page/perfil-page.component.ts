import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { UserActivo } from '../../interfaces/user-activo';
import { User } from '../../interfaces/user';
import { NavBarLoginComponent } from "../../navegadores/nav-bar-login/nav-bar-login.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [NavBarLoginComponent, FooterComponent, RouterModule],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.css'
})
export class PerfilPageComponent implements OnInit{

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
  }

  servicio = inject(UsuariosService);

  userACT:UserActivo={
    id:0,
    nombreUsuario:''
  };

  userComun:User={
    nombreUsuario:'',
    contrasena:'',
    listas:[]
  };


}
