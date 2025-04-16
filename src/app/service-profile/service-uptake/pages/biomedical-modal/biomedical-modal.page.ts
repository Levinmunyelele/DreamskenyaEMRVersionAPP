import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';


@Component({
  selector: 'app-biomedical-modal',
  templateUrl: './biomedical-modal.page.html',
  styleUrls: ['./biomedical-modal.page.scss'],
})
export class BiomedicalModalPage implements OnInit {
  biomedicalForm!: FormGroup;
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  @Input() encounter: any;

  questions = [

    {
      label: 'Intervention Type',
      concept: '95a8edf1-af6a-41b3-80a3-7a71c613bba3',
      type: 'dropdown',
      options: [
        { value: '605ebefb-48b9-474f-aa6f-5732d49c2908', label: 'PMTCT' },
        { value: '35151086-738f-4c15-afd1-7b085987efdb', label: 'EBI-Respect K' }
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
  activeVisit: any;
  location: any;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private encounterService: EncounterService,
    private navParams: NavParams,


  ) { }
  populateForm() {
    if (!this.encounter || !this.encounter.obs) {
      console.warn('Encounter or observations are missing, skipping form population.');
      return;
    }

    const responsesArray = this.biomedicalForm.get('responses') as FormArray;
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
  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.biomedicalForm.get('responses') as FormArray;
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

    const patientUuid = this.patientData.uuid;
    const visitUuid = this.activeVisit?.uuid || null;
    const locationUuid =
      this.location?.uuid ||
      this.patientData.identifiers?.[0]?.location?.uuid ||
      null; // Get location from location, then patient
    const encounterTypeUuid = this.encounterType;

    if (!locationUuid) {
      console.error('Location UUID is missing.  Cannot submit encounter.');
      return;
    }

    if (!visitUuid) {
      console.warn('Visit UUID is missing. Setting visit to null.');
    }

    if (!this.encounterType) {
      console.warn('Encounter Type is missing. Using default.');
    }

    const encounterUuid = this.encounter?.uuid; // Get encounter UUID

    if (encounterUuid) {
      // If updating, first fetch the *specific* existing encounter by its UUID
      this.encounterService.getEncounterByUuid(encounterUuid).subscribe(
        (existingEncounter) => {
          if (!existingEncounter) {
            console.error(
              'Encounter to update not found:',
              encounterUuid
            );
            this.modalCtrl.dismiss({
              refresh: false,
              error: 'Encounter to update not found',
            });
            return; // Important: Exit the function if the encounter doesn't exist
          }
          // 1. Get Existing Observations
          const existingObs = existingEncounter.obs || [];

          // 2. Map new responses to observations, try to update existing
          const updatedObs = this.questions.map((question, index) => {
            const responseValue = this.responses.at(index)?.value;
            const mappedValue =
              question.type === 'dropdown' ? { uuid: responseValue } : responseValue;
            // Try to find if an existing obs with the same concept exists
            const existingObsIndex = existingObs.findIndex(
              (o: { concept: { uuid: string; }; }) => o.concept.uuid === question.concept
            );

            if (existingObsIndex > -1) {
              // Update existing observation
              const existing = existingObs[existingObsIndex];
              return {
                uuid: existing.uuid, // Preserve the original UUID!
                concept: question.concept,
                value: mappedValue,
              };
            } else {
              // Create a new observation
              return {
                concept: question.concept,
                value: mappedValue,
              };
            }
          });

          // 3. Combine existing and updated.
          const finalObs = [...updatedObs];

          // 4. Prepare the payload with the *complete* obs array
          const payload: any = {
            patient: patientUuid,
            visit: visitUuid,
            encounterType: encounterTypeUuid,
            form: this.form || '68f03464-e4cf-4336-b264-e3d43f1f123c',
            obs: finalObs, // Use the combined array
            orders: [],
            diagnoses: [],
            location: locationUuid,
          };

          console.log(
            'Updating encounter with UUID:',
            encounterUuid,
            'Payload:',
            JSON.stringify(payload, null, 2)
          );

          this.encounterService.updateEncounter(encounterUuid, payload).subscribe(
            (response) => {
              console.log(
                'Successfully updated encounter. API Response:',
                response
              );
              this.modalCtrl.dismiss({ refresh: true, data: response });
            },
            (error) => {
              console.error('Error updating encounter. API Error:', error);
              console.error('Full Error Object:', error);
              console.error('Error Response:', error?.error || error?.message);
              this.modalCtrl.dismiss({ refresh: false, error: error });
            }
          );
        },
        (error) => {
          console.error('Error fetching existing encounter:', error);
          this.modalCtrl.dismiss({ refresh: false, error: error });
        }
      );
    } else {
      // Creating a new encounter (your original code)
      const obs = this.questions.map((question, index) => {
        const responseValue = this.responses.at(index)?.value;
        const mappedValue =
          question.type === 'dropdown' ? { uuid: responseValue } : responseValue;
        return {
          concept: question.concept,
          value: mappedValue,
        };
      });
      const payload: any = {
        patient: patientUuid,
        visit: visitUuid,
        encounterType: encounterTypeUuid,
        form: this.form || '68f03464-e4cf-4336-b264-e3d43f1f123c',
        obs: obs, // Use the combined array
        orders: [],
        diagnoses: [],
        location: locationUuid,
      };
      console.log('No encounter found, creating a new encounter.');
      this.encounterService.submitEncounter(payload).subscribe(
        (response) => {
          console.log('Successfully created encounter. API Response:', response);
          this.modalCtrl.dismiss({ refresh: true, data: response });
        },
        (error) => {
          console.error('Error creating new encounter.  API Error:', error);
          console.error('Full Error Object:', error);
          console.error('Error Response:', error?.error || error?.message); //consistent
          this.modalCtrl.dismiss({ refresh: false, error: error });
        }
      );
    }
  
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

    this.biomedicalForm = this.fb.group({
      responses: this.fb.array(this.questions?.map(() => this.fb.control('')) || [])
    });

    if (this.encounter) {
      this.populateForm();
    }
  }
}  
