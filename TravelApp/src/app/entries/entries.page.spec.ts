import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntriesPage } from './entries.page';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('EntriesPage', () => {
  let component: EntriesPage;
  let fixture: ComponentFixture<EntriesPage>;
  let databaseService: jasmine.SpyObj<DatabaseService>;
  let router: Router;
  let alertController: AlertController;

  beforeEach(async () => {
    const databaseServiceSpy = jasmine.createSpyObj('DatabaseService', ['getEntries']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule
      ],
      providers: [
        { provide: DatabaseService, useValue: databaseServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        Router,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EntriesPage);
    component = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
    router = TestBed.inject(Router);
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debe hacer la carga de ng', async () => {
    const mockEntries = [{ id: 1, title: 'Test Entry' }];
    databaseService.getEntries.and.returnValue(Promise.resolve(mockEntries));

    await component.ngOnInit();

    expect(component.entries).toEqual(mockEntries);
  });

  it('should navigate to entry detail page on goToDetail', () => {
    spyOn(router, 'navigate');
    const id = 1;

    component.goToDetail(id);

    expect(router.navigate).toHaveBeenCalledWith(['/entry-detail', id]);
  });

  it('debe navegar al agregar o editar recuerdos', () => {
    spyOn(router, 'navigate');

    component.goToAddEntry();

    expect(router.navigate).toHaveBeenCalledWith(['/add-edit-entry']);
  });

  it('debe retonar una entrada mock cuando es random', async () => {
    const mockEntries = [{ id: 1, title: 'Test Entry' }];
    component.entries = mockEntries;
    spyOn(router, 'navigate');

    await component.showRandomMemory();

    expect(localStorage.getItem('randomEntry')).toEqual(JSON.stringify(mockEntries[0]));
    expect(router.navigate).toHaveBeenCalledWith(['/random-memory']);
  });
});
