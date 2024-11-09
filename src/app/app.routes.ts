import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegistrarseComponent } from './usuarios/registrarse/registrarse.component';
import { IniciarSesionComponent } from './usuarios/iniciar-sesion/iniciar-sesion.component';
import { PagInicioComponent } from './pages/pag-inicio/pag-inicio.component';
import { RecetaDetailComponent } from './recetas/receta-detail/receta-detail.component';
import { RecetaFormComponent } from './recetas/receta-form/receta-form.component';


export const routes: Routes = [
    {path:'',component:PagInicioComponent},
    {path:'registrarse', component:RegistrarseComponent},
    {path:'iniciarSesion',component:IniciarSesionComponent},
    {path:'home',component:HomePageComponent},
    {path:'recetas-detalles/:id', component: RecetaDetailComponent},
    {path:'agregar', component: RecetaFormComponent},
    {path: '**', redirectTo: 'home'}
];
