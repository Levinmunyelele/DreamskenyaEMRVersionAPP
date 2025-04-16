import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';


@Component({
  selector: 'app-business-follow-up',
  templateUrl: './business-follow-up.component.html',
  styleUrls: ['./business-follow-up.component.scss'],
})

export class BusinessFollowUpComponent implements OnInit {

  followForm!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  forthFormGroup!: FormGroup
  currentStep = 1;
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  selectedOptions: { [key: string]: any } = {};
  @Input() encounter: any;
  visibleFields: { [key: string]: boolean } = {};


  questions = [
    {
      label: "Intervention Date",
      concept: "bc454585-c0b4-4255-9f2f-0fba4e3b3eb3",
      type: "date",
    },
    {
      label: "Name of business/home cottage industry",
      concept: "76249875-70b9-4626-add8-5f2c567329f7",
      type: "text",
    },
    {
      label: "Location of business/home cottage industry",
      concept: "af70e95e-8753-4d4b-ac15-e29c9272bd99",
      type: "text",
    },
    {
      label: "Description of business/home cottage industry",
      concept: "0a7e317e-9d52-4d0c-8c1b-716df502a966",
      type: "text",
    },
    {
      label: " Follow-up Date",
      concept: "64d6b0e4-f03e-406e-b8d3-0264eeee5dd5",
      type: "date",
    }
  ];
  secondSection = [
    {
      label: "Production skilling received",
      concept: "43020a38-4a95-43e4-bd7e-366896bcefd4",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Date / month received production kit",
      concept: "cd2ebf6e-5d3a-428d-8333-b4d27672c54c",
      type: "date",
      dependsOn: '43020a38-4a95-43e4-bd7e-366896bcefd4',
      showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
    },
    {
      label: "Description of production kit received (Item received)",
      concept: "d3962e7e-154c-47f3-97dc-1c7984952f14",
      type: "text",
      dependsOn: '43020a38-4a95-43e4-bd7e-366896bcefd4',
      showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
    },
    {
      label: "Quantity of the production kit received",
      concept: "88bced48-5269-4e1d-90ef-9a302df855e4",
      type: "text",
      dependsOn: '43020a38-4a95-43e4-bd7e-366896bcefd4',
      showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
    },
    {
      label: "If not received, what is the reason for not taking up production skilling?",
      concept: "859c553d-ce8e-4749-a410-9ff168c2f7a5",
      type: "radio",
      dependsOn: '43020a38-4a95-43e4-bd7e-366896bcefd4',
      showIf: ["1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
      options: [
        { value: "5f28729a-b8ce-4a80-9a98-aefe26eda111", label: "Others (Specify)" },
        { value: "2b04b31e-a839-4cab-8593-40e1b5b208cc", label: "Have received apprenticeship in production" },
        { value: "73d88dc7-c175-476d-957e-fee58176321b", label: "Has experience in production" },
        { value: "f7ab5f9e-ee19-41d3-965c-206388ab2030", label: "Already trained in production" }
      ]
    },
    {
      label: "Other Specify",
      concept: "d838e1b2-51d8-432f-b2d2-c337b970fa08",
      type: "text",
      dependsOn: '859c553d-ce8e-4749-a410-9ff168c2f7a5',
      showIf: ["5f28729a-b8ce-4a80-9a98-aefe26eda111"],
    }

  ];
  thirdSection = [
    {
      label: "Business / production status",
      concept: "a5293d47-cbc8-42f9-9bac-81bf4330221a",
      type: "radio",
      options: [
        { value: "c3b64a00-6d66-428f-92ce-7b4feee313f0", label: "Stalled/posed/ dormant" },
        { value: "9a072d2d-d62c-4e94-b817-a65cda97f06f", label: "Did not start" },
        { value: "679b1dc3-8da0-4b17-957b-7da565ccedea", label: "Active / Ongoing" }
      ]
    },
    {
      label: "If dormant/stalled or did not start, what are the reasons",
      concept: "07594a5b-1c4c-48e3-8028-187c95133170",
      type: "text",
      dependsOn: 'a5293d47-cbc8-42f9-9bac-81bf4330221a',
      showIf: ["c3b64a00-6d66-428f-92ce-7b4feee313f0", "9a072d2d-d62c-4e94-b817-a65cda97f06f"],
    },
    {
      label: "Challenges noted",
      concept: "52cfe5e9-473a-4240-8093-75927fa03cc8",
      type: "text",
      dependsOn: 'a5293d47-cbc8-42f9-9bac-81bf4330221a',
      showIf: ["c3b64a00-6d66-428f-92ce-7b4feee313f0", "9a072d2d-d62c-4e94-b817-a65cda97f06f"],
    },
    {
      label: "If active, give a brief description from observation and self-report",
      concept: "cb658e41-3618-497c-b21d-74f05ae87936",
      type: "text",
      dependsOn: 'a5293d47-cbc8-42f9-9bac-81bf4330221a',
      showIf: ["679b1dc3-8da0-4b17-957b-7da565ccedea"],
    },
    {
      label: "Successes noted",
      concept: "173ac074-84c9-418f-b354-b611e34cb450",
      type: "text",
      dependsOn: 'a5293d47-cbc8-42f9-9bac-81bf4330221a',
      showIf: ["679b1dc3-8da0-4b17-957b-7da565ccedea"],
    }
  ];

  forthSection = [
    {
      label: "Staff evaluation",
      concept: "5b849ae2-0c2c-45a9-ae2f-b8865a45c434",
      type: "radio",
      options: [
        { value: "ffc15ebf-d19d-487a-b3e8-ba119bbf3750", label: "Satisfactory progress" },
        { value: "159407AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Poor" },
        { value: "160114AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No progress" },
        { value: "80efece2-3f54-4041-b855-c518bcc64574", label: "Good progress" }
      ]
    },
    {
      label: "Other Observations",
      concept: "9b9ecb9d-b974-45ae-87b8-9f18b0c27c03",
      type: "text",
    },
    {
      label: "Staff comments and recommendations",
      concept: "fb9c1491-623f-40e6-8ff8-170669185724",
      type: "text",
    },
    {
      label: " Date",
      concept: "78deec90-cdcd-4df7-a8c9-561f011e9094",
      type: "date",
    }

  ]

  totalSteps!: number;
  sections!: { questions: any[]; formGroup: FormGroup<any> }[];
  activeVisit: any;
  location: any;
  patientUuid: any;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private encounterService: EncounterService,
    private navParams: NavParams,
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.followForm.get('responses') as FormArray;
  }

