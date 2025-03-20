import { Component, OnInit } from '@angular/core';
import { ScreeningService } from '../services/screening.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-screened',
  templateUrl: './screened.page.html',
  styleUrls: ['./screened.page.scss']
})
export class ScreenedPage implements OnInit {
  formData: any[] = [];
  displayedRows: any[] = [];

  constructor(private screeningService: ScreeningService) {}

  ngOnInit() {
    const savedFormData = localStorage.getItem('formDataArray');
  
    if (savedFormData) {
      this.formData = JSON.parse(savedFormData);
      console.log('Loaded form data array from LocalStorage:', this.formData);
      this.populateDisplayedRows();
    } else {
      this.screeningService.getFormData().pipe(take(1)).subscribe(
        (formData: any) => {
          if (formData) {
            localStorage.setItem('formDataArray', JSON.stringify([formData]));
            this.formData = [formData];
            this.populateDisplayedRows();
          }
        },
        (error: any) => console.error('API Error:', error)
      );
    }
  } 
  

  populateDisplayedRows() {
    this.displayedRows = this.formData.map((formData: any) => ({
      dreamsId: this.getFieldValue('Enter Dreams ID', formData),
        dateOfEncounter: this.getFieldValue('Date of encounter', formData),
        provider: this.getFieldValue('Provider of encounter', formData),
        maritalStatus: this.getFieldValue('Marital Status', formData),
        eligibility: this.getFieldValue('Is eligible?', formData),
      allFields: formData?.formFields || []
    }));
  }

  getFieldValue(description: string, formData: any): string {
    const field = formData?.formFields?.find((field: any) => field.field.description === description);
    return field ? field.field.name : 'N/A';
  }  

  toggleRow(row: any) {
    row.isExpanded = !row.isExpanded;
  }
  deleteRow(rowIndex: number) {
    if (confirm('Are you sure you want to delete this row?')) {
      this.displayedRows.splice(rowIndex, 1);
      localStorage.setItem('formDataArray', JSON.stringify(this.displayedRows));
      console.log('Deleted row at index:', rowIndex);
    }
  }
  
  
}
