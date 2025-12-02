import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {FirebaseTareasService, Usuario} from 'src/app/services/firebase-usuario.service';
import { 
  IonContent, 
  IonIcon, 
  IonCard, 
  IonText,
  IonCardContent, 
  IonItem, 
  IonInput, 
  IonCheckbox, 
  IonButton, 
  IonChip, 
  IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  cubeOutline, 
  personOutline, 
  mailOutline, 
  callOutline,
  lockClosedOutline, 
  lockOpenOutline,
  personAddOutline, 
  logoGoogle, 
  logoApple, 
  shieldCheckmarkOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonText,
    IonIcon,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonCheckbox,
    IonButton,
    IonChip,
    IonLabel,
    CommonModule,
    FormsModule
  ]
})
export class RegisterPage implements OnInit {
  nombre = '';
  email = '';
  telefono = '';
  password = '';
  confirmarPassword = '';
  aceptarTerminos = false;
  errorMessage = '';
  success = false;
  contErrores = 0;

  constructor(private router: Router, private firebaseService: FirebaseTareasService) {
    // Registrar los iconos necesarios
    addIcons({
      'cube-outline': cubeOutline,
      'person-outline': personOutline,
      'mail-outline': mailOutline,
      'call-outline': callOutline,
      'lock-closed-outline': lockClosedOutline,
      'lock-open-outline': lockOpenOutline,
      'person-add-outline': personAddOutline,
      'logo-google': logoGoogle,
      'logo-apple': logoApple,
      'shield-checkmark-outline': shieldCheckmarkOutline
    });
  }

  ngOnInit() {
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

  validarRegistro() {
    // Lógica de validación de registro
    console.log('Validando registro...');
    console.log('Nombre:', this.nombre);
    console.log('Email:', this.email);
    console.log('Teléfono:', this.telefono);
    console.log('Contraseña:', this.password);
    console.log('Confirmar Contraseña:', this.confirmarPassword);
    console.log('Aceptar Términos:', this.aceptarTerminos);
    this.errorMessage = '';
    this.contErrores = 0;
    if(this.password !== this.confirmarPassword) {
      this.errorMessage += 'Las contraseñas no coinciden.\n';
      this.contErrores += 1;
    }
    if(!this.aceptarTerminos) {
      this.errorMessage += 'Debe aceptar los términos y condiciones.\n';
      this.contErrores += 1;
    }
    if(this.telefono.length < 10) {
      this.errorMessage += 'El número de teléfono es inválido.\n';
      this.contErrores += 1;
    }
    if(this.telefono === '') {
      this.errorMessage += 'El teléfono es obligatorio.\n';
      this.contErrores += 1;
    }
    if(this.email === '') {
      this.errorMessage += 'El email es obligatorio.\n';
      this.contErrores += 1;
    }
    if(this.nombre === '') {
      this.errorMessage += 'El nombre es obligatorio.\n';
      this.contErrores += 1;
    }
    console.log(this.errorMessage);
    console.log('Número de errores:', this.contErrores);
    return this.contErrores === 0;
  }

  async registrarEnFirebase() {
    // Lógica para registrar el usuario en Firebase
    console.log('Registrando en Firebase...');
    if(this.validarRegistro()) {
      // Hashear la contraseña antes de guardar
      const passwordHasheada = await this.hashSHA256(this.password);
      const nuevoUsuario: Usuario = {
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        password: passwordHasheada
      };
      try {
        await this.firebaseService.agregarUsuario(nuevoUsuario);
        this.success = true;
        this.errorMessage = '';
        this.router.navigate(['/home']);
      } catch (error) {
        this.errorMessage = 'Error al registrar el usuario en Firebase.';
        this.success = false;
      }
    }
  }

}
