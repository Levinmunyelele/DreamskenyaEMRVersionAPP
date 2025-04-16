import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';

@Component({
  selector: 'app-business-assessment',
  templateUrl: './business-assessment.component.html',
  styleUrls: ['./business-assessment.component.scss'],
})
export class BusinessAssessmentComponent implements OnInit {

  assForm!: FormGroup;
  secondFormGroup!: FormGroup;
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  currentStep = 1;
  selectedOptions: { [key: string]: any } = {};
  @Input() encounter: any;



  questions = [
    {
      label: "Intervention Date",
      concept: "bc454585-c0b4-4255-9f2f-0fba4e3b3eb3",
      type: "date"
    },
    {
      label: "Business location",
      concept: "d0b27441-6410-41c2-b5d7-3e5a60853433",
      type: "text"
    },
    {
      label: "Nearest landmark",
      concept: "7f718fc4-62ac-4408-bab3-288d0b56369e",
      type: "text"
    },
    {
      label: "Type of Business",
      concept: "e3350b61-df7d-4b09-911e-5003dcf0e592",
      type: "text"
    },
    {
      label: "Business Start Date",
      concept: "23f267a5-ec19-4b60-aaec-41fe35d1ec2b",
      type: "date"
    },
    {
      label: "Safe Space",
      concept: "e3b775f9-d60e-4d17-b599-b66909ed6ae2",
      type: "text"
    }

  ];
  secondSection = [
    {
      label: "Business understanding & passion: (Determine whether AGYW understands her business well and has Passion / enthusiasm for doing it / how long in business)",
      concept: "4d0b3378-273e-4ef8-850a-bce337979446",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Business understanding & passion",
      concept: "dfa5872b-d1d2-425b-a689-13960f0c542a",
      type: "text"
    },
    {
      label: "Business start-up capital: (Determine how business start-up cost was arrived at & the source of capital. Probe for honesty and seek business plan for costs from 10,000/= upwards)",
      concept: "2ef00544-3c4d-4d0e-9eb2-bf289b2445b8",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Business start-up capital",
      concept: "37ba1c57-dfd3-41c6-8911-6d3ba929a870",
      type: "text"
    },
    {
      label: "Record keeping: (Find out whether AGYW keeps business records. Seek evidence where applicable.)",
      concept: "3b0c430d-2c97-4e97-a46c-0b2869ff492e",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Record keeping",
      concept: "faf8c4f6-6eef-49eb-a32f-68c8146b37d2",
      type: "text"
    },
    {
      label: " Marketing & customer relations strategies: (Determine how the AGYW attracts and handles customers or probe for the understanding of the 4Ps or 6Ps of marketing and actual application in real life)",
      concept: "fba82ccc-1132-46a7-a2c8-c1c73682693f",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Marketing & customer relations strategies",
      concept: "18776720-dc44-409e-9cab-f7333f9278f4",
      type: "text"
    },
    {
      label: "Business costing: (Understand how AGYW sets prices for goods/ services and any factors put into consideration before selling price is determined)",
      concept: "5310763f-f54e-4700-a55a-ff457df16161",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Business costing",
      concept: "fbb0f65d-f2fe-4a1d-99d6-67c0a15961fa",
      type: "text"
    },
    {
      label: "Profit and loss: (Determine whether AGYW knows when she makes a profit /loss. Also seek any evidence to support statements given or insinuations made)",
      concept: "e5c64470-28bd-41fe-a309-8e11ce1f0809",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Profit and loss",
      concept: "59932aa7-7eab-4c2b-ad7f-039361eb3010",
      type: "text"
    },
    {
      label: "Business worth: (By observation and information provided by the AGYW, estimate the approximate value of products /services. This involves determining the approximate current net worth of the business. Look out for tangible evidence.)",
      concept: "da776cf3-a79e-4308-b834-f5e11212f6ea",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Business worth",
      concept: "e0156de5-ff56-4ef9-a90b-c20263610e6e",
      type: "text"
    },
    {
      label: "Future plans: (Determine what AGYW intends to do in the future.)",
      concept: "616c6160-6c9a-4b0a-9d70-7c6775f310ce",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Future plans",
      concept: "030707ff-b52e-471a-b8a2-36ca77d121dc",
      type: "text"
    },
    {
      label: "Business viability: (Assess the potential for business growth and development in the future)",
      concept: "9e73c708-41f5-4e1d-be1f-520435d21c96",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Business viability",
      concept: "28937cbe-e471-491b-8d13-28918f758681",
      type: "text"
    },
    {
      label: "Perceived risks/ gaps:(Assess the potential business risks and gaps. This is a critical component regarding the future of the business. Rate low where perceived risks are highly likely and vice versa)",
      concept: "e850da31-2452-48de-a9b1-1c8be8633b43",
      type: "radio",
      options: [
        { value: "91d95a53-fe9d-4cce-a4eb-cd4f9b45df7f", label: "10-Highest" },
        { value: "d1da8cc9-a561-4a11-a2cd-48adc1c1c4c4", label: "9" },
        { value: "713c1839-6ab5-4df0-adc8-0b33e341cf22", label: "8" },
        { value: "8500bed6-e158-4f44-b0cf-1975937617a4", label: "7" },
        { value: "1f620cf6-f2d1-4d5d-94b1-39a2cd0e7311", label: "6" },
        { value: "23d3ef2b-5b75-4316-b740-6e491260f76c", label: "5" },
        { value: "187d5ea4-4d64-4ef0-8d63-12cc95d16474", label: "4" },
        { value: "a60da32f-8374-4799-93f6-0026111a0840", label: "3" },
        { value: "2f6ade7a-bd51-43dc-a928-ca7a02f66735", label: "2" },
        { value: "0642a04e-0d18-4381-86c0-7077a0db856a", label: "1-Lowest" }
      ]
    },
    {
      label: "Assessment comments on Perceived risks/ gaps",
      concept: "b9c88753-a804-4b18-9d18-5d3a1f220c67",
      type: "text"
    }


  ]

