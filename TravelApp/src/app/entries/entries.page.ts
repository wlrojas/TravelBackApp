import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonItem, IonLabel, IonThumbnail, IonButtons, IonBackButton, AlertController } from '@ionic/angular/standalone';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, 
    IonList, IonButton, IonItem, IonLabel, IonThumbnail, IonButtons, IonBackButton, CommonModule, FormsModule]
})
export class EntriesPage implements OnInit {
  entries: any[] = [];

  constructor(private databaseService: DatabaseService,
    private router: Router,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    await this.loadEntries();
  }

  async loadEntries() {
    this.entries = await this.databaseService.getEntries();
  }

  ionViewWillEnter() {
    this.loadEntries();
  }

  goToDetail(id: number) {
    this.router.navigate(['/entry-detail', id]);
  }

  goToAddEntry() {
    this.router.navigate(['/add-edit-entry']);
  }

  async showRandomMemory() {
    if (this.entries.length > 0) {
      const randomEntry = this.entries[Math.floor(Math.random() * this.entries.length)];
      localStorage.setItem('randomEntry', JSON.stringify(randomEntry));
      this.router.navigate(['/random-memory']);
    } else {
      const alert = await this.alertController.create({
        header: 'Recuerdo Aleatorio',
        message: 'No hay entradas disponibles. Por favor, añade algunas entradas primero.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
