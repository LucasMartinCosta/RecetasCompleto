import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegistrarseComponent } from './usuarios/registrarse/registrarse.component';
import { IniciarSesionComponent } from './usuarios/iniciar-sesion/iniciar-sesion.component';
import { PagInicioComponent } from './pages/pag-inicio/pag-inicio.component';
import { RecetaDetailComponent } from './recetas/receta-detail/receta-detail.component';
import { RecetaFormComponent } from './recetas/receta-form/receta-form.component';
import { RecetaListComponent } from './recetas/receta-list/receta-list.component';
import { ListasPersonalizadasComponent } from './recetas/listas-personalizadas/listas-personalizadas.component';
import { MiListasComponent } from './recetas/mi-listas/mi-listas.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { Component } from '@angular/core';
import { RecetaUpdateComponent } from './recetas/receta-update/receta-update.component';
import { ListaDetailComponent } from './recetas/lista-detail/lista-detail.component';
import { DetalleMiReceteComponent } from './recetas/detalle-mi-recete/detalle-mi-recete.component';


export const routes: Routes = [
    {path:'',component:PagInicioComponent},
    //rutas para inicio,registro, homepage una vez iniciado
    {path:'registrarse', component:RegistrarseComponent},
    {path:'iniciarSesion',component:IniciarSesionComponent},
    {path:'home',component:HomePageComponent},
    //rutas para detalle recetas, agregar,modificar
    {path:'recetas-detalles/:id', component: RecetaDetailComponent},
    {path:'agregar-receta', component: RecetaFormComponent},
    {path:'modificar-receta/:id', component: RecetaUpdateComponent},
    //ruta para buscador de receta
    {path: 'recetas', component: RecetaListComponent},
    //rutas para las listas personales
    {path:'agregar-lista', component:ListasPersonalizadasComponent},
    {path:'perfil', component:PerfilPageComponent},
    {path:'mis-listas', component: MiListasComponent},
    {path:'lista/:id', component:ListaDetailComponent},
    { path: 'receta-lista-detalle/:idLista/:idReceta', component: DetalleMiReceteComponent }, 
    {path:'**', redirectTo:'home'}
];
