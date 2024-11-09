import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { UserActivo } from '../../interfaces/user-activo';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.css'
})
export class PerfilPageComponent {

  servicio = inject(UsuariosService);

}
