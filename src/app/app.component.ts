import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarseComponent } from "./usuarios/registrarse/registrarse.component";
import { IniciarSesionComponent } from "./usuarios/iniciar-sesion/iniciar-sesion.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recetas';
}
