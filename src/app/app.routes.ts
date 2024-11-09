import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegistrarseComponent } from './usuarios/registrarse/registrarse.component';
import { IniciarSesionComponent } from './usuarios/iniciar-sesion/iniciar-sesion.component';
import { PagInicioComponent } from './pages/pag-inicio/pag-inicio.component';
import { RecetaDetailComponent } from './recetas/receta-detail/receta-detail.component';
import { RecetaFormComponent } from './recetas/receta-form/receta-form.component';
import { RecetaListComponent } from './recetas/receta-list/receta-list.component';
import { ListasPersonalizadasComponent } from './recetas/listas-personalizadas/listas-personalizadas.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';


export const routes: Routes = [
    {path:'',component:PagInicioComponent},
    {path:'registrarse', component:RegistrarseComponent},
    {path:'iniciarSesion',component:IniciarSesionComponent},
    {path:'home',component:HomePageComponent},
    {path:'recetas-detalles/:id', component: RecetaDetailComponent},
    {path:'agregar-receta', component: RecetaFormComponent},

    {path: 'recetas', component: RecetaListComponent},
    {path:'agregar-lista', component:ListasPersonalizadasComponent},
    {path:'perfil', component:PerfilPageComponent}
];
