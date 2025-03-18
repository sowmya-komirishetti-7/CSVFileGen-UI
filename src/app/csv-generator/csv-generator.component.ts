import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CsvFileService } from '../csv-file.service';
import { HttpParams } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({

  selector: 'app-csv-generator',
  standalone: true, 
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule,   ],
  templateUrl: './csv-generator.component.html',
  styleUrl: './csv-generator.component.css'
})
export class CsvGeneratorComponent {

  headers = ['Full_Name', 'FirstName', 'LastName', 'Email', 'Birthday', 'Phone', 'Address', 'Company', 'Job', 'Movie', 'Female FirstName', 'Male FirstName', 'Middle Name', 'Gender', 'Marketing', 'Street Name', 'Company Industry',
   'Between Date', 'Animal', 'Color', 'Coffee', 'Book', 'Author', 'Camera', 'Computer', 'Beer', 'Chess', 'Dog', 'Horse', 'Car', 'Cat', 'Blood Type', 'Disease', 'Dessert', 'Domain', 'Finance', 'Food', 'Driving License', 'Football Coaches',
  'Football Players', 'House Furniture', 'Passport', 'Weather', 'Hobbit', 'Image', 'SIze', 'Cricket', 'University', 'Vehicle', 'Vehicle Color', 'Vehicle Doors', 'Vehicle Engine', 'Language Code', 'Location', 'Music', 'Planet'];
  selectedHeaders: string[] = [];
  tableData: string[][] = [];
  dataLoad = false;

  constructor(private csvService: CsvFileService) {}

  onCheckboxChange(event: any, header: string) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedHeaders.push(header);
    } else {
      this.selectedHeaders = this.selectedHeaders.filter(h => h !== value);
    }
  }

  generateCsv() {
    if (this.selectedHeaders.length === 0) {
      alert('Please select at least one header');
      return;
    }

    this.csvService.generateCsv(this.selectedHeaders).subscribe(response => {
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
       a.download = 'generated_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Error generating CSV:', error);
      alert('Failed to generate CSV. Please try again.');
    });




  
}

loadData() {

  if (this.selectedHeaders.length === 0) {
    alert('Please select at least one header before loading data.');
    return;
  }

  this.csvService.generateCsv(this.selectedHeaders).subscribe(response => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvText = e.target.result as string;
      this.tableData = this.parseCsv(csvText);
      this.dataLoad = true;
    };

    reader.readAsText(response);
  }, error => {
    console.error('Error loading data:', error);
    alert('Failed to load data. Please try again.')
  })
}

parseCsv(csvText: string): string[][] {
  return csvText
    .split('\n')                           // Split into rows
    .map(row => row.split(',')             // Split by ","
      .map(cell => cell.trim())            // Trim whitespace
    ).filter(row => row.length > 0);       // Filter out empty rows
}


}
