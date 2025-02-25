import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LocationService } from '../services/location.service';
import { forkJoin } from 'rxjs';
import { VisitService } from '../services/visit.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {
  @Input() patientUuid!: string;
  @Input() patientName!: string;

  visitForm!: FormGroup;
  questions: any[] = [];
  visitType: any;
  location: any;
  attributes: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private locationService: LocationService,
    private visitService: VisitService,
    private alertController: AlertController,
    private router: Router, 

  ) { }

  ngOnInit() {
    this.initializeForm();
    this.fetchDropdownData();
    this.attributes = [
      { attributeType: '3b9dfac8-9e4d-11ee-8c90-0242ac120002', value: 'false' },
      { attributeType: 'e6cb0c3b-04b0-4117-9bc6-ce24adbda802', value: '63eff7a4-6f82-43c4-a333-dbcc58fe9f74' }
    ];

    // Listen for location selection changes
    this.visitForm.get('visitLocation')?.valueChanges.subscribe((value) => {
      this.location = value; // Store the selected UUID
    });

    // Listen for visit type selection changes
    this.visitForm.get('visitationType')?.valueChanges.subscribe((value) => {
      this.visitType = value; // Store the selected UUID
    });
  }
  initializeForm() {
    const now = new Date();
    const visitDate = now.toISOString().split('T')[0]; // Format YYYY-MM-DD
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    const visitTime = `${hours.toString().padStart(2, '0')}:${minutes}`; // HH:MM

    this.visitForm = this.fb.group({
      visitDate: new FormControl(visitDate, Validators.required),
      visitTime: new FormControl(visitTime, Validators.required),
      meridian: new FormControl(meridian, Validators.required),
      visitLocation: new FormControl('', Validators.required),  // Ensure value is set properly
      visitationType: new FormControl('', Validators.required)
    });

  }

  fetchDropdownData() {
    forkJoin({
      visitLocations: this.locationService.getLocations(),
      visitationTypes: this.locationService.getVisitationTypes(),
    }).subscribe(
      ({ visitLocations, visitationTypes }) => {
        console.log("Raw visitLocations response:", visitLocations);
        console.log("Raw visitationTypes response:", visitationTypes);

        // Ensure visitLocations is valid and contains results
        const visitLocationOptions = Array.isArray(visitLocations.results)
          ? visitLocations.results.map((location: { display: any; uuid: any; }) => ({
            label: location.display,
            value: location.uuid,
          }))
          : [];

        // Ensure visitationTypes is valid and contains results
        const visitationTypeOptions = Array.isArray(visitationTypes.results)
          ? visitationTypes.results.map((type: { display: any; uuid: any; }) => ({
            label: type.display,
            value: type.uuid,
          }))
          : [];

        this.questions = [
          {
            label: "Visit Location",
            key: "visitLocation",
            type: "dropdown",
            options: visitLocationOptions,
          },
          {
            label: "Queue Location",
            key: "queueLocation",
            type: "dropdown",
            options: [
              { label: "10 Engineer VCT", value: "10 Engineer VCT" },
              { label: "CCC", value: "CCC" },
              { label: "HTS", value: "HTS" },
              { label: "Laboratory", value: "Laboratory" },
              { label: "Pharmacy", value: "Pharmacy" },
              { label: "MCH", value: "MCH" },
            ],
          },
          {
            label: "Visitation Type",
            key: "visitationType",
            type: "dropdown",
            options: visitationTypeOptions,
          },
          {
            label: "Billing",
            key: "billing",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ],
          },
        ];
        this.initForm();
      },
      (error) => {
        console.error("Error fetching dropdown data", error);
      }
    );
  }


  initForm() {
    this.visitForm = this.fb.group({}); // Initialize the form group

    this.questions.forEach((question) => {
      this.visitForm.addControl(question.key, new FormControl('', Validators.required));
    });

    // Listen for location selection changes
    this.visitForm.get('visitLocation')?.valueChanges.subscribe((value) => {
      if (value) {
        this.location = value;
      }
    });

    // Listen for visit type selection changes
    this.visitForm.get('visitationType')?.valueChanges.subscribe((value) => {
      if (value) {
        this.visitType = value;
      }
    });
  }



  closeModal() {
    this.modalCtrl.dismiss();
  }

  submitVisit() {
    console.log('Submitting visit with:', {
      patient: this.patientUuid,
      startDatetime: new Date().toISOString().split('.')[0] + ".000Z",
      visitType: this.visitType,
      location: this.location,
      attributes: []
    });
  
    if (!this.patientUuid || !this.visitType || !this.location) {
      console.error('Missing required fields!', {
        patient: this.patientUuid,
        visitType: this.visitType,
        location: this.location
      });
      return;
    }
  
    const visitPayload = {
      patient: this.patientUuid,
      startDatetime: new Date().toISOString().split('.')[0] + ".000Z",
      visitType: this.visitType,
      location: this.location,
      attributes: []
    };
  
    this.visitService.postVisitQueueEntry(visitPayload).subscribe({
      next: async (response) => {
        console.log('Visit successfully submitted:', response);
    
        // Extract patient UUID and correct ID part
        const patientUuid = response.patient?.uuid;
        const idPart = response.patient?.display.split(' - ')[0].trim(); // Extracts "MJLMJL"
        let patientName = response.patient?.display.split(' - ')[1]?.trim(); // Extracts "Levin Munyelele"
    
        if (!patientUuid || !idPart || !patientName) {
          console.error('Missing required data:', response);
          return; 
        }
    
        // Encode patient name for URL safety
        const cleanName = encodeURIComponent(patientName);
    
        console.log(`Navigating to Screening with: ${patientUuid} ${idPart} ${cleanName}`);
    
        // Show success alert with navigation option
        const alert = await this.alertController.create({
          header: 'Check-in Successful',
          message: 'The patient has been successfully checked in. Would you like to proceed to screening?',
          buttons: [
            {
              text: 'Go to Screening',
              handler: async () => {
                console.log(`Navigating to: /vulnerability-screening/${patientUuid}/${idPart}/${cleanName}`);
                
                await this.modalCtrl.dismiss();
                
                this.router.navigate([`/vulnerability-screening`, patientUuid, idPart, cleanName]);
              }
            }
          ]
        });
        
        await alert.present();
        
    
        await alert.present();
      },
      error: (error) => {
        console.error('Error submitting visit:', error);
      }
    });
    
  }
  
}




