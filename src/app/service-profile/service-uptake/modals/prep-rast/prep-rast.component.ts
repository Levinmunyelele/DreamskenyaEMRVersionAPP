import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';

@Component({
  selector: 'app-prep-rast',
  templateUrl: './prep-rast.component.html',
  styleUrls: ['./prep-rast.component.scss'],
})
export class PrepRastComponent  implements OnInit {

  prepForm!: FormGroup;
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  @Input() encounter: any;


  questions = [
    {
      label: "Intervention Date",
      concept: "bc454585-c0b4-4255-9f2f-0fba4e3b3eb3",
      type: "date",
  },
  {
      label: "What is your HIV status?",
      concept: "179bb083-6f5d-4610-bee0-afe2de78f10f",
      type: "radio",
      options: [
          { value: "03f86827-88a0-439c-bb49-75b06482ec3e", label: "Unwilling to Disclose" },
          { value: "1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Unknown" },
          { value: "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "POSITIVE" },
          { value: "664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "NEGATIVE" }
      ]
  },
  {
      label: "What is the HIV status of your sexual partner(s)?",
      concept: "5baca04f-dad6-4480-b01a-28de2c0599a6",
      type: "radio",
      options: [
          { value: "03f86827-88a0-439c-bb49-75b06482ec3e", label: "Unwilling to Disclose" },
          { value: "1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Unknown" },
          { value: "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "POSITIVE" },
          { value: "664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "NEGATIVE" }
      ]
  },
  {
      label: "In the past 6 months have you had sex without a condom with a partner(s) of unknown or positive HIV status?",
      concept: "bf09a3fb-63fe-47c2-9683-b9108eddd036",
      type: "radio",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "In the past 6 months have you engaged in sex in exchange of money or other favors?",
      concept: "c6a3d529-12fa-4024-9e65-9a5eccad3861",
      type: "radio",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "In the past 6 months have you been diagnosed with or treated for an STI?",
      concept: "f41ffdc9-dca4-4460-97af-b09152e3085d",
      type: "radio",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "In the past 6 months have you shared needles while engaging in intravenous drug use?",
      concept: "a0277e58-2fa9-4eb4-ac75-516f6d6f1095",
      type: "radio",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "In the past 6 months have you been forced to have sex against your will or physically assaulted including assault by your sexual partner(s)?",
      concept: "d045491a-cd09-4f10-9659-c4dc63141e20",
      type: "radio",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "Have you used post exposure prophylaxis (PEP) two times or more?",
      concept: "91cd943f-4246-4df9-af89-181f173df1c0",
      type: "radio",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "Refer the client for further PrEP assessment at the health facility (Remarks)",
      concept: "4962c60f-f5cd-4426-889a-294f6a8ac72b",
      type: "text",
  },
  {
      label: "PrEP Assesment Remarks",
      concept: "4afb26f6-86bf-408a-a06e-e2ce10f3888a",
      type: "text",
  }
];
  sections: any[] | undefined;
  activeVisit: any;
  location: any;
  patientUuid: any;

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
  return this.prepForm.get('responses') as FormArray;
}
populateForm() {
  if (!this.encounter || !this.encounter.obs) {
    console.warn('Encounter or observations are missing, skipping form population.');
    return;
  }

  const responsesArray = this.prepForm.get('responses') as FormArray;
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
  const parts = display.split('::'); // Split by '::'
  if (parts.length > 1) {
    return parts[1].trim(); // Get the second part
  } else {
    const singleColonParts = display.split(':'); // Split by ':'
    return singleColonParts.length > 1 ? singleColonParts[1].trim() : display;
  }
}
submitForm() {
  if (!this.patientData) {
    console.error('Patient data is missing.');
    return;
  }

  if (!this.questions || this.questions.length === 0) {
    console.warn('No questions available. Skipping form submission.');
    return;
  }

  if (!this.responses) {
    console.error('Responses are missing.');
    return;
  }

  const extractObs = (questions: any[], responses: any) => {
    return questions
      .map((question, index) => {
        const value = responses.at(index)?.value;

        if (value !== null && value !== undefined) {
          if (typeof value === 'string' && value.trim() === '') return null;
          if (Array.isArray(value) && value.length === 0) return null;
          if (typeof value === 'number' && isNaN(value)) return null;

          let obsValue = value;
          if (['dropdown', 'radio'].includes(question.type)) {
            obsValue = { uuid: value };
          }

          return {
            concept: question.concept,
            value: obsValue
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  const obs = extractObs(this.questions, this.responses);

  const patientUuid = this.patientData.uuid;
  const locationUuid = this.patientData.identifiers?.[0]?.location?.uuid || null;
  const visitUuid = this.activeVisit?.uuid || null;
  const encounterTypeUuid = this.encounterType || '6e5ec039-8d2a-4172-b3fb-ee9d0ba647b7';

  if (!locationUuid) {
    console.error('Location UUID is missing from patient data.');
    return;
  }

  if (!visitUuid) {
    console.warn('Visit UUID is missing. Proceeding without visit.');
  }

  if (!this.encounterType) {
    console.warn('Encounter type is missing. Using default.');
  }

  const payload = {
    patient: patientUuid,
    visit: visitUuid,
    encounterType: encounterTypeUuid,
    form: this.form || 'default-form-uuid',
    obs: obs,
    orders: [],
    diagnoses: [],
    location: locationUuid
  };

  console.log('Payload to be sent:', payload);

  // Check if encounter exists, and either update or submit encounter
  if (this.encounter && this.encounter.uuid) {
    // Update encounter
    this.encounterService.updateEncounter(this.encounter.uuid, payload).subscribe(
      (response) => {
        console.log('Encounter updated successfully:', response);
        this.modalCtrl.dismiss({ refresh: true, data: response });
      },
      (error) => {
        console.error('Error updating encounter:', error);
        this.modalCtrl.dismiss({ refresh: false, error });
      }
    );
  } else {
    // Submit new encounter
    this.encounterService.submitEncounter(payload).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.modalCtrl.dismiss({ refresh: true, data: response });
      },
      (error) => {
        console.error('API Error:', error);
        this.modalCtrl.dismiss({ refresh: false, error });
      }
    );
  }
}

ngOnInit() {
  this.activeVisit = this.navParams.get('activeVisit');
  this.encounterType = this.navParams.get('encounterType');
  this.form = this.navParams.get('form');
  this.patientData = this.navParams.get('patientData');
  this.visitType = this.navParams.get('visitType');
  this.location = this.navParams.get('location');
  this.patientUuid = this.navParams.get('patientUuid');
  this.encounter = this.navParams.get('encounter');

  console.log("Modal Data Received:", {
    activeVisit: this.activeVisit,
    encounterType: this.encounterType,
    form: this.form,
    patientData: this.patientData,
    visitType: this.visitType,
    location: this.location,
    patientUuid: this.patientUuid,
    encounter: this.encounter
  });
  this.prepForm = this.fb.group({
    responses: this.fb.array(this.questions?.map(() => this.fb.control('')) || [])
  });
  if (this.encounter) {
    this.populateForm();
  }

}

}  
