import { ListaRecetasPersonalizadas } from './../../interfaces/recetas';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListasPersonalizadasService } from '../../service/listas-personalizadas.service';
import { NavBarLoginComponent } from '../../navegadores/nav-bar-login/nav-bar-login.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-lista-detail',
  standalone: true,
  imports: [NavBarLoginComponent, FooterComponent],
  templateUrl: './lista-detail.component.html',
  styleUrl: './lista-detail.component.css'
})
export class ListaDetailComponent {
  
lista?: ListaRecetasPersonalizadas;
 route = inject(ActivatedRoute);
 service = inject(ListasPersonalizadasService)

 ngOnInit(): void {
  
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
}


}
