import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsuariosService } from '../../service/usuarios.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  
  rutas = inject(Router);
  fb= inject(FormBuilder);
  servicioLog= inject(UsuariosService);
  
  formulario= this.fb.nonNullable.group({
    nombreUsuario:['',[Validators.required]],
    contrasena:['',[Validators.required]],
    email:['',[Validators.required]]
  })

  addUsuario()
  {
    if(this.formulario.invalid)return;

    var listausuarios:Array<User>= [];
    const usuario: User= this.formulario.getRawValue();

     this.servicioLog.getUsuarios().subscribe({
      next:(usuarios)=>
      {
        listausuarios=usuarios;

        const encontradonombre= listausuarios.some(us=>us.nombreUsuario === usuario.nombreUsuario);
        const encontradoemail= listausuarios.some(us=>us.email === usuario.email);

        
    if(encontradoemail) 
      {
        alert("El email que ingreso ya tiene un usuario");
        return;
      }
  
      if(encontradonombre)
      {
        alert("El nombre de usuario que ingreso ya existe");
        return;
      }

      this.servicioLog.Registrarse(usuario).subscribe({
        next:()=>
        {
          alert("Usuario registrado");
          this.viajariniciarSesion();
        },
        error:(err:Error)=>
        {
          console.log("Error al registrarse:",err.message);
        }
      })
    }      
    })

   
   
  }

  viajariniciarSesion()
   {
    this.rutas.navigate(['iniciarSesion']);
   }
}
