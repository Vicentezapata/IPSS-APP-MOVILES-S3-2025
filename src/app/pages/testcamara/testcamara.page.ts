import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCard,IonCardContent,IonButton } from '@ionic/angular/standalone';
//IMPORTACIONES DE LA CAMARA
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { FotocamaraStorageService, FotoCamara } from 'src/app/services/fotocamara-storage.services';

@Component({
  selector: 'app-testcamara',
  templateUrl: './testcamara.page.html',
  styleUrls: ['./testcamara.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonCard,IonCardContent,IonButton]
})
export class TestcamaraPage implements OnInit {
  fotos: FotoCamara[] = [];
  imagenCapturada: string | undefined;

  constructor(
    private fotoCamaraStorageService: FotocamaraStorageService
  ) { }

  async ngOnInit() {
    this.fotos = await this.fotoCamaraStorageService.obtenerFotos('vzapata');
    console.log('Fotos cargadas desde almacenamiento local:', this.fotos);
  }

  async tomarFoto() {
    try{
      /**
       * Camera.getPhoto - Opciones disponibles (documentación rápida)
       * 
       * quality?: number (0-100)
       *   - Calidad de compresión de la imagen. Más alto = mayor calidad y tamaño.
       *   - Soporte: iOS / Android / Web
       * 
       * allowEditing?: boolean
       *   - Permite al usuario recortar/editar la foto antes de devolverla.
       *   - En iOS abre el editor nativo; en Android el soporte puede variar.
       * 
       * resultType?: CameraResultType
       *   - Formato del resultado devuelto por la cámara.
       *   - Valores:
       *       - CameraResultType.Uri: devuelve rutas (path, webPath) a la imagen.
       *       - CameraResultType.Base64: devuelve base64String (sin cabecera data:).
       *       - CameraResultType.DataUrl: devuelve dataUrl (con prefijo data:image/*;base64,).
       *   - Recomendación: Uri para mejor rendimiento; DataUrl/Base64 para previsualizar o subir rápido.
       * 
       * source?: CameraSource
       *   - Origen de la imagen.
       *   - Valores:
       *       - CameraSource.Prompt: muestra un prompt para elegir Cámara o Galería.
       *       - CameraSource.Camera: abre la cámara directamente.
       *       - CameraSource.Photos: abre la galería.
       * 
       * saveToGallery?: boolean
       *   - Guarda una copia de la foto en la galería del dispositivo.
       *   - Soporte: iOS / Android (no aplica a Web).
       * 
       * direction?: CameraDirection
       *   - Selecciona cámara frontal o trasera.
       *   - Valores: CameraDirection.Rear (trasera), CameraDirection.Front (frontal).
       * 
       * width?: number, height?: number
       *   - Redimensiona la imagen resultante (en píxeles). Mantiene proporción si defines solo uno.
       *   - Útil para reducir peso de la imagen antes de subirla.
       * 
       * presentationStyle?: 'fullscreen' | 'popover'
       *   - iOS: control de cómo se presenta el selector (especialmente en iPad).
       * 
       * webUseInput?: boolean
       *   - Web: si es true usa <input type="file"> para mayor compatibilidad (por ejemplo en iOS Safari).
       * 
       * promptLabelHeader?: string
       * promptLabelPhoto?: string
       * promptLabelPicture?: string
       * promptLabelCancel?: string
       *   - Personaliza los textos del prompt cuando source = CameraSource.Prompt.
       */
      const foto = await Camera.getPhoto({
        quality: 90, // Calidad de la imagen (0-100)
        allowEditing: false, // Permitir recorte/edición antes de obtener el resultado
        resultType: CameraResultType.DataUrl, // Formato devuelto: DataUrl | Base64 | Uri
        source: CameraSource.Camera, // Origen: Prompt | Camera | Photos

        // Opcionales: descomenta y ajusta según necesidad
        // saveToGallery: true, // Guarda una copia en la galería del dispositivo (iOS/Android)
        // direction: CameraDirection.Rear, // Cámara trasera (Rear) o frontal (Front)
        // width: 1024, // Ancho máximo en px (redimensiona la imagen)
        // height: 1024, // Alto máximo en px (redimensiona la imagen)
        // presentationStyle: 'popover', // iOS: 'fullscreen' | 'popover'
        // webUseInput: false, // Web: usa <input type="file"> para mayor compatibilidad
        // promptLabelHeader: 'Selecciona origen', // Personaliza encabezado del prompt (source: Prompt)
        // promptLabelPhoto: 'Desde galería', // Texto para galería
        // promptLabelPicture: 'Usar cámara', // Texto para cámara
        // promptLabelCancel: 'Cancelar', // Texto para cancelar
      })
      this.imagenCapturada = foto.dataUrl;
      console.log('Foto tomada:', foto);
      console.log('Imagen capturada:', this.imagenCapturada);

      //Guardar foto en el almacenamiento local
      const nuevaFoto: FotoCamara = {
        nombreArchivo: `foto_${new Date().getTime()}.jpeg`,
        rutaArchivo : foto.webPath || '', // Puedes dejarlo vacío o asignar una ruta si es necesario
        fechaCaptura: new Date(),
        base64Data: foto.dataUrl || ''
      };
      this.fotos.push(nuevaFoto);
      await this.fotoCamaraStorageService.guardarFoto('vzapata', this.fotos);
      console.log('Foto guardada en almacenamiento local:', nuevaFoto);

      // Nota sobre el resultado según resultType:
      // - DataUrl: usa foto.dataUrl para obtener 'data:image/jpeg;base64,...'
      // - Base64: usa foto.base64String (sin prefijo data:)
      // - Uri: usa foto.webPath (Web/Hybrid) o foto.path (nativo) para cargar/mostrar la imagen
    } catch (e) {
      // Manejo básico de errores: cancelación del usuario, permisos denegados, etc.
      console.error('Error al tomar foto:', e);
    }

  }

}
