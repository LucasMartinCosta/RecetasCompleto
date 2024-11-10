import { routes } from './../../app.routes';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ListasPersonalizadasComponent } from '../listas-personalizadas/listas-personalizadas.component';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { ListaRecetasPersonalizadas } from '../../interfaces/recetas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mi-listas',
  standalone: true,
  imports: [RouterModule, NavBarLoginComponent, FooterComponent,
     ListasPersonalizadasComponent, CommonModule],
  templateUrl: './mi-listas.component.html',
  styleUrl: './mi-listas.component.css'
})
export class MiListasComponent implements OnInit{
 
  listas: ListaRecetasPersonalizadas[]= [];
  servicio =inject(ListasPersonalizadasService);
  router= inject(Router)

  ngOnInit(): void {
      this.mostrarListas();
  }

  mostrarListas() {
    this.servicio.getListas().subscribe({
      next: (data) => {
        this.listas = data;
        console.log("Listas obtenidas:", this.listas);
      },
      error: (e: Error) => {
        console.error("Error al obtener listas:", e.message);
      }
    });
  }

  verDetallesLista(id: string){
    this.router.navigate(['/lista/',id])
  }
 
  

}