  ngOnInit() {
    this.followForm = this.fb.group({});
    this.secondFormGroup = this.fb.group({});
    this.thirdFormGroup = this.fb.group({});
    this.forthFormGroup = this.fb.group({});

    this.sections = [
      { questions: this.questions, formGroup: this.followForm },
      { questions: this.secondSection, formGroup: this.secondFormGroup },
      { questions: this.thirdSection, formGroup: this.thirdFormGroup },
      { questions: this.forthSection, formGroup: this.forthFormGroup },

    ];

    this.totalSteps = this.sections.length;

    this.sections.forEach(({ questions, formGroup }) => {
      questions.forEach((question) => {
        if (question.type === 'radio') {
          formGroup.addControl(question.concept, this.fb.control([]));
        } else {
          formGroup.addControl(question.concept, this.fb.control(''));
        }
        
        this.visibleFields[question.concept] = true; 
      });
    });
    this.updateVisibility(); 
    if (this.encounter) {
      this.populateForm();
    }
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
    
  }

  updateVisibility() {
    this.sections.forEach(({ questions, formGroup }) => {
      questions.forEach((question) => {
        if (question.dependsOn && question.showIf) {
          const parentControl = formGroup.get(question.dependsOn);
          if (parentControl) {
            const parentValue = parentControl.value;
            this.visibleFields[question.concept] = question.showIf.includes(parentValue);
          } else {
            this.visibleFields[question.concept] = false;
          }
        } else {
          this.visibleFields[question.concept] = true;
        }
      });
    });
  }

