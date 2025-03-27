import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';

@Component({
  selector: 'app-home-visit',
  templateUrl: './home-visit.component.html',
  styleUrls: ['./home-visit.component.scss'],
})
export class HomeVisitComponent implements OnInit {
  homeForm!: FormGroup;
  secondFormGroup!: FormGroup;
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
      label: "Visit Date",
      concept: "bc454585-c0b4-4255-9f2f-0fba4e3b3eb3",
      type: "date",
    },
    {
      label: "Does the caretaker(s) look critically ill? (Check if bed ridden, looks very weak, underweight, sunken eyes, walks or talks with difficulty etc.)",
      concept: "dd858d91-e694-4ba5-b28b-02bf954a5438",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "If Yes describe",
      concept: "4b1bcf4b-e774-47ee-a76a-a3cd51fe1bc6",
      type: "text",
      dependsOn: 'dd858d91-e694-4ba5-b28b-02bf954a5438',

    },
    {
      label: "Is the AGYW living with any form of severe disability?",
      concept: "d96e29fb-e570-468a-b663-ecb0b34044c8",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "If yes, what is the AGYW form of Disability",
      concept: "f70ef553-6540-4b3d-8ae7-42bf04aa0a48",
      type: "radio",
      dependsOn: 'd96e29fb-e570-468a-b663-ecb0b34044c8',
      options: [
        { value: "159298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "visual impairment" },
        { value: "8653edd9-acc4-49f3-9b00-2115b5184a98", label: "Vision impairement" },
        { value: "42054469-301a-45fa-948e-a32c30e89e8f", label: "Speech impairment" },
        { value: "a91a7570-c598-46be-b2e3-3f41daff9b79", label: "Physical impairment" },
        { value: "6e85eec0-44ea-45e9-80aa-a39bf0e3c83c", label: "Mental impairment" },
        { value: "2c5e193a-4227-4f7e-9312-ece67be6c1ff", label: "Hearing impairment" }
      ]
    },
    {
      label: "Is the caregiver living with any form of severe disability?",
      concept: "e1efdc94-b8d0-41f2-a3d8-22c76d04a5e0",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "If yes, what is the caregiver form of Disability",
      concept: "c87cb0a7-58e0-4e97-acd7-c19d12275ae6",
      type: "radio",
      dependsOn: 'e1efdc94-b8d0-41f2-a3d8-22c76d04a5e0',
      options: [
        { value: "8653edd9-acc4-49f3-9b00-2115b5184a98", label: "Vision impairement" },
        { value: "42054469-301a-45fa-948e-a32c30e89e8f", label: "Speech impairment" },
        { value: "a91a7570-c598-46be-b2e3-3f41daff9b79", label: "Physical impairment" },
        { value: "6e85eec0-44ea-45e9-80aa-a39bf0e3c83c", label: "Mental impairment" },
        { value: "2c5e193a-4227-4f7e-9312-ece67be6c1ff", label: "Hearing impairment" }
      ]
    },
    {
      label: "Does the household have any stable source of income?",
      concept: "093fe678-9727-4c4e-b7a6-284b5d8a1fb5",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Is the AGYW out of school (find out if at home during the visit)",
      concept: "608ce3a2-eb82-461f-ae08-b84194a7b5d3",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "If Yes, Reason for not being in school:",
      concept: "56d07689-69ed-4a2c-800f-965dc0d5d22d",
      type: "radio",
      dependsOn: '608ce3a2-eb82-461f-ae08-b84194a7b5d3',
      options: [
        { value: "3403769e-1196-4bb4-abe9-e2d0d97f8ba1", label: "Pregnancy" },
        { value: "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Other" },
        { value: "90cca218-5de0-4a6e-99cf-4b47455c7006", label: "Lack of School Fees" },
        { value: "2d73a7da-2cbb-4d32-9441-e31e5a5a4547", label: "Awaiting to join Secondary" }
      ]
    },
    {
      label: "Does the AGYW have a child under her care?",
      concept: "53566fa5-275a-4c93-a6ee-1bf9ebba0eaa",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "If yes, how old is/are the child(ren);",
      concept: "bc79e670-6816-4aff-8e10-e4071f70322f",
      type: "number",
      dependsOn: '53566fa5-275a-4c93-a6ee-1bf9ebba0eaa',
    },
    {
      label: "Kindly state the Roofing materials of the house?",
      concept: "0c9fdcd9-9e38-409a-a124-b087cf6a1f5e",
      type: "radio",
      options: [
        { value: "48298b76-295d-4175-af87-63eed3f69e7c", label: "Tin cans" },
        { value: "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Other" },
        { value: "a1d3985d-d8a6-4a9c-ba2b-31a021d338b3", label: "Grass/thatch/makuti" },
        { value: "52c39dd2-bc61-4cf8-846d-b079d0943c22", label: "Corrugated iron sheet (Mabati)" }
      ]
    },
    {
      label: "Kindly state the Roofing materials of the house?",
      concept: "0c9fdcd9-9e38-409a-a124-b087cf6a1f5e",
      type: "radio",
      options: [
        { value: "48298b76-295d-4175-af87-63eed3f69e7c", label: "Tin cans" },
        { value: "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Other" },
        { value: "a1d3985d-d8a6-4a9c-ba2b-31a021d338b3", label: "Grass/thatch/makuti" },
        { value: "52c39dd2-bc61-4cf8-846d-b079d0943c22", label: "Corrugated iron sheet (Mabati)" }
      ]
    },
    {
      label: "Specify Roofing Material",
      concept: "387df7ae-be5f-4e68-b128-51b592145b98",
      type: "text",
    },
    {
      label: "Kindly state the Walling materials of the house?",
      concept: "fad7d7b5-cce4-4147-88a3-1576094d0417",
      type: "radio",
      options: [
        { value: "19a04063-50d2-4119-ab5e-8e5b656740a8", label: "Timber" },
        { value: "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Other" },
        { value: "c2dafc5f-5923-4df4-9b7a-4555ae535a55", label: "Mud" },
        { value: "0f4954b2-4e56-426d-b8ee-039d2b63532d", label: "Bricks/Block" }
      ]
    },
    {
      label: "Specify Walling Material",
      concept: "1a9bb428-771f-4247-967b-e9eedc975848",
      type: "text",
    },
    {
      label: " Kindly state the Floor materials of the house?",
      concept: "e549a9e0-b76d-45d6-8e4c-c4c5901afa84",
      type: "radio",
      options: [
        { value: "73d288df-926a-4f75-abd7-74b9c9fe4b06", label: "Wooden" },
        { value: "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Other" },
        { value: "2fbda376-ee33-4e61-b665-19d71eacd534", label: "Earth/Mud/Dung/Sand" },
        { value: "7830a961-472b-4f67-b378-f49ab1edfd08", label: "Ceramic tiles" },
        { value: "1943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Cement" }
      ]
    },
    {
      label: "Specify Floor Material",
      concept: "aa635988-510e-4c1e-a926-a45d462ee87c",
      type: "text",
    },
    {
      label: "Any other observable conditions of the house",
      concept: "337d8055-36ba-40dd-a165-a04da0eb15fc",
      type: "text",
    },
    {
      label: " In the last 1 month, how often do the members of the household miss food?",
      concept: "93f12558-13e7-4320-b204-1200c741868d",
      type: "radio",
      options: [
        { value: "1090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Never" },
        { value: "19b7cf5d-6e84-4e52-bb2d-3464a607061e", label: "More than 10 days" },
        { value: "608e1f5e-99ff-4fc7-881b-904608ec2a75", label: "3-10 days" },
        { value: "deb30896-451c-4b1c-9cf7-fb1f68e86636", label: "1-2 days" }
      ]
    },
    {
      label: "For continuing students, how often does the AGYW miss school due to school fees within a term?",
      concept: "b880cf90-3694-404b-b5fe-dcac0c13b5fb",
      type: "radio",
      options: [
        { value: "104549b1-f3e6-458d-a314-e3ba3f8876dd", label: "One Academic year" },
        { value: "7cb30772-7170-411c-81b7-3b6538002eb0", label: "One term" },
        { value: "883cc2f2-e214-45ad-a1bf-416d062352fb", label: "More than one academic year" },
        { value: "4978edd0-75ab-40a9-9c07-d4bbeb43fed5", label: "Month" }
      ]
    }
  ];
  secondSection = [
    {
      label: "Education support recommendation",
      concept: "174539c3-bdc1-4eeb-bdf0-5e824c61baf0",
      type: "radio",
      options: [
        { value: "54a07d9d-b760-496e-84b1-19e934d2ea75", label: "Does not deserve education support" },
        { value: "c3ba0c88-7086-4e50-a62e-5591e2229c06", label: "Deserves full education support" },
        { value: "bb2b35aa-4183-4a7b-81a0-76ec4dca6da0", label: "Deserve partial education support" }
      ]
    },
    {
      label: "Education recommendation justification",
      concept: "ce318fe8-b28f-4cb7-80a4-ef5a61c4f45e",
      type: "text",
    }
  ];

  totalSteps!: number;
  sections!: { questions: ({ label: string; concept: string; type: string; options?: undefined; } | { label: string; concept: string; type: string; options: { value: string; label: string; }[]; })[]; formGroup: FormGroup<any>; }[];

  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private encounterService: EncounterService,
    private navParams: NavParams,) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.homeForm.get('responses') as FormArray;
  }

  ngOnInit() {
    this.homeForm = this.fb.group({});
    this.secondFormGroup = this.fb.group({});
    this.visibleFields = {};

    this.questions.forEach((question) => {
      this.homeForm.addControl(question.concept, this.fb.control(''));

      if (question.dependsOn) {
        this.visibleFields[question.concept] = false;

        this.homeForm.get(question.dependsOn)?.valueChanges.subscribe((value) => {
          if (value === '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') {
            this.visibleFields[question.concept] = true;
            this.homeForm.get(question.concept)?.setValidators([Validators.required]);
          } else {
            this.visibleFields[question.concept] = false;
            this.homeForm.get(question.concept)?.clearValidators();
            this.homeForm.get(question.concept)?.setValue(null);
          }
          this.homeForm.get(question.concept)?.updateValueAndValidity();
        });
      }
    });

    this.sections = [
      { questions: this.questions, formGroup: this.homeForm },
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
  handleVisibility(question: any, event: any) {
    const selectedValue = event.detail.value;

    if (selectedValue === '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') {
      this.visibleFields[question.concept] = true;
      this.homeForm.get(question.concept)?.setValidators([Validators.required]);
    } else {
      if (!this.homeForm.get(question.concept)?.value) {
        this.visibleFields[question.concept] = false;
      }
      this.homeForm.get(question.concept)?.clearValidators();
    }

    this.homeForm.get(question.concept)?.updateValueAndValidity();
  }
  populateForm() {
    if (!this.encounter || !this.encounter.obs) {
      console.warn('Encounter or observations are missing, skipping form population.');
      return;
    }

    const obs = this.encounter.obs;

    obs.forEach((ob: any) => {
      this.sections.forEach((section) => {
        const question = section.questions?.find((q) => q.concept === ob.concept.uuid);
        if (question) {
          const control = section.formGroup.get(question.concept);
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

            // Handle visibility based on dependencies
            if ('dependsOn' in question && question.dependsOn) { // Type guard
              const dependencyControl = this.homeForm.get(question.dependsOn as string); // Explicit cast
              if (dependencyControl) {
                if (dependencyControl.value === '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') {
                  this.visibleFields[question.concept] = true;
                  control.setValidators([Validators.required]);
                } else {
                  this.visibleFields[question.concept] = false;
                  control.clearValidators();
                  control.setValue(null);
                }
                control.updateValueAndValidity();
              }
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

  onSelectionChange(value: any, concept: string) {
    this.selectedOptions[concept] = value;

    const index = this.questions.findIndex(q => q.concept === concept);
    if (index !== -1) {
      const responsesArray = this.homeForm.get('responses') as FormArray;
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

    if (!this.homeForm || !this.secondFormGroup) {
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
      ...extractObs(this.questions, this.homeForm),
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