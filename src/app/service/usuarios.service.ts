import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserActivo } from '../interfaces/user-activo';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  
  constructor() { }

  private activeUserSubject = new BehaviorSubject<UserActivo| undefined>(undefined);
  urlUsuarios= 'http://localhost:3000/Usuarios';
  http= inject(HttpClient);

  auth(): Observable<UserActivo | undefined> {
    return this.activeUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.urlUsuarios}?username=${username}`).pipe(
      map((users) => {
        const user = users.at(0);
        if (user && user.nombreUsuario == username && user.contrasena == password) {
          this.activeUserSubject.next({ nombreUsuario: user.nombreUsuario, id: user.id! });
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): Observable<boolean> {
    this.activeUserSubject.next(undefined);
    return of(true);
  }

  signup(user: User): Observable<boolean> {
    return this.http.post<User>(this.urlUsuarios, user).pipe(
      map(({ id, nombreUsuario }) => {
        if (id) {
          this.activeUserSubject.next({id, nombreUsuario});
          return true;
        }
        return false;
      })
    );
  }

  /*

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
    */

}