  onradioChange(event: any, controlName: string) {
    this.secondFormGroup.get(controlName)?.setValue(event.detail.value); 
    this.updateVisibility();
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
  
    obs.forEach((ob: any) => {
      const conceptUuid = ob.concept.uuid;
      const value = this.extractValue(ob.display);
  
      let question: any = this.questions.find((q) => q.concept === conceptUuid);
      let formGroup = this.followForm;
  
      if (!question) {
        question = this.secondSection.find((q) => q.concept === conceptUuid);
        formGroup = this.secondFormGroup;
      }
  
      if (!question) {
        question = this.thirdSection.find((q) => q.concept === conceptUuid);
        formGroup = this.thirdFormGroup;
      }
  
      if (!question) {
        question = this.forthSection.find((q) => q.concept === conceptUuid);
        formGroup = this.forthFormGroup;
      }
  
      if (question && formGroup) {
        if (question.type === 'radio' && question.options) {
          const option = question.options.find((opt: any) => opt.label === value);
          if (option) {
            formGroup.get(question.concept)?.setValue(option.value);
          }
        } else if (question.type === 'date' || question.type === 'text') {
          formGroup.get(question.concept)?.setValue(value);
        }
      }
    });
    this.updateVisibility();
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
  
    if (!this.questions || !this.secondSection || !this.thirdSection || !this.forthSection) {
      console.warn('One or more question sections are missing, skipping form submission.');
      return;
    }
  
    if (!this.followForm || !this.secondFormGroup || !this.thirdFormGroup || !this.forthFormGroup) {
      console.error('One or more form groups are missing.');
      return;
    }
  
    const extractObs = (questions: any[], formGroup: any) => {
      return questions
        .map((question) => {
          let value = formGroup.value[question.concept];
  
          if (value !== null && value !== undefined && value !== '') {
            if (['dropdown', 'radio', 'text', 'textarea', 'number', 'date'].includes(question.type)) {
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
  
    const allObs = [
      ...extractObs(this.questions, this.followForm),
      ...extractObs(this.secondSection, this.secondFormGroup),
      ...extractObs(this.thirdSection, this.thirdFormGroup),
      ...extractObs(this.forthSection, this.forthFormGroup)
    ];
  
    const patientUuid = this.patientData.uuid;
    const visitUuid = this.activeVisit?.uuid || null;
    const locationUuid = this.patientData.identifiers?.[0]?.location?.uuid || null;
    const encounterUuid = this.encounter?.uuid || null;  // Check if encounterUuid exists
  
    if (!locationUuid) {
      console.error('Location UUID is missing. Cannot proceed.');
      return;
    }
  
    const payload = {
      patient: patientUuid,
      visit: visitUuid,
      encounterType: this.encounterType,
      form: this.form || 'default-form-uuid',
      obs: allObs,
      orders: [],
      diagnoses: [],
      location: locationUuid,
    };
  
    console.log('Payload to be sent:', payload);
  
    if (encounterUuid) {
      // If encounterUuid exists, update the existing encounter
      this.encounterService.getEncounterByUuid(encounterUuid).subscribe(
        (existingEncounter) => {
          if (!existingEncounter) {
            console.error('Encounter to update not found:', encounterUuid);
            this.modalCtrl.dismiss({ refresh: false, error: 'Encounter not found' });
            return;
          }
  
          const existingObs = existingEncounter.obs || [];
          const updatedObs = allObs.map((obsItem) => {
            const existingIndex = existingObs.findIndex(
              (o: { concept: { uuid: string } }) => o.concept.uuid === obsItem.concept
            );
            if (existingIndex > -1) {
              return {
                uuid: existingObs[existingIndex].uuid,
                concept: obsItem.concept,
                value: obsItem.value,
              };
            } else {
              return obsItem;
            }
          });
  
          const finalPayload = {
            ...payload,
            obs: updatedObs,
          };
  
          console.log('Updating encounter:', encounterUuid, finalPayload);
  
          this.encounterService.updateEncounter(encounterUuid, finalPayload).subscribe(
            (response) => {
              console.log('Encounter updated successfully:', response);
              this.modalCtrl.dismiss({ refresh: true, data: response });
            },
            (error) => {
              console.error('Error updating encounter:', error);
              this.modalCtrl.dismiss({ refresh: false, error });
            }
          );
        },
        (error) => {
          console.error('Error fetching existing encounter:', error);
          this.modalCtrl.dismiss({ refresh: false, error });
        }
      );
    } else {
      // If encounterUuid doesn't exist, create a new encounter
      this.encounterService.submitEncounter(payload).subscribe(
        (response) => {
          console.log('New encounter created successfully:', response);
          this.modalCtrl.dismiss({ refresh: true, data: response });
        },
        (error) => {
          console.error('Error submitting encounter:', error);
          this.modalCtrl.dismiss({ refresh: false, error });
        }
      );
    }
  }
  
  
}