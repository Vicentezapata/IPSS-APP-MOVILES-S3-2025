import { Injectable } from "@angular/core";
import { Database, ref, push, set, remove, onValue } from "@angular/fire/database";
import { Observable } from "rxjs";

export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseTareasService {
  constructor(private database: Database) {}

  agregarUsuario(usuario: Usuario): Promise<void> {
    const usuariosRef = ref(this.database, 'usuarios');
    const nuevoUsuarioRef = push(usuariosRef);
    usuario.id = nuevoUsuarioRef.key!;
    return set(nuevoUsuarioRef, usuario);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return new Observable<Usuario[]>((observer) => {
      const usuariosRef = ref(this.database, 'usuarios');
      onValue(usuariosRef, (snapshot) => {
        const usuarios: Usuario[] = [];
        snapshot.forEach((childSnapshot) => {
          const usuario: Usuario = childSnapshot.val();
          usuario.id = childSnapshot.key!;
          usuarios.push(usuario);
        });
        observer.next(usuarios);
      });
    });
  }

  actualizarUsuario(usuario: Usuario): Promise<void> {
    if (!usuario.id) {
      return Promise.reject('El usuario debe tener un ID para ser actualizado');
    }
    const usuarioRef = ref(this.database, `usuarios/${usuario.id}`);
    return set(usuarioRef, usuario);
  }

  eliminarUsuario(id: string): Promise<void> {
    const usuarioRef = ref(this.database, `usuarios/${id}`);
    return remove(usuarioRef);
  }

  //metodo de login
  obtenerUsuarioPorEmailYPassword(email: string, password: string): Observable<Usuario | null> {
    return new Observable<Usuario | null>((observer) => {
      const usuariosRef = ref(this.database, 'usuarios');
      onValue(usuariosRef, (snapshot) => {
        let usuarioEncontrado: Usuario | null = null;
        snapshot.forEach((childSnapshot) => {
          const usuario: Usuario = childSnapshot.val();
          if (usuario.email === email && usuario.password === password) {
            usuario.id = childSnapshot.key!;
            usuarioEncontrado = usuario;
            return true; // Detener el recorrido
          }
          return false;
        });
        observer.next(usuarioEncontrado);
      });
    });
  }
}
