import { Component } from '@angular/core';
import { NavbarComponent } from "../../navegadores/navbar/navbar.component";

@Component({
  selector: 'app-pag-inicio',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './pag-inicio.component.html',
  styleUrl: './pag-inicio.component.css'
})
export class PagInicioComponent {

}
