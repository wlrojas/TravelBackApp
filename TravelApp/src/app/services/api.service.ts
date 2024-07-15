import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getEntries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/entries`);
  }

  addEntry(entry: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/entries`, entry);
  }
}