  totalSteps!: number;
  sections!: { questions: ({ label: string; concept: string; type: string; options?: undefined; } | { label: string; concept: string; type: string; options: { value: string; label: string; }[]; })[]; formGroup: FormGroup<any>; }[];
  radioedradioes: { [key: string]: string[] } = {}
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
    return this.assForm.get('responses') as FormArray;
  }

  ngOnInit() {
    this.assForm = this.fb.group({});
    this.secondFormGroup = this.fb.group({});
  
    this.sections = [
      { questions: this.questions, formGroup: this.assForm },
      { questions: this.secondSection, formGroup: this.secondFormGroup },
    ];
    this.totalSteps = this.sections.length;
  
    this.sections.forEach(({ questions, formGroup }) => {
      questions.forEach((question) => {
        if (question.type === "radio") {
          formGroup.addControl(question.concept, this.fb.control(null)); // Or this.fb.control('')
        } else {
          formGroup.addControl(question.concept, this.fb.control(""));
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
      const responsesArray = this.assForm.get('responses') as FormArray;
      responsesArray.at(index).setValue(value);
    }
  }
  populateForm() {
    if (!this.encounter || !this.encounter.obs) {
      console.warn('Encounter or observations are missing, skipping form population.');
      return;
    }
  
    const obs = this.encounter.obs;
  
    obs.forEach((ob: any) => {
      this.sections.forEach((section) => {
        const question = section.questions.find((q) => q.concept === ob.concept.uuid) as {
          label: string;
          concept: string;
          type: string;
          options?: { label: string; value: any }[];
        };
  
        if (question) {
          const formGroup = section.formGroup;
          if (formGroup) {
            let value = this.extractValue(ob.display);
  
            if (question.type === 'radio' && question.options) {
              const option = question.options.find((opt) => opt.label === value);
              if (option) {
                formGroup.get(question.concept)?.setValue(option.value);
              }
            } else if (question.type === 'date' || question.type === 'text' || question.type === 'number' || question.type === 'textarea' || question.type === 'dropdown') {
              formGroup.get(question.concept)?.setValue(value);
            } else {
              formGroup.get(question.concept)?.setValue(value);
            }
          }
        }
      });
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

  submitForm() {
    if (!this.patientData) {
      console.error('Patient data is missing');
      return;
    }
  
    if (!this.questions || !this.secondSection) {
      console.warn('One or more question sections are missing, skipping form submission.');
      return;
    }
  
    if (!this.assForm || !this.secondFormGroup) {
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
      ...extractObs(this.questions, this.assForm),
      ...extractObs(this.secondSection, this.secondFormGroup),
    ];
  
    const patientUuid = this.patientData.uuid;
    const visitUuid = this.activeVisit?.uuid || null;
    const locationUuid = this.patientData.identifiers?.[0]?.location?.uuid || null;
    const encounterUuid = this.encounter?.uuid || null;
    const encounterTypeUuid = this.encounterType;
  
    if (!locationUuid) {
      console.error('Location UUID is missing. Cannot proceed.');
      return;
    }
  
    const payloadBase = {
      patient: patientUuid,
      visit: visitUuid,
      encounterType: encounterTypeUuid,
      form: this.form,
      orders: [],
      diagnoses: [],
      location: locationUuid,
    };
  
    if (encounterUuid) {
      // Updating existing encounter
      this.encounterService.getEncounterByUuid(encounterUuid).subscribe(
        (existingEncounter) => {
          if (!existingEncounter) {
            console.error('Encounter to update not found:', encounterUuid);
            this.modalCtrl.dismiss({ refresh: false, error: 'Encounter not found' });
            return;
          }
  
          const existingObs = existingEncounter.obs || [];
  
          const updatedObs = allObs.map((newObs) => {
            if (!newObs) return null;
  
            const matchIndex = existingObs.findIndex(
              (eo: any) => eo?.concept?.uuid === newObs.concept
            );
  
            if (matchIndex > -1) {
              return {
                uuid: existingObs[matchIndex].uuid,
                concept: newObs.concept,
                value: newObs.value
              };
            }
  
            return newObs;
          }).filter(Boolean);
  
          const finalPayload = {
            ...payloadBase,
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
      // Creating new encounter
      const newPayload = {
        ...payloadBase,
        obs: allObs,
      };
  
      console.log('Creating new encounter with payload:', newPayload);
  
      this.encounterService.submitEncounter(newPayload).subscribe(
        (response) => {
          console.log('New encounter created successfully:', response);
          this.modalCtrl.dismiss({ refresh: true, data: response });
        },
        (error) => {
          console.error('Error creating encounter:', error);
          this.modalCtrl.dismiss({ refresh: false, error });
        }
      );
    }
  }
  
}  
