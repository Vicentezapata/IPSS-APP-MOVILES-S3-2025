import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonButton,
  IonButtons,
  IonSpinner
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { 
  peopleOutline,
  people,
  shieldCheckmark,
  refreshOutline,
  cardOutline,
  mailOutline,
  calendarOutline,
  timeOutline,
  eyeOutline,
  createOutline
} from 'ionicons/icons';
/*

"id": 1,
"rut": "USR0001",
"nombre": "Juan",
"apellido": "Perez",
"password": "password1",
"email": "juan.perez@example.com",
"rol": "ADMIN",
"creatAt": null,
"updateAt": null */
interface Usuario {
  id: number;
  rut: string;
  nombre: string;
  apellido: string;
  password: string;
  email: string;
  rol: string;
  creatAt: Date | null;
  updateAt: Date | null;

}

@Component({
  selector: 'app-testapi',
  templateUrl: './testapi.page.html',
  styleUrls: ['./testapi.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonBadge,
    IonButton,
    IonButtons,
    IonSpinner,
    CommonModule,
    FormsModule
  ]
})
export class TestapiPage implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean = false;

  constructor(private http: HttpClient) {
    // Registrar iconos
    addIcons({
      'people-outline': peopleOutline,
      'people': people,
      'shield-checkmark': shieldCheckmark,
      'refresh-outline': refreshOutline,
      'card-outline': cardOutline,
      'mail-outline': mailOutline,
      'calendar-outline': calendarOutline,
      'time-outline': timeOutline,
      'eye-outline': eyeOutline,
      'create-outline': createOutline
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    const apiUrl = 'http://localhost:8080/user/json'; // Reemplaza con la URL real de tu API
    this.http.get<Usuario[]>(apiUrl).subscribe({
      next: (respuesta) => {
        this.usuarios = respuesta;
        this.cargando = false;
        console.log('Usuarios cargados:', this.usuarios);
      },
      error: (error) => {
        console.error('Error al cargar los usuarios:', error);
        this.cargando = false;
      }
    });
  }

  // Obtener iniciales del nombre
  getInitials(nombre: string, apellido: string): string {
    const firstInitial = nombre?.charAt(0)?.toUpperCase() || '';
    const lastInitial = apellido?.charAt(0)?.toUpperCase() || '';
    return firstInitial + lastInitial;
  }

  // Obtener color según rol
  getRolColor(rol: string): string {
    const rolUpper = rol?.toUpperCase();
    switch (rolUpper) {
      case 'ADMIN':
        return 'danger';
      case 'USER':
        return 'primary';
      case 'MODERADOR':
        return 'warning';
      default:
        return 'medium';
    }
  }

  // Contar administradores
  getAdminCount(): number {
    return this.usuarios.filter(u => u.rol?.toUpperCase() === 'ADMIN').length;
  }

  // Formatear fecha
  formatDate(date: Date | null): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

}
