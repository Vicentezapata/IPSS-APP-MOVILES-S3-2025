import { Injectable } from "@angular/core";
import { Database, ref, push, set, remove, onValue } from "@angular/fire/database";
import { Observable } from "rxjs";

export interface Pedido {
  id?: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseTareasService {
  constructor(private database: Database) {}

  agregarPedido(pedido: Pedido): Promise<void> {
    const pedidosRef = ref(this.database, 'pedidos');
    const nuevoPedidoRef = push(pedidosRef);
    pedido.id = nuevoPedidoRef.key!;
    return set(nuevoPedidoRef, pedido);
  }

  obtenerPedidos(): Observable<Pedido[]> {
    return new Observable<Pedido[]>((observer) => {
      const pedidosRef = ref(this.database, 'pedidos');
      onValue(pedidosRef, (snapshot) => {
        const pedidos: Pedido[] = [];
        snapshot.forEach((childSnapshot) => {
          const pedido: Pedido = childSnapshot.val();
          pedido.id = childSnapshot.key!;
          pedidos.push(pedido);
        });
        observer.next(pedidos);
      });
    });
  }

  actualizarPedido(pedido: Pedido): Promise<void> {
    if (!pedido.id) {
      return Promise.reject('El pedido debe tener un ID para ser actualizado');
    }
    const pedidoRef = ref(this.database, `pedidos/${pedido.id}`);
    return set(pedidoRef, pedido);
  }

  eliminarPedido(id: string): Promise<void> {
    const pedidoRef = ref(this.database, `pedidos/${id}`);
    return remove(pedidoRef);
  }
}