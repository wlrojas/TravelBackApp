import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonBackButton, IonButtons, IonThumbnail, IonIcon, AlertController } from '@ionic/angular/standalone';
import { GeolocationService } from '../services/geolocation.service';
import { DatabaseService } from '../services/database.service';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-add-edit-entry',
  templateUrl: './add-edit-entry.page.html',
  styleUrls: ['./add-edit-entry.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonBackButton, IonButtons, IonThumbnail, IonIcon, CommonModule, FormsModule, RouterModule]
})
export class AddEditEntryPage implements OnInit {

  entry: any = {
    title: '',
    content: '',
    date: new Date().toISOString(),
    location: '',
    photo: ''
  };
  isEdit = false;

  constructor(
    private databaseService: DatabaseService,
    private cameraService: CameraService,
    private geolocationService: GeolocationService,
    private routes: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      const entries = await this.databaseService.getEntries();
      this.entry = entries.find(e => e.id === Number(id));
    }
  }

  async takePicture() {
    this.entry.photo = await this.cameraService.takePicture();
  }

  async getCurrentLocation() {
    const position = await this.geolocationService.getCurrentPosition();
    this.entry.location = `${position.latitude}, ${position.longitude}`;
  }

  async saveEntry() {
    if (!this.entry.title || !this.entry.content || !this.entry.photo) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El título, el contenido y la foto son obligatorios.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.isEdit) {
      await this.databaseService.updateEntry(this.entry);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Entrada actualizada correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      await this.databaseService.addEntry(this.entry);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Entrada guardada correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
    await this.routes.navigate(['/entries']);
  }

}
