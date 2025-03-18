import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // ✅ Change 'any' to 'root'
})
export class CsvFileService {
  private apiUrl = 'http://localhost:8080/api/csv/generate';

  constructor(private http: HttpClient) {}

  generateCsv(selectedHeaders: string[]): Observable<Blob> {
    if (selectedHeaders.length === 0) {
      throw new Error('No headers selected for CSV generation.');
    }

    const params = new HttpParams().set('headers', selectedHeaders.join(','));

    return this.http.get(this.apiUrl, { params, responseType: 'blob' });
  }
}
