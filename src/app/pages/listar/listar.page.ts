import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  logoIonic, 
  eyeSharp, 
  trashSharp,
  cubeOutline,
  addCircleOutline,
  printOutline,
  timeOutline,
  pricetagOutline,
  documentTextOutline,
  calendarOutline,
  cube,
  ellipse
} from 'ionicons/icons';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
  IonButtons,
  IonInput,
  IonItem, IonList, IonLabel, IonIcon,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
} from '@ionic/angular/standalone';

export interface Item {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  ]
})
export class ListarPage implements OnInit {

  items: Item[] = [
    { id: 1, name: 'Pedido 1', description: 'Imprimir macetero' },
    { id: 2, name: 'Pedido 2', description: 'Imprimir figura de gengar' },
    { id: 3, name: 'Pedido 3', description: 'Imprimir taza' },
  ];
  

  constructor() { 
    addIcons({
      'logo-ionic': logoIonic,
      'eye-sharp': eyeSharp,
      'trash-sharp': trashSharp,
      'cube-outline': cubeOutline,
      'add-circle-outline': addCircleOutline,
      'print-outline': printOutline,
      'time-outline': timeOutline,
      'pricetag-outline': pricetagOutline,
      'document-text-outline': documentTextOutline,
      'calendar-outline': calendarOutline,
      'cube': cube,
      'ellipse': ellipse
    });
  }
  
  ngOnInit() {
    this.items.push({ id: 4, name: 'Item 4', description: 'Descripción del Item 4' });

    
  }

}
