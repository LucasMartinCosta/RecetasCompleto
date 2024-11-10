import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Receta, Receta2, RecipeInfo } from '../interfaces/recetas';
import { RecetasRandom } from '../interfaces/recetasRandom';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor() { }

  http = inject(HttpClient);
  private key = environment.tokenLaura;
  private baseUrl = 'http://localhost:3001/recetas';


  getRecetasByIngredients (ingredients : string, number:number) : Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.key
    });

    const ignorePantry : boolean = true;
    const params = {ingredients, number,ignorePantry}
    const url = "https://api.spoonacular.com/recipes/findByIngredients"

    return this.http.get(url, {headers, params})
  }

  getRecipeInfotmation (id:number) : Observable <RecipeInfo> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.key
    });

    const includeNutrition : boolean = false;
    const addWinePairing : boolean = false;
    const addTasteData : boolean = false;

    const params = {id, includeNutrition, addWinePairing, addTasteData}
    const url = `https://api.spoonacular.com/recipes/${id}/information`;

    return this.http.get<RecipeInfo>(url, {headers, params})
  }


  getRandomRecipe(number: number = 1, includeNutrition: boolean = false): Observable<RecetasRandom> {
    const params = new HttpParams()
      .set('number', number.toString())
      .set('includeNutrition', includeNutrition.toString());

    // Crear los headers con la API Key
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.key  // La clave API de Spoonacular
    });
    const url = `https://api.spoonacular.com/recipes/random`
    // Hacer la solicitud GET con parámetros y headers
    return this.http.get<RecetasRandom>(url, { headers, params });
  }
//form
getRecetas(): Observable<Receta[]> {
  return this.http.get<Receta[]>(this.baseUrl);
}

  postRectea(receta: Receta): Observable <Receta>{
    return this.http.post<Receta>(this.baseUrl,receta);
  }


   updateReceta(idReceta: number, receta: Receta): Observable<Receta> {
    return this.http.put<Receta>(`${this.baseUrl}/${idReceta}`, receta);
  }


  deleteReceta(idReceta: number): Observable<Receta> {
    return this.http.delete<Receta>(`${this.baseUrl}/${idReceta}`);
  }
  //form
}
