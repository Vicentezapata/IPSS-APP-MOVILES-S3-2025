import { Component } from '@angular/core';
import {IonContent, IonIcon, IonCard, IonCardContent, IonItem, IonInput, IonCheckbox, IonButton, IonChip, IonLabel,IonText} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {cubeOutline,mailOutline,lockClosedOutline,logInOutline,logoGoogle,logoApple,shieldCheckmarkOutline} from 'ionicons/icons';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {FirebaseTareasService, Usuario} from 'src/app/services/firebase-usuario.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    IonIcon,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonCheckbox,
    IonButton,
    IonChip,
    IonLabel,
    FormsModule,
    CommonModule,
    IonText
  ],
})
export class HomePage {
  email = '';
  password = '';
  errorMessage = '';
  success = false;


  constructor(private router: Router, private firebaseService: FirebaseTareasService) {
    // Registrar los iconos necesarios
    addIcons({
      'cube-outline': cubeOutline,
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'log-in-outline': logInOutline,
      'logo-google': logoGoogle,
      'logo-apple': logoApple,
      'shield-checkmark-outline': shieldCheckmarkOutline
    });
  }

  irRegister() {
    console.log('Navegando a la página de registro...');
    this.router.navigate(['/register']);
  }
  irCamara() {
    console.log('Navegando a la página de la cámara...');
    this.router.navigate(['/testcamara']);
  }
  async login() {
    // Lógica de inicio de sesión
    console.log('Iniciando sesión...');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    const passwordHasheada = await this.hashSHA256(this.password);
    console.log('Password Hasheada:', passwordHasheada);
    this.firebaseService.obtenerUsuarioPorEmailYPassword(this.email, passwordHasheada).subscribe(usuario => {
      if (usuario) {
        this.router.navigate(['/listar']);
      } else {
        console.log('Credenciales incorrectas');
        this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      }
    });
  }
  // Hashear texto usando Web Crypto API (SHA-256)
  private async hashSHA256(texto: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
}
