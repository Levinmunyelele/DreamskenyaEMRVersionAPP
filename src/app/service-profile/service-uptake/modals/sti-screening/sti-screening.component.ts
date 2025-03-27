import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';

@Component({
  selector: 'app-sti-screening',
  templateUrl: './sti-screening.component.html',
  styleUrls: ['./sti-screening.component.scss'],
})
export class StiScreeningComponent implements OnInit {

  stiForm!: FormGroup;
  secondFormGroup!: FormGroup;
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  @Input() encounter: any;
  selectedOptions: { [key: string]: any } = {};
  visibleFields: { [key: string]: boolean } = {};


  currentStep = 1;


  questions = [
    {
      label: "Intervention Date",
      concept: "15dec9c4-0851-4955-8668-3977ac2538c9",
      type: "date"
    },
    {
      label: "Do you have discharge/drip/abnormal bleeding or blood spotting from penis, vagina or bottom?",
      concept: "9c5ba6ca-c994-45c8-a308-4dfe26eba190",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Do you have sore(s) or a rash on penis, vagina, bottom, or body?",
      concept: "88032e0e-be08-4b70-8593-dbea17c6c605",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Do you have pain/discomfort in lower tummy, bottom, or genital area?",
      concept: "b21d8ed9-d37d-4017-a8c8-c91ff81295af",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Do you have pain/discomfort when passing urine (peeing)?",
      concept: "b523a145-97f8-43fb-b3ca-312eb2cdd26a",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    }
  ];
  secondSection = [
    {
      label: "Has a sexual contact told you they have symptoms?",
      concept: "35ec01e3-cd1d-4f0b-9c0f-e4873d8a6ed2",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Has a sexual contact told you they’ve been treated for an STI (Sexually Transmitted infection)?",
      concept: "3ca4897e-739a-4dac-9837-771277561d4d",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Have you had a new sexual contact within the last year?",
      concept: "310dfc81-617e-427e-b928-d9e0ad5afff9",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Do you have sexual contact with:",
      concept: "8d772ffd-e23d-449f-99b8-c4e1b04606f0",
      type: "radio",
      options: [
        { value: "b22bc3e2-1396-4951-8eed-7ec3cdeeaeb5", label: "Women" },
        { value: "03f86827-88a0-439c-bb49-75b06482ec3e", label: "Unwilling to Disclose" },
        { value: "b57d8835-8ecc-417f-9688-527416bec79d", label: "People of another gender" },
        { value: "a6782e04-cbe9-4b3a-8f6a-68004f4ea0ff", label: "None of the above" },
        { value: "7c304335-e497-4848-9bb0-c77490fc82cb", label: "Men" },
        { value: "8b6cfe3f-36b4-4e48-ab43-ef17b916befd", label: "Both men and women" }
      ]
    },
    {
      label: "Number of different people you’ve had sexual contact with in the last 12 months",
      concept: "d60da701-547c-47fe-8200-51154cccdd9b",
      type: "text",
    },
    {
      label: "Referred to facility for diagnosis and treatment",
      concept: "8ace784a-eaf4-4be2-ba97-555a7c3560fa",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Which facility",
      concept: "65e8488a-20d4-4fc8-b1ff-86962ac2de18",
      type: "text"
    },
    {
      label: "Comment of risk evaluation",
      concept: "c7d3ca22-51bd-42b4-9ffa-02ab275369c5",
      type: "text"
    }
  ];

  totalSteps!: number;
  sections!: { questions: ({ label: string; concept: string; type: string; options?: undefined; } | { label: string; concept: string; type: string; options: { value: string; label: string; }[]; })[]; formGroup: FormGroup<any>; }[];

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
    return this.stiForm.get('responses') as FormArray;
  }
  ngOnInit() {
    this.stiForm = this.fb.group({});
    this.secondFormGroup = this.fb.group({});
    this.visibleFields = {};

    

    this.sections = [
      { questions: this.questions, formGroup: this.stiForm },
      { questions: this.secondSection, formGroup: this.secondFormGroup },

    ];

    this.totalSteps = this.sections.length;
    this.sections.forEach((section) => {
      section.questions?.forEach((question) => {
        if (question.concept) {
          section.formGroup.addControl(question.concept, this.fb.control(''));
        }
      });
    });

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

    if (this.encounter) {
      this.populateForm();
    }

  }

  populateForm() {
    if (!this.encounter || !this.encounter.obs) {
      console.warn('Encounter or observations are missing, skipping form population.');
      return;
    }
  
    const responsesArray = this.stiForm.get('responses') as FormArray;
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


  onSelectionChange(value: any, concept: string) {
    this.selectedOptions[concept] = value;

    const index = this.questions.findIndex(q => q.concept === concept);
    if (index !== -1) {
      const responsesArray = this.stiForm.get('responses') as FormArray;
      responsesArray.at(index).setValue(value);
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

    if (!this.stiForm || !this.secondFormGroup) {
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

            return { concept: question.concept, value };
          }

          return null;
        })
        .filter(Boolean)
    };



    const obs = [
      ...extractObs(this.questions, this.stiForm),
      ...extractObs(this.secondSection, this.secondFormGroup),

    ];

    const payload = {
      patient: this.patientData.uuid,
      visit: this.visitType || null,
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