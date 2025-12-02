import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

//Interfaz Camara que representa la estructura de un pedido
export interface FotoCamara {
    id?: number; //ID opcional, asignado por la base de datos
    nombreArchivo: string; //Nombre del archivo de la foto
    rutaArchivo: string; //Ruta donde se almacena la foto
    fechaCaptura: Date; //Fecha y hora en que se capturó la foto
    base64Data?: string; //Datos de la imagen en formato base64 (opcional)
}

@Injectable({
    providedIn: 'root'
})


export class FotocamaraStorageService {
    private storageKey = 'fotos_camara'; //Clave para almacenar las fotos en Preferences

    // ========================================================================
    // MÉTODO PRIVADO: GENERAR CLAVE DE ALMACENAMIENTO
    // ========================================================================
    private getStorageKey(usuario: string): string {
        return `${this.storageKey}_${usuario}`;
    }
    
    // ========================================================================
    // MÉTODO PÚBLICO: GUARDAR FOTO DE CÁMARA
    // ========================================================================
    async guardarFoto(usuario: string, foto: Object): Promise<void> {
        const key = this.getStorageKey(usuario);
        await Preferences.set({
            key: key,
            value: JSON.stringify(foto)
        });
    
    }
    // ========================================================================
  // MÉTODO: OBTENER FOTO DE CÁMARA
  // =======================================================================
    async obtenerFotos(usuario: string): Promise<FotoCamara[]> {
        const key = this.getStorageKey(usuario);
        const { value } = await Preferences.get({ key: key });
        return value ? JSON.parse(value) : [];
    }

    // ========================================================================
    // MÉTODO PÚBLICO: ELIMINAR FOTO DE CÁMARA
    // ========================================================================
    async eliminarFoto(usuario: string): Promise<void> {
        const key = this.getStorageKey(usuario);
        await Preferences.remove({ key: key });
    }
    
}
