import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';

@Component({
  selector: 'app-hts-eligibility',
  templateUrl: './hts-eligibility.component.html',
  styleUrls: ['./hts-eligibility.component.scss'],
})
export class HtsEligibilityComponent  implements OnInit {
  maleForm!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  currentStep = 1; patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  selectedOptions: { [key: string]: any } = {};
  visibleFields: { [key: string]: boolean } = {};
  @Input() encounter: any;


  questions = [
    {
      label: "Date of Application",
      concept: "cdb4aa46-663c-40d1-874b-cd8c6c0ab5a2",
      type: "date",
    },
    {
      label: "Safe Space Name",
      concept: "36c7fe78-27e7-49c4-9abb-153e43f23c3e",
      type: "text",
    },
    {
      label: "Segment (AGYW Age group)",
      concept: "27b15d4e-f518-4692-8b07-24e3e028233f",
      type: "radio",
      options: [
        { value: "3e476d29-4133-4dc9-abe5-7221b21a7812", label: "15-17" },
        { value: "903151cb-14a9-4399-8afc-e6c4f70402eb", label: "18-19" },
        { value: "9b94ba22-dfc9-44e9-a7e7-d3f43fb4cf2c", label: "20-24" }
      ]
    },
    {
      label: "Is the AGYW out of School",
      concept: "608ce3a2-eb82-461f-ae08-b84194a7b5d3",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Is the AGYW with child",
      concept: "abf27b48-bfde-4d9f-a49b-ad5113ae703f",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Is the AGYW Employed",
      concept: "b5b2cec2-101f-4ab5-8315-a375596bb4f4",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
  ];
  secondSection = [
    {
      label: "Who are the men that girls like them are having sex with?",
      concept: "67b297d7-7030-4edd-ae1c-e972e8e42460",
      type: "text"
    },
    {
      label: "Partner Type e.g casual, Regular Etc",
      concept: "e56e2a5d-11a7-4452-9131-370095e50d2d",
      type: "radio",
      options: [
        { value: "163565AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Casual sexual partner" },
        { value: "0d2f24cd-0bd9-4159-b71d-a92f2c11a396", label: "Regular sex partner" }
      ]
    },
    {
      label: "Where do the men meet/hang-out",
      concept: "6e3eab5b-6363-4905-a7a2-c6632cea62ff",
      type: "text"
    },
    {
      label: "Where do girls meet them? (List from most popular hang-out to the least popular)",
      concept: "988e7fd8-961f-4c25-9671-12b009b2ed66",
      type: "text"
    },
    {
      label: "When do the girls meet them (Time of the year, Month, day)",
      concept: "3497d576-c806-4d70-b4a4-9b69c8af62a0",
      type: "date"
    },
    {
      label: "Reasons why girls have sex with them",
      concept: "8ef03094-7523-4984-9b01-b29aabef771e",
      type: "text"
    },
    {
      label: "Do girls use condoms with these partners",
      concept: "5584a9ce-dfd0-4a3d-ae80-a2a7b107e027",
      type: "radio",
      options: [
        { value: "1090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Never" },
        { value: "4c3ee2c4-fbb2-4cda-bfcf-0130b2417a04", label: "Always/Most of the times" },
        { value: "1385AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Sometimes" }
      ]
    }
  ];
  thirdSection =[
    {
    label: "List MSP from the one that most girls are having sex with to the least",
    concept: "f2ff2b3d-c721-4d00-9f5e-50dec69eb3e5",
    type: "text"
  },
  {
    label: "Rank where MSP hang-out starting with the most popular venue",
    concept: "2dc19123-d3bc-4624-b824-9b2916d001c0",
    type: "text"
  },
  {
    label: "Reasons (List the reasons why girls have sexual relationships with each type of partner starting with the most important reason)",
    concept: "fe74fa09-620e-4cef-a84e-701d3b395a68",
    type: "text"
  }
  ]
  totalSteps!: number;
  sections!: { questions: ({ label: string; concept: string; type: string; options?: undefined; } | { label: string; concept: string; type: string; options: { value: string; label: string; }[]; })[]; formGroup: FormGroup<any>; }[];
  activeVisit: any;
  location: any;
  patientUuid: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private encounterService: EncounterService,
    private navParams: NavParams,) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.maleForm.get('responses') as FormArray;
  }
  
  ngOnInit() {
      this.maleForm = this.fb.group({});
      this.secondFormGroup = this.fb.group({});
      this.thirdFormGroup = this.fb.group({});
  
      this.sections = [
        { questions: this.questions, formGroup: this.maleForm },
        { questions: this.secondSection, formGroup: this.secondFormGroup },
        { questions: this.thirdSection, formGroup: this.thirdFormGroup },
  
      ];
      this.totalSteps = this.sections.length;
  
      this.sections.forEach((section) => {
        section.questions?.forEach((question) => {
          if (question.concept) {
            if (question.type === 'checkbox') {
              if (!section.formGroup.contains(question.concept)) {
                section.formGroup.addControl(question.concept, this.fb.array([]));
              }
  
            } else {
              section.formGroup.addControl(question.concept, this.fb.control(''));
            }
  
          }
  
        });
  
      });
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
  
      if (this.encounter) {
        this.populateForm();
      }
  
    }
  
    onSelectionChange(value: any, concept: string) {
      this.selectedOptions[concept] = value;
  
      const index = this.questions.findIndex(q => q.concept === concept);
      if (index !== -1) {
        const responsesArray = this.maleForm.get('responses') as FormArray;
        responsesArray.at(index).setValue(value);
      }
    }
  
    onCheckboxChange(event: any, concept: string, value: string): void {
      const isChecked = event.detail.checked;
  
      let targetFormGroup: FormGroup | undefined = this.maleForm.contains(concept)
        ? this.maleForm
        : this.thirdFormGroup.contains(concept)
          ? this.thirdFormGroup
          : undefined;
  
      if (!targetFormGroup) {
        console.error(`Control '${concept}' not found in any form group.`);
        return;
      }
  
      let control = targetFormGroup.get(concept);
  
      if (!control) {
        console.warn(`Control '${concept}' not found in ${targetFormGroup}.`);
        return;
      }
  
      if (!(control instanceof FormArray)) {
        console.warn(`Control '${concept}' is not a FormArray. Initializing as FormArray.`);
        targetFormGroup.setControl(concept, this.fb.array([]));
        control = targetFormGroup.get(concept) as FormArray;
      }
  
      if (isChecked) {
        if (!control.value.includes(value)) {
          (control as FormArray).push(this.fb.control(value));
        }
      } else {
        const index = (control as FormArray).controls.findIndex((x) => x.value === value);
        if (index > -1) {
          (control as FormArray).removeAt(index);
        }
      }
  
      console.log(`Updated FormArray for concept '${concept}':`, control.value);
    }
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    }
  
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    }
    populateForm() {
      if (!this.encounter || !this.encounter.obs) {
        console.warn('Encounter or observations are missing, skipping form population.');
        return;
      }
    
      const obs = this.encounter.obs;
    
      this.sections.forEach((section) => {
        section.questions?.forEach((question) => {
          const conceptUuid = question.concept;
          const control = section.formGroup.get(conceptUuid);
    
          if (question.type === 'checkbox' && question.options && control instanceof FormArray) {
            control.clear();
            obs.forEach((ob: any) => {
              if (ob.concept.uuid === conceptUuid) {
                const extractedValue = this.extractValue(ob.display);
                question.options.forEach((option: any) => {
                  if (extractedValue === option.label) {
                    control.push(this.fb.control(option.value));
                  }
                });
              }
            });
          } else if (control instanceof FormControl) {
            const matchingObs = obs.find((ob: { concept: { uuid: string; }; }) => ob.concept.uuid === conceptUuid);
            if (matchingObs) {
              const extractedValue = this.extractValue(matchingObs.display);
              if (question.type === 'radio' && question.options) {
                const option = question.options.find((opt: any) => opt.label === extractedValue);
                if (option) {
                  control.setValue(option.value);
                }
              } else if (question.type === 'date' || question.type === 'text') {
                control.setValue(extractedValue);
              }
            }
          }
        });
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
  
      if (!this.questions || !this.secondSection || !this.thirdSection) {
        console.warn('One or more question sections are missing, skipping form submission.');
        return;
      }
  
      if (!this.maleForm || !this.secondFormGroup || !this.thirdFormGroup) {
        console.error('One or more form groups are missing.');
        return;
      }
  
  
      const extractObs = (questions: any[], formGroup: any) => {
        return questions
          .map((question) => {
            let value = formGroup.value[question.concept];
  
            if (value !== null && value !== undefined && value !== '') {
              if (['dropdown', 'radio'].includes(question.type)) {
                return { concept: question.concept, value: value };
              }
              if (['text', 'textarea'].includes(question.type)) {
                return { concept: question.concept, value: value };
              }
  
  
              if (question.type === 'number') {
                return { concept: question.concept, value: value };
              }
  
              if (question.type === 'date') {
                return { concept: question.concept, value: value };
              }
  
              if (question.type === 'checkbox') {
                const control = formGroup.get(question.concept) as FormArray;
                value = control?.value || [];
  
                return value.map((v: string) => ({
                  concept: question.concept,
                  value: v
                }));
              }
  
              return { concept: question.concept, value };
            }
  
            return null;
          })
          .filter(Boolean)
          .reduce((acc, curr) => acc.concat(curr), []);
      };
  
  
  
      const obs = [
        ...extractObs(this.questions, this.maleForm),
        ...extractObs(this.secondSection, this.secondFormGroup),
        ...extractObs(this.thirdSection, this.thirdFormGroup),
      ];
  
      const visitUuid = this.activeVisit?.uuid || null;
    
      const payload = {
        patient: this.patientData.uuid,
        visit: visitUuid, 
        encounterType: this.encounterType,
        form: this.form,
        obs: obs,
        orders: [],
        diagnoses: [],
        location: this.patientData.identifiers?.[0]?.location?.uuid || null
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
  }  