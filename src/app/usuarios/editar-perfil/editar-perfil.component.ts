import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavBarLoginComponent } from "../../navegadores/nav-bar-login/nav-bar-login.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [NavBarLoginComponent, FooterComponent],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('ID del usuario:', this.userId);
    // Aquí puedes usar el ID para cargar la información del usuario o realizar cualquier acción necesaria
  }
}
