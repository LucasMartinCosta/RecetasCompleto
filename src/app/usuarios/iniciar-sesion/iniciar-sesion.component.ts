import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { UsuariosService } from '../../service/usuarios.service';
import { NavbarComponent } from "../../navegadores/navbar/navbar.component";

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, RouterModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  fb = inject(FormBuilder)
  authService = inject(UsuariosService); 
  router = inject(Router)

  listausuarios:Array<User>=[];

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onLogin() {
    if (this.form.invalid) return;
    const { username, password } = this.form.getRawValue();
    this.authService.login(username!, password!).subscribe({
      next: (loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['home']);
        } else { 
          console.log('error en las credenciales');
        }
      },
      error: console.log
    });
  }

  onRevealPassword(pwInput: HTMLInputElement) {
    if (pwInput.type == 'password') {
      pwInput.type = 'text';
    } else {
      pwInput.type = 'password';
    }
  }
  


  /*
  servicioUsuario= inject(UsuariosService);
  rutas = inject(Router);

  formulario=this.fb.nonNullable.group({
    nombreUsuario:['',[Validators.required]],
    contrasena:['',[Validators.required]]
  })

  
  ingresar(){
    if(this.formulario.invalid){
      alert("El formulario esta mal realizado");
      return;
    }

    const user:User = this.formulario.getRawValue();

    

      this.servicioUsuario.getUsuarios().subscribe({
      next:(lista)=>
      {
       this.listausuarios=lista
        const nombreencontrado = this.listausuarios.some(us=>us.nombreUsuario=== user.nombreUsuario);
        const contrasenaEncontrada= this.listausuarios.some(us=>us.contrasena===user.contrasena);

        if(!nombreencontrado){
          alert("El nombre de usuario es incorrecto");
          return;
        }
        if(!contrasenaEncontrada)
        {
          alert("La contraseña es incorrecta");
          return;
        }


        this.servicioUsuario.login(user.nombreUsuario,user.contrasena).subscribe(
          {
            next:(logueado)=>{
              if(logueado){
                this.rutas.navigate(['home']); //tendria que ser el home page putitos
              }
            },
            error:(err:Error)=>{
              console.log(err.message);
            }
          }
        )

      }
    })
    }

   */
    
    
}
