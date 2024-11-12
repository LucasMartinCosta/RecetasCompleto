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
  urlActivo = "http://localhost:3000/UsuarioActivo"
  http= inject(HttpClient);

  auth(): Observable<UserActivo | undefined> {
    return this.activeUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.urlUsuarios}?username=${username}`).pipe(
        map((users) => {
            const user = users.at(0);
            if (user && user.nombreUsuario === username && user.contrasena === password) {
                this.activeUserSubject.next({ nombreUsuario: user.nombreUsuario, id: user.id! });
                localStorage.setItem('token', user.id?.toString()!)
                return user;
            }
            return null;
        }),
        catchError(() => of(null))
    );
}

loginChat(username: string, password: string): Observable<User | null> {
  return this.http.get<User[]>(`${this.urlUsuarios}?username=${username}`).pipe(
      map((users) => {
          // Buscar el usuario que coincida tanto en el nombre de usuario como en la contraseña
          const user = users.find(u => u.nombreUsuario === username && u.contrasena === password);
          if (user) {
              this.activeUserSubject.next({ nombreUsuario: user.nombreUsuario, id: user.id! });
              localStorage.setItem('token', user.id?.toString()!);
              return user;
          }
          return null; // Si no encuentra el usuario, retorna null
      }),
      catchError(() => of(null))
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

  getUSerById (id:number) : Observable<User>{
    return this.http.get<User>(`${this.urlUsuarios}/${id}`)
  }

  getUSer () : Observable<User[]> {
    return this.http.get<User[]>(this.urlUsuarios)
  }


  postUserActivo (user:UserActivo) : Observable<UserActivo> {
    return this.http.post<UserActivo>(this.urlActivo, user)
  }

  editUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.urlUsuarios}/${user.id}`, user);
  }

  getUserActivo(): Observable<UserActivo[]> {
    return this.http.get<UserActivo[]>(this.urlActivo);
  }

  deleteUserActivo (id:string) : Observable<void>{
    return this.http.delete<void>(`${this.urlActivo}/${id}`)
  }

  clearUserActivo(): Observable<void> {
    return this.http.delete<void>(this.urlActivo); // Esta línea elimina todos los usuarios activos si json-server lo permite.
  }












}
