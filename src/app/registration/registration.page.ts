import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncounterService } from '../services/encounter.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular'; 



@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registrationForm!: FormGroup;

  questions = [
    {
      label: 'First Name',
      concept: '166102AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: true
    },
    {
      label: 'Middle Name(Optional)',
      concept: '166574AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: false
    },
    {
      label: 'Family Name',
      concept: '166103AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: true
    },
    {
      label: 'Sex',
      concept: '6b5ee9a1-4d71-45f6-bb74-6c489bda25df',
      type: 'radio',
      required: true,
      options: [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
      ]
    },
    {
      label: 'Date of Birth',
      concept: '166575AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'date',
      required: true
    },
    {
      label: 'Birth Certicate Number(Optional)',
      concept: '162052AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'number'
      ,required: false
    },
    {
      label: 'National ID (Optional)',
      concept: '5f7739ad-7fbd-4f56-80f5-61ead209ec53',
      type: 'number',
      required: false
    },

    {
      label: 'County of Residence',
      concept: '167131AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'dropdown',
      required: true,
      options: [
        { value: '589b6de3-b25a-4d42-a7a1-7e31afb1397c', label: 'Homabay' },
        { value: '6ff6baeb-d660-474e-a77e-4f11adf7bf02', label: 'Kiambu' },
        { value: '1fefe819-aa34-4991-9eab-9b9c4965b19c', label: 'Kisumu' },
        { value: '4ca55dd2-0651-4bdb-ab5b-7a2bcf5636dd', label: 'Migori' },
        { value: '12e67c21-f7c3-4f58-bfe8-784e1d2b57ae', label: 'Mombasa' },
        { value: 'd79cdabe-e95a-41ec-9b33-f0fe402b6a39', label: 'Nairobi' },
        { value: '0a59176a-3aa7-4d8a-8e49-63f50a04ff99', label: 'Siaya' },
      ]
    },
    {
      label: 'Sub County of Residence',
      concept: '167131AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: true
    },
    {
      label: 'Ward of Residence',
      concept: '64fb6ce0-fac6-48e3-8e8e-0110b2a8724f',
      type: 'text',
      required: true
    },
    {
      label: 'Telephone',
      concept: '1650AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: true
    },
    {
      label: 'Location',
      concept: '1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: true
    },
    {
      label: 'Sub Location',
      concept: '1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: true
    },
    {
      label: 'Village',
      concept: '1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: true
    },
    {
      label: 'Landmark',
      concept: '7f718fc4-62ac-4408-bab3-288d0b56369e',
      type: 'text',
      required: true
    },
    {
      label: 'Nearest Health Center',
      concept: '162998AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text',
      required: true
    },
    {
      label: 'Marital Status',
      concept: 'b71619d4-6f61-41f7-a04e-aa0bb6db09be',
      type: 'dropdown',
      required: true,
      options: [
        { value: '1057AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Never Married' },
        { value: '5555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Married' },
        { value: '1058AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Divorced' },
        { value: '1059AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Widowed' }
      ]
    },
    {
      label: "Occupation",
      concept: "49d6d2d8-9663-4613-9a18-c31f154480df",
      type: "dropdown",
      required: true,
      options: [
        { value: '1538AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Farmer' },
        { value: '144595AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Employee' },
        { value: '159465AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Student' },
        { value: '1539AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Trader' },
        { value: '159466AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Driver' },
        { value: 'a6782e04-cbe9-4b3a-8f6a-68004f4ea0ff', label: 'None' },
        { value: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Other' }
      ]
    },
    {
      label: "Education",
      concept: "19417682-da67-442c-a18c-4ed2e2653e1d",
      type: "dropdown",
      required: true,
      options: [
        { value: '1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Primary School Education' },
        { value: '1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Secondary School Education' },
        { value: '159785AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'College/University/Polytechnic' },
        { value: 'a6782e04-cbe9-4b3a-8f6a-68004f4ea0ff', label: 'None' }
      ]
    },
  ];

  minYear: string;
  maxYear: string;

  constructor(
    private fb: FormBuilder,
    private encounterService: EncounterService,
    private alertController: AlertController,
    private navCtrl: NavController


  ) {
    const currentYear = new Date().getFullYear();
    this.minYear = `${currentYear - 100}-01-01`;
    this.maxYear = `${currentYear}-12-31`;
  }
  ngOnInit() {
    this.registrationForm = this.fb.group({});

    this.questions.forEach(question => {
      if (question.required) {
        // For required fields, apply Validators.required
        this.registrationForm.addControl(
          question.label,
          this.fb.control('', Validators.required)
        );
      } else {
        // For optional fields, no validators
        this.registrationForm.addControl(
          question.label,
          this.fb.control('')
        );
      }
    });
  }


  onSubmit() {
    if (this.registrationForm.valid) {
      const requestBody = {};
  
      this.encounterService.getIdentifier(requestBody).subscribe(response => {
        const generatedIdentifier = response.identifier;
  
        if (generatedIdentifier) {
          const formData = this.registrationForm.value;
  
          const requestData = {
            identifiers: [
              {
                identifier: generatedIdentifier,
                identifierType: "dfacd928-0370-4315-99d7-6ec1c9f7ae76",  
                location: "4e6d8b82-924f-400e-8659-f97389917a85",  
                preferred: true
              }
            ],
            person: {
              gender: formData['Sex'],  
              birthdate: formData['Date of Birth'],  
              birthdateEstimated: false,  
              names: [
                {
                  givenName: formData['First Name'],
                  familyName: formData['Family Name'],
                  preferred: true
                }
              ],
              addresses: [
                {
                  address2: formData['Landmark'],       
                  address4: formData['Ward of Residence'],           
                  address5: formData['Sub Location'],    
                  address6: formData['Location'],       
                  cityVillage: formData['Village'],    
                  countyDistrict: formData['County of Residence'],   
                  stateProvince: formData['Sub County of Residence']
                }
              ]
            }
          };
  
          console.log('Formatted Submission Data:', requestData);
  
          this.encounterService.submitPatient(requestData).subscribe(
            async (res) => {
              console.log('Submission successful:', res);
          
              const patientUuid = res.uuid;  // Patient UUID from response
              const patientName = res.display;  // Use display value from the response (e.g., "MJLMVU - Vancy Otiso")
          
              // Show alert on successful submission
              const alert = await this.alertController.create({
                header: 'Success',
                message: 'Patient registered successfully!',
                buttons: [
                  {
                    text: 'Would you like to proceed to screening?',
                    handler: () => {
                      // Split the patient name by ' - ' to get the ID part and the full name
                      const parts = patientName.split(' - ');  // Split by ' - '
                      const idPart = parts[0];  // ID part (e.g., MJLMVU)
                      const cleanName = parts[1];  // Full name (e.g., levin Munyelele)
          
                      console.log('Navigating to Screening with:', patientUuid, idPart, cleanName);
                      this.navCtrl.navigateForward(`/visit/${patientUuid}/${idPart}/${cleanName}`);
                    }
                  },
                  {
                    text: 'Go to Home',
                    handler: () => {
                      // Navigate to the home page
                      this.navCtrl.navigateBack('/home');
                    }
                  }
                ]
              });
          
              await alert.present();
            },
            (err) => {
              console.error('Error submitting patient:', err);
            }
          );
          
        } else {
          console.error("No identifier received.");
        }
      }, error => {
        console.error("Error fetching identifier:", error);
      });
    } else {
      console.log('Form is invalid. Please fill all required fields.');
    }
  }
}  