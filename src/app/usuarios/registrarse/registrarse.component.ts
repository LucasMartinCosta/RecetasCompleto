import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsuariosService } from '../../service/usuarios.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../navegadores/navbar/navbar.component";
import { ListasPersonalizadasComponent } from '../../recetas/listas-personalizadas/listas-personalizadas.component';
import { ListaRecetasPersonalizadas } from '../../interfaces/recetas';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]]
  })


  //lista favoritos creada automaticamente
  listaInicial : ListaRecetasPersonalizadas = {
    id:0, 
    nombre:"Favoritos", 
    recetas:[]
  }

  listasIniciales : ListaRecetasPersonalizadas[] = [this.listaInicial]

  constructor(private authService: UsuariosService, private router: Router, private listasPersonalizadasService:
    ListasPersonalizadasService) { }

  onSubmit() {
    if (this.form.invalid) return;
    const formValues = this.form.getRawValue();

    const email = formValues.email;
    if (email === null) {
      alert('El correo electrónico es obligatorio.');
      return;
    }



    this.authService.checkEmailExists(email).subscribe({
      next: (emailExists) => {
        if (emailExists) {
          alert('Este correo electrónico ya está registrado. Por favor, elige otro.');
        } else {

          const user: User = {
            nombreUsuario: formValues.username ?? '',
            contrasena: formValues.password ?? '',
            email: email ?? '',
            listas: this.listasIniciales
          };

          this.authService.signup(user).subscribe({
            next: () => {
              alert('Usuario agregado');
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error(error);
              console.log('Redirecting to Home');
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 1500);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error checking email: ', error);
      }
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

   */

}
