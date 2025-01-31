import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreeningService } from '../services/screening.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-screening',
  templateUrl: './screening.page.html',
  styleUrls: ['./screening.page.scss']
})
export class ScreeningPage implements OnInit {

  screeningForm: FormGroup;
  showIDField = false;
  showDisabilityType = false;
  showSexualQuestions = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder,
    private screeningService: ScreeningService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.screeningForm = this.fb.group({
      date: ['', Validators.required],
      provider: ['', Validators.required],
      location: ['', Validators.required],
      enrolled: [''],
      id: [''],
      status: [''],
      live: [''],
      disability: [''],
      type: [''],
      first: [''],
      middle: [''],
      surname: [''],
      occupation: [''],
      school: [''],
      sex: [''],
      months: [''],
      gifts: [''],
      sti: [''],
      pregnant: [''],
      violence: [''],
      head: [''],
      addiction: [''],
      orphan: [''],
      comment: [''],
      eligible: ['', Validators.required],
    });

    this.screeningForm.get('enrolled')?.valueChanges.subscribe(value => {
      if (value !== 'yes') {
        this.screeningForm.get('id')?.setValue('');
      }
    });

    this.screeningForm.get('disability')?.valueChanges.subscribe(value => {
      if (value !== 'yes') {
        this.screeningForm.get('disabilityType')?.setValue('');  // Clear disability type if not disabled
      }
    });

