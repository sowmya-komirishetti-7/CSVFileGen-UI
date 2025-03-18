import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CsvGeneratorComponent } from './csv-generator/csv-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CsvGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'csv-file-creation';
}
