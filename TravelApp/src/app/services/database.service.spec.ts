import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

describe('DatabaseService', () => {
    let service: DatabaseService;
    let sqliteSpy: jasmine.SpyObj<SQLiteConnection>;
    let dbSpy: jasmine.SpyObj<SQLiteDBConnection>;

  beforeEach(async () => {
    const sqliteSpyObj = jasmine.createSpyObj('SQLiteConnection', ['createConnection']);
    const dbSpyObj = jasmine.createSpyObj('SQLiteDBConnection', ['open', 'execute', 'run', 'query', 'close', 'isDBOpen', 'delete']);

    await TestBed.configureTestingModule({
        providers: [
          DatabaseService,
          { provide: SQLiteConnection, useValue: sqliteSpyObj },
          { provide: SQLiteDBConnection, useValue: dbSpyObj }
        ]
      }).compileComponents();
      
    service = TestBed.inject(DatabaseService);
    sqliteSpy = TestBed.inject(SQLiteConnection) as jasmine.SpyObj<SQLiteConnection>;
    dbSpy = TestBed.inject(SQLiteDBConnection) as jasmine.SpyObj<SQLiteDBConnection>;
    sqliteSpy.createConnection.and.returnValue(Promise.resolve(dbSpy));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe agregar un recuerdo', async () => {
    const entry = { title: 'Test Title', content: 'Test Content', date: '2024-07-08', location: 'Test Location', photo: 'test-photo.png' };
    dbSpy.run.and.returnValue(Promise.resolve({ changes: { changes: 1 } }));
    
    spyOn(service, 'initializeDatabase').and.returnValue(Promise.resolve());
    service['db'] = dbSpy;

    await service.addEntry(entry);

    expect(dbSpy.run).toHaveBeenCalledWith(
      'INSERT INTO entries (title, content, date, location, photo) VALUES (?, ?, ?, ?, ?)',
      [entry.title, entry.content, entry.date, entry.location, entry.photo]
    );
  });

  it('debe obtener las entradas', async () => {
    const entries = [{ id: 1, title: 'Test Title', content: 'Test Content', date: '2024-07-08', location: 'Test Location', photo: 'test-photo.png' }];
    dbSpy.query.and.returnValue(Promise.resolve({ values: entries }));

    spyOn(service, 'initializeDatabase').and.returnValue(Promise.resolve());
    service['db'] = dbSpy;

    const result = await service.getEntries();

    expect(result).toEqual(entries);
  });

  it('debe eliminar una entrada', async () => {
    dbSpy.run.and.returnValue(Promise.resolve({ changes: { changes: 1 } }));

    spyOn(service, 'initializeDatabase').and.returnValue(Promise.resolve());
    service['db'] = dbSpy;

    await service.deleteEntry(1);

    expect(dbSpy.run).toHaveBeenCalledWith('DELETE FROM entries WHERE id = ?', [1]);
  });

  it('debe actualizar una entrada', async () => {
    const entry = { id: 1, title: 'Updated Title', content: 'Updated Content', date: '2024-07-09', location: 'Updated Location', photo: 'updated-photo.png' };
    dbSpy.run.and.returnValue(Promise.resolve({ changes: { changes: 1 } }));

    spyOn(service, 'initializeDatabase').and.returnValue(Promise.resolve());
    service['db'] = dbSpy;

    await service.updateEntry(entry);

    expect(dbSpy.run).toHaveBeenCalledWith(
      'UPDATE entries SET title = ?, content = ?, date = ?, location = ?, photo = ? WHERE id = ?',
      [entry.title, entry.content, entry.date, entry.location, entry.photo, entry.id]
    );
  });
});
