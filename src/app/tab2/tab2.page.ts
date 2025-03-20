import { Component, OnInit } from '@angular/core';
import { VisitService } from '../services/visit.service';  // Import VisitService

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  visits: any = [];  // Variable to hold visits data
  errorMessage: string = '';  // Variable to hold error message if the API call fails
  loading: boolean = false;  // Variable to manage loading state

  constructor(private visitService: VisitService) {}

  ngOnInit() {
    // Call the function to fetch visits when the component is initialized
    // this.getVisits();
  }

  // Method to fetch visits
  // getVisits() {
  //   this.loading = true;  // Set loading to true when API call starts
    
  //   const params = {
  //     v: 'custom:(patient:(uuid,identifiers:(identifier,uuid,identifierType:(name,uuid)),person:(age,display,gender,uuid,attributes:(value,attributeType:(uuid,display)))),visitType:(uuid,name,display),location:(uuid,name,display),startDatetime,stopDatetime)',
  //     includeInactive: 'false',
  //     totalCount: 'true',
  //     location: 'c149692f-fb6f-4f5c-822c-144e52ef50f8'
  //   };

  //   // Call the visit service to fetch data
  //   this.visitService.getVisits(params).subscribe(
  //     (response) => {
  //       console.log('Visits:', response);
  //       // Assuming response contains a 'results' property, set visits to that array
  //       this.visits = response.results || [];  // Store the response in the visits array
  //       this.loading = false;  // Set loading to false after the data is received
  //     },
  //     (error) => {
  //       console.error('Error fetching visits:', error);
  //       this.errorMessage = 'Error fetching visit data';  // Display an error message if the API call fails
  //       this.loading = false;  // Set loading to false even if there is an error
  //     }
  //   );
  // }
}
