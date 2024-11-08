import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserActivo } from '../interfaces/user-activo';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  
  constructor() { }
  private userActivo?:UserActivo;

  urlUsuarios= 'http://localhost:3000/Usuarios';
  http= inject(HttpClient);

  Registrarse(usuario: User):Observable<Boolean>{
    return this.http.post<User>(this.urlUsuarios,usuario).pipe(
      map(({id,nombreUsuario})=>{
        if(id){
          this.userActivo = {id,nombreUsuario};
          return true;
        }
        return false;
      })
    )
  }

  getUsuarios():Observable<User[]>{
    return this.http.get<User[]>(this.urlUsuarios);
  }

  login(nombreUsuario: string, password: string): Observable<boolean> {
    
    return this.http.get<User[]>(`${this.urlUsuarios}?nombreUsuario=${nombreUsuario}`).pipe(
      map((users) => {
        const user = users.at(0);
        if (user && user.nombreUsuario == nombreUsuario && user.contrasena == password) {
           this.userActivo = { nombreUsuario: user.nombreUsuario, id: user.id! }; 
         
          return true;
        }
        return false;
      })
    );
  }

}
