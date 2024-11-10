import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { UsuariosService } from '../../service/usuarios.service';
import { NavbarComponent } from "../../navegadores/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { UserActivo } from '../../interfaces/user-activo';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, RouterModule, FooterComponent],
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
        next: (user) => {
            if (user) {
                this.asignarUserActivo(user);
                this.router.navigate(['home']);
            } else {
                console.log('Error en las credenciales');
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

  asignarUserActivo(user: User) {
    const userActivo: UserActivo = { id: user.id!, nombreUsuario: user.nombreUsuario };
    this.authService.postUserActivo(userActivo).subscribe({
        next: (user) => {
            console.log("Usuario en sesión:", user);
        },
        error: (e: Error) => {
            console.log(e.message);
        }
    });
}
    
    
}