    this.screeningForm.get('sex')?.valueChanges.subscribe(value => {
      if (value !== 'yes') {
        this.screeningForm.get('months')?.setValue('');
        this.screeningForm.get('gifts')?.setValue('');
      }
    });
  }


  ngOnInit() { }

  async submitForm() {
    if (this.screeningForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;  
      console.log('Form Values:', this.screeningForm.value);

      const formData = {
        name: "DREAMS Vulnerability Screening",
        description: "DREAMS Vulnerability Screening",
        version: "1.0",
        published: true,
        formFields: [
          {
            field: {
              name: this.screeningForm.value.date,
              description: 'Date of encounter',
              fieldType: 'EncounterDatetime',
              concept: null
            },
            required: true,
            sortWeight: parseFloat('1.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.provider,
              description: 'Provider of encounter',
              fieldType: 'EncounterProvider',
              concept: null
            },
            required: true,
            sortWeight: parseFloat('2.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.location,
              description: 'Encounter location',
              fieldType: 'EncounterLocation',
              concept: null
            },
            required: true,
            sortWeight: parseFloat('3.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.enrolled,
              description: "Ever Enrolled in Dreams",
              fieldType: "Concept",
              concept: "308dda4f-9b37-4ffa-9905-2ede5001193e"
            },
            required: false,
            sortWeight: parseFloat('4.0').toFixed(1)
          },
          ...(this.screeningForm.value.enrolled === 'yes' ? [{
            field: {
              name: this.screeningForm.value.id,
              description: "Enter Dreams ID",
              fieldType: "Concept",
              concept: "f4d8d84a-bef7-45ed-92ff-c38a90dc38d5"
            },
            required: false,
            sortWeight: parseFloat('5.0').toFixed(1)
          }] : []),
          {
            field: {
              name: this.screeningForm.value.status,
              description: "Marital Status",
              fieldType: "Concept",
              concept: "b71619d4-6f61-41f7-a04e-aa0bb6db09be"
            },
            required: false,
            sortWeight: parseFloat('6.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.live,
              description: "Who do you frequently live with?",
              fieldType: "Concept",
              concept: "c3224907-5015-492f-8081-449900c10b50"
            },
            required: false,
            sortWeight: parseFloat('7.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.disability,
              description: "Do you have any form of disability?",
              fieldType: "Concept",
              concept: "ca887741-b02a-45a2-bb07-ac65bd182173"
            },
            required: false,
            sortWeight: parseFloat('8.0').toFixed(1)
          },
          ...(this.screeningForm.value.disability === 'yes' ? [{
            field: {
              name: this.screeningForm.value.type,
              description: "State disability type?",
              fieldType: "Concept",
              concept: "9ff25d8a-f30b-405d-90ec-5025667a3255"
            },
            required: false,
            sortWeight: parseFloat('9.0').toFixed(1)
          }] : []),
          {
            field: {
              name: this.screeningForm.value.first,
              description: "Caregiver First Name",
              fieldType: "Concept",
              concept: "dfc0b5b2-dd11-40cd-b1ca-6ea36dc65269"
            },
            required: false,
            sortWeight: parseFloat('10.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.middle,
              description: "Caregiver Middle Name",
              fieldType: "Concept",
              concept: "9e799991-e935-4bc7-b310-26dd5fe5ed32"
            },
            required: false,
            sortWeight: parseFloat('11.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.surname,
              description: "Caregiver SurName",
              fieldType: "Concept",
              concept: "c147a304-d81c-487a-93c1-bdaff261beb6"
            },
            required: false,
            sortWeight: parseFloat('12.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.occupation,
              description: "Caregiver Occupation",
              fieldType: "Concept",
              concept: "49d6d2d8-9663-4613-9a18-c31f154480df"
            },
            required: false,
            sortWeight: parseFloat('13.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.school,
              description: "Out of School",
              fieldType: "Concept",
              concept: "2eaad8ca-decf-4731-97fe-16d23b548e09"
            },
            required: false,
            sortWeight: parseFloat('14.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.sex,
              description: "Ever Had Sex",
              fieldType: "Concept",
              concept: "9231c367-cb08-4634-8fbd-98f6cfc322d6"
            },
            required: false,
            sortWeight: parseFloat('15.0').toFixed(1)
          },
          ...(this.screeningForm.value.sex === 'yes' ? [
            {
              field: {
                name: this.screeningForm.value.months,
                description: "Has had more than one sexual partner in the last 12 months?",
                fieldType: "Concept",
                concept: "040a11a6-eaf3-478e-a274-4cf2352675ae"
              },
              required: false,
              sortWeight: parseFloat('16.0').toFixed(1)
            },
            {
              field: {
                name: this.screeningForm.value.gifts,
                description: "Has ever received money gifts or favors in exchange for sex?",
                fieldType: "Concept",
                concept: "675fbd8b-37d9-4885-8cb0-df2ab04dc739"
              },
              required: false,
              sortWeight: parseFloat('17.0').toFixed(1)
            }
          ] : []),
          {
            field: {
              name: this.screeningForm.value.sti,
              description: "Have been diagnosed or treated for STI?",
              fieldType: "Concept",
              concept: "b269f2dd-7810-418f-8ad9-8a847e95e83c"
            },
            required: false,
            sortWeight: parseFloat('18.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.pregnant,
              description: "Has a child of her own/is pregnant/has been pregnant?",
              fieldType: "Concept",
              concept: "7b652f92-9cbb-4b8a-bddc-4eeefd977ca6"
            },
            required: false,
            sortWeight: parseFloat('19.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.violence,
              description: "Under going violence or has undergone violence in the last 12 Months? (Physical,Emotional,Sexual,Social economic Violence)",
              fieldType: "Concept",
              concept: "b6c91b49-1be6-4d5e-868f-7d4001dd1943"
            },
            required: false,
            sortWeight: parseFloat('20.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.head,
              description: "Is the head of the household or in a child headed household",
              fieldType: "Concept",
              concept: "d2b04d79-7922-4cc8-abcd-58bead1bf6fb"
            },
            required: false,
            sortWeight: parseFloat('21.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.addiction,
              description: "Has used alcohol/drugs or abuse or struggled with addiction in the last 12 months?",
              fieldType: "Concept",
              concept: "ae715255-d4d7-421b-b434-407e3c9b4bd2"
            },
            required: false,
            sortWeight: parseFloat('22.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.orphan,
              description: "Is an orphan (partial or Total)",
              fieldType: "Concept",
              concept: "58b12a1f-23fa-4b48-bea1-bcbe3b8ea20b"
            },
            required: false,
            sortWeight: parseFloat('23.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.comment,
              description: "Comment",
              fieldType: "Concept",
              concept: "6af3d746-e9c4-43ce-9d23-ae5c88e0c620"
            },
            required: false,
            sortWeight: parseFloat('24.0').toFixed(1)
          },
          {
            field: {
              name: this.screeningForm.value.eligible,
              description: "Is eligible?",
              fieldType: "Concept",
              concept: "ccf759b9-bdd4-4265-a71a-67a894d89dec"
            },
            required: false,
            sortWeight: parseFloat('25.0').toFixed(1)
          }
        ]
      };

      try {
        const response = await this.screeningService.createForm(formData).toPromise();
        console.log('Form submitted successfully:', response);
  
        const existingData = JSON.parse(localStorage.getItem('formDataArray') || '[]');
        existingData.push(formData);
        localStorage.setItem('formDataArray', JSON.stringify(existingData));
  
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Form submitted successfully!',
          buttons: [
            {
              text: 'OK',
              handler: () => this.router.navigate(['/screened'])
            }
          ]
        });
  
        await alert.present();
      } catch (error) {
        console.error('Form submission error', error);
  
        const errorAlert = await this.alertController.create({
          header: 'Form Submission Error',
          message: 'Please try again.',
          buttons: ['OK']
        });
  
        await errorAlert.present();
      } finally {
        this.isSubmitting = false;  // Reset the flag
      }
    }
  }
}