import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonItem,IonButton,IonIcon,IonList } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation'; // Funcionalidad de GPS

// INTERFACES PARA UBICACIÓN GPS
interface UbicacionGPS {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

@Component({
  selector: 'app-testgeo',
  templateUrl: './testgeo.page.html',
  styleUrls: ['./testgeo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonItem,IonButton,IonList,IonIcon]
})
export class TestgeoPage implements OnInit {

  ubicacion: UbicacionGPS | undefined;
  obteniendoUbicacion: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  // MÉTODO PARA OBTENER LA UBICACIÓN GPS
  async obtenerUbicacion() {
    this.obteniendoUbicacion = true;
    try {
      //Solicitar permiso y obtener la ubicación actual
      //const permisos = await Geolocation.requestPermissions();
      //if (permisos.location === 'granted') {
        const posicion = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });
        this.ubicacion = {
          latitude: posicion.coords.latitude,
          longitude: posicion.coords.longitude,
          accuracy: posicion.coords.accuracy,
          timestamp: posicion.timestamp
        };
        console.log('Ubicación obtenida:', this.ubicacion);
      //   console.error('Permiso de ubicación denegado');
      //   alert('Permiso de ubicación denegado. Por favor, habilítalo en la configuración del dispositivo.');
      // }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    } finally {
      this.obteniendoUbicacion = false;
    }
  }
  // FUNCIÓN PARA OBTENER ENLACE DE GOOGLE MAPS
  obtenerEnlaceMaps(): string {
    if (this.ubicacion) {
      console.log('Generando enlace de Google Maps para la ubicación:', this.ubicacion);
      return `https://www.google.com/maps?q=${this.ubicacion.latitude},${this.ubicacion.longitude}`;
    }
    console.log('No hay ubicación disponible para generar el enlace de Google Maps.');
    return '';
  }

}
