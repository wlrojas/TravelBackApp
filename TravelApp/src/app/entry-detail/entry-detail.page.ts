import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonThumbnail, AlertController } from '@ionic/angular/standalone';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.page.html',
  styleUrls: ['./entry-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonThumbnail, CommonModule, FormsModule, RouterModule]
})
export class EntryDetailPage implements OnInit {
  entry: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const entries = await this.databaseService.getEntries();
    this.entry = entries.find(e => e.id === Number(id));
  }

  async deleteEntry() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta entrada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.databaseService.deleteEntry(this.entry.id);
            this.router.navigate(['/entries']);
          },
        },
      ],
    });

    await alert.present();
  }

  editEntry() {
    this.router.navigate(['/add-edit-entry', this.entry.id]);
  }
}
