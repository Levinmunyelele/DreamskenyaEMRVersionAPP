import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';

@Component({
  selector: 'app-behavioural-modal',
  templateUrl: './behavioural-modal.page.html',
  styleUrls: ['./behavioural-modal.page.scss'],
})
export class BehaviouralModalPage implements OnInit {
  behaviouralForm!: FormGroup;
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  @Input() encounter: any;


  questions = [

    {
      label: "Behavioural Intervention Type",
      concept: "6bc46b65-decf-42a4-8180-2ca75e01e99e",
      type: 'dropdown',
      options: [
        { value: '586ce4a3-3c60-4cea-ae75-017a938e4450', label: 'Health Choices for a Better Future (HCBF or Healthy Choices1)' },
        { value: '9623ae42-5342-4ff7-8686-bf7fc9b41c7d', label: 'My Health My Choice (MHMC or Healthy Choices2)' }
      ]
    },
    {
      label: "Intervention Date",
      concept: "bc454585-c0b4-4255-9f2f-0fba4e3b3eb3",
      type: "date",
    },
    {
      label: "Comment",
      concept: "6af3d746-e9c4-43ce-9d23-ae5c88e0c620",
      type: 'textarea',

    },
  ]
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private navParams: NavParams,
    private encounterService: EncounterService

  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.behaviouralForm.get('responses') as FormArray;
  }
  populateForm() {
    if (!this.encounter || !this.encounter.obs) {
      console.warn('Encounter or observations are missing, skipping form population.');
      return;
    }

    const responsesArray = this.behaviouralForm.get('responses') as FormArray;
    const obs = this.encounter.obs;

    obs.forEach((ob: any) => {
      const question = this.questions.find((q) => q.concept === ob.concept.uuid);
      if (question) {
        const index = this.questions.indexOf(question);
        if (index !== -1) {
          const control = responsesArray.at(index);
          if (control) {
            let value = this.extractValue(ob.display);

            if (question.type === 'radio' && question.options) {
              const option = question.options.find((opt) => opt.label === value);
              if (option) {
                control.setValue(option.value);
              }
            } else if (question.type === 'dropdown' && question.options) { // Add this condition for 'select'
              const option = question.options.find((opt) => opt.label === value);
              if (option) {
                control.setValue(option.value);
              }
            } else if (question.type === 'date' || question.type === 'text') {
              control.setValue(value);
            } else {
              control.setValue(value);
            }
          }
        }
      }
    });
  }

  extractValue(display: string): string {
    const parts = display.split('::');
    if (parts.length > 1) {
      return parts[1].trim();
    } else {
      const singleColonParts = display.split(':');
      return singleColonParts.length > 1 ? singleColonParts[1].trim() : display;
    }
  }
  

  submitForm() {
    if (!this.patientData) {
      console.error('Patient data is missing');
      return;
    }

    if (!this.questions || this.questions.length === 0) {
      console.warn('No questions available, skipping form submission.');
      return;
    }

    if (!this.responses) {
      console.error('Responses are missing.');
      return;
    }

    const obs = this.questions.map((question, index) => {
      const value = this.responses.at(index)?.value;
      return {
        concept: question.concept,
        value: question.type === 'dropdown' ? { uuid: value } : value
      };
    });

    const patientUuid = this.patientData.uuid;
    const locationUuid = this.patientData.identifiers?.[0]?.location?.uuid || null;
    const visitUuid = this.visitType || null;
    const encounterTypeUuid = this.encounterType || "6e5ec039-8d2a-4172-b3fb-ee9d0ba647b7";

    if (!locationUuid) {
      console.error('Location UUID is missing from patient data.');
      return;
    }

    if (!visitUuid) {
      console.warn('Visit UUID is missing. Setting visit to null.');
    }

    if (!this.encounterType) {
      console.warn('Encounter Type is missing. Using default.');
    }

    const payload = {
      patient: patientUuid,
      visit: visitUuid,
      encounterType: encounterTypeUuid,
      form: this.form || "68f03464-e4cf-4336-b264-e3d43f1f123c",
      obs: obs,
      orders: [],
      diagnoses: [],
      location: locationUuid
    };

    console.log('Payload to be sent:', payload);

    this.encounterService.submitEncounter(payload).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.modalCtrl.dismiss({ refresh: true, data: response });
      },
      (error) => {
        console.error('API Error:', error);
        this.modalCtrl.dismiss({ refresh: false, error: error });
      }
    );
  }


  ngOnInit() {
    this.patientData = this.navParams.get('patientData');
    this.enrollmentData = this.navParams.get('enrollmentData');
    this.encounterData = this.navParams.get('encounterData');
    this.visitType = this.navParams.get('visitType');
    this.encounterType = this.navParams.get('encounterType');
    this.form = this.navParams.get('form');

    console.log("Modal Data Received:", {
      patientData: this.patientData,
      enrollmentData: this.enrollmentData,
      encounterData: this.encounterData,
      visitType: this.visitType,
      encounterType: this.encounterType,
      form: this.form
    });

    this.behaviouralForm = this.fb.group({
      responses: this.fb.array(this.questions?.map(() => this.fb.control('')) || [])
    });

    if (this.encounter) {
      this.populateForm();
    }
  }

}  
