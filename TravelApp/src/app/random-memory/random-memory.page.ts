import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonBackButton, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-random-memory',
  templateUrl: './random-memory.page.html',
  styleUrls: ['./random-memory.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonBackButton, CommonModule, FormsModule]
})
export class RandomMemoryPage implements OnInit {

  entry: any;
  constructor(private router: Router,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.loadEntry();
  }

  async loadEntry() {
    const entry = localStorage.getItem('randomEntry');
    if (entry) {
      this.entry = JSON.parse(entry);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se encontró una entrada para ver',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/entries']);
    }
  }

}
