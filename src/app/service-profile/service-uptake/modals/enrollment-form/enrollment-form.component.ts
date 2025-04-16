import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';


@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss'],
})
export class EnrollmentFormComponent implements OnInit {
  eduForm!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  forthFormGroup!: FormGroup
  activeVisit: any;
  currentStep = 1;
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  selectedOptions: { [key: string]: any } = {};
  @Input() encounter: any;
  location: any;
  patientUuid: any;


  questions = [
    {
      label: "Date of application (DD/MM/YYYY):",
      concept: "cdb4aa46-663c-40d1-874b-cd8c6c0ab5a2",
      type: "date",
    },
    {
      label: "Type of support required",
      concept: "1efcfd9f-e3c4-4fba-adc1-4d783b45d177",
      type: "checkbox",
      options: [
        { value: "160107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "School fees" },
        { value: "4111439e-a8ca-4071-ae93-f8139c0576b8", label: "Other learning materials" },
        { value: "aec956a6-a721-4ddd-b706-9b1777b17424", label: "Education Support - Uniform" },
        { value: "6b99e5fa-463b-4c2f-98fb-6ea06121c401", label: "Education Support - Stationery" },
        { value: "6c40f205-f3f8-4d28-9f4e-982677841e6f", label: "Education Support - Dignity pack" }
      ]
    },
    {
      label: "Other learning materials (Specify)",
      concept: "3ac4378d-46ee-43d2-9d10-022ff457bfcd",
      type: "text",
      dependsOn: '1efcfd9f-e3c4-4fba-adc1-4d783b45d177',
      showIf: ["4111439e-a8ca-4071-ae93-f8139c0576b8"],

    },
  ];
  secondSection = [
    {
      label: "Are you currently in school?",
      concept: "a5ca7874-f4c8-41fe-9b78-d3eb9b15d452",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "School name",
      concept: "fd6e0403-8db5-42f1-aac6-e936d9a1b392",
      type: "text",
      dependsOn: 'a5ca7874-f4c8-41fe-9b78-d3eb9b15d452',
      showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"]

    },
    {
      label: "Current school level (tick & indicate level)",
      concept: "391d62bd-3dbd-4eb1-ab04-5be4f8bb4528",
      type: "radio",
      dependsOn: 'a5ca7874-f4c8-41fe-9b78-d3eb9b15d452',
      showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
      options: [
        { value: "20da17a7-e343-4586-881f-37b01313e514", label: "Special needs school" },
        { value: "1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Secondary school education" },
        { value: "1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Primary school education" },
        { value: "bb43057a-ebb0-49ac-bf4f-7c4c4675c1a2", label: "Joining secondary school" }
      ]
    },
    {
      label: "Class/Grade",
      concept: "870b5b91-d74d-4631-81be-559321001c30",
      type: "number",
      dependsOn: '391d62bd-3dbd-4eb1-ab04-5be4f8bb4528',
      showIf: ["1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
    },
    {
      label: "Form",
      concept: "217eabdd-a4e9-461c-9e37-01c4c4c1939b",
      type: "text",
      dependsOn: '391d62bd-3dbd-4eb1-ab04-5be4f8bb4528',
      showIf: ["1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
    },
    {
      label: "Schooling Module",
      concept: "bf9561e0-605c-4b57-9ea2-b948ba1b1524",
      type: "radio",
      dependsOn: 'a5ca7874-f4c8-41fe-9b78-d3eb9b15d452',
      showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
      options: [
        { value: "e13262c8-b320-4e69-981f-39dda388526a", label: "Day school" },
        { value: "0f0cfda9-b609-48a5-aed7-70c5851c25a0", label: "Boarding school" }
      ]
    },
    {
      label: "School Fees",
      concept: "160107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      type: "radio",
      dependsOn: 'a5ca7874-f4c8-41fe-9b78-d3eb9b15d452',
      showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"], // Show if "Yes"
      options: [
        { value: "57ee42ae-3dd7-4f09-815f-18511218dd1e", label: "Parent/Guardian Contribution" },
        { value: "197767f4-3e92-40c0-b786-0b2d1b1ecc7a", label: "Current fee balance" },
        { value: "a9bf4711-6e60-4014-84f3-3d42c7415172", label: "Annual Fees" }
      ]
    },
    {
      label: "Annual Fees",
      concept: "a9bf4711-6e60-4014-84f3-3d42c7415172",
      type: "text",
      dependsOn: '160107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // Depends on "School Fees"
      showIf: ["a9bf4711-6e60-4014-84f3-3d42c7415172"], // Show if "Annual Fees" is selected
    },
    {
      label: "Current Fee Balance",
      concept: "197767f4-3e92-40c0-b786-0b2d1b1ecc7a",
      type: "text",
      dependsOn: '160107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // Depends on "School Fees"
      showIf: ["197767f4-3e92-40c0-b786-0b2d1b1ecc7a"],
    },
    {
      label: "Parent/Guardian Contribution",
      concept: "57ee42ae-3dd7-4f09-815f-18511218dd1e",
      type: "number",
      dependsOn: '160107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      showIf: ["57ee42ae-3dd7-4f09-815f-18511218dd1e"],
    },
    {
      label: "Are you currently benefitting from another bursary/scholarship",
      concept: "0216de68-81dd-4fc1-ad17-2cb5d5bf9d21",
      type: "radio",
      dependsOn: 'a5ca7874-f4c8-41fe-9b78-d3eb9b15d452',
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Name of the Program/Fund", concept: "3c559b03-2ae6-446f-a43e-2ceb172bc113", type: "text", dependsOn: '0216de68-81dd-4fc1-ad17-2cb5d5bf9d21', showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
    },
    {
      label: "Value of Support", concept: "7ba4beb6-8555-41cf-8c07-167d7e513fb4", type: "number", dependsOn: "0216de68-81dd-4fc1-ad17-2cb5d5bf9d21",
      showIf: ["1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"]
    },
    {
      label: "Main Reason for Not Attending School",
      concept: "d80497d8-9441-4792-9f31-abbe9dda07ca",
      type: "radio",
      dependsOn: 'a5ca7874-f4c8-41fe-9b78-d3eb9b15d452',
      showIf: ["1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
      options: [
        { value: "3403769e-1196-4bb4-abe9-e2d0d97f8ba1", label: "Pregnancy" },
        { value: "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Other" },
        { value: "90cca218-5de0-4a6e-99cf-4b47455c7006", label: "Lack of School Fees" },
        { value: "2d73a7da-2cbb-4d32-9441-e31e5a5a4547", label: "Awaiting to Join Secondary" }
      ]
    },
    {
      label: "Specify Other Reasons for Not Attending School",
      concept: "d59aa3e3-c16e-4bdd-acb7-183b57bf18a3",
      type: "text",
      dependsOn: 'd80497d8-9441-4792-9f31-abbe9dda07ca',
      showIf: ["5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
    },

    {
      label: "How Long Have You Been Out of School?",
      concept: "9a16c3bf-a92a-466c-967c-4ccb5660518d",
      type: "radio",
      dependsOn: 'a5ca7874-f4c8-41fe-9b78-d3eb9b15d452',
      showIf: ["1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
      options: [
        { value: "7cb30772-7170-411c-81b7-3b6538002eb0", label: "One Term" },
        { value: "104549b1-f3e6-458d-a314-e3ba3f8876dd", label: "One Academic Year" },
        { value: "4978edd0-75ab-40a9-9c07-d4bbeb43fed5", label: "One Month" }
      ]
    }

  ];
  thirdSection = [
    {
      label: "Is the household child headed (<18 Yrs)",
      concept: "583f0193-cc8d-4f58-b07c-e9306e3e9c96",
      type: "radio",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Orphan Status",
      concept: "3698f6fa-9ddd-40ee-8273-5ceb03368d22",
      type: "radio",
      options: [
        { "value": "ba5185ad-1f63-4dca-a8dc-c008b9043dbe", label: "Total orphan" },
        { "value": "a18a83e3-3db7-43d1-b390-cdb1035e7cfe", label: "Partial orphan" },
        { "value": "b01c0f51-694b-4cad-be4d-7452c4cc77e4", label: "N/A" }
      ]
    },
    {
      label: "Caregiver Chronically ill",
      concept: "11a6008f-4a8b-46b8-8ef4-de29815cf6ed",
      type: "radio",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Caregiver is elderly (>65 Yrs)",
      concept: "1c1bea3a-5e23-4268-a71c-7f71f4b4d4a4",
      type: "radio",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Is AGYW disabled?",
      concept: "5b8b41b5-b125-4ad0-8565-b19cca8ce38c",
      type: "radio",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "AGYW disability Type (Specify)",
      concept: "7839ac04-1cb3-4651-9036-6285947aba8b",
      type: "radio",
      dependsOn: '5b8b41b5-b125-4ad0-8565-b19cca8ce38c',
      options: [
        { "value": "8653edd9-acc4-49f3-9b00-2115b5184a98", label: "Vision impairement" },
        { "value": "42054469-301a-45fa-948e-a32c30e89e8f", label: "Speech impairment" },
        { "value": "a91a7570-c598-46be-b2e3-3f41daff9b79", label: "Physical impairment" },
        { "value": "6e85eec0-44ea-45e9-80aa-a39bf0e3c83c", label: "Mental impairment" },
        { "value": "2c5e193a-4227-4f7e-9312-ece67be6c1ff", label: "Hearing impairment" }
      ]
    },
    {
      label: "Is caregiver disabled?",
      concept: "84fd6dd2-4537-4f9a-8601-87938c67b2c0",
      type: "radio",
      options: [
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Caregiver disability type(Specify)",
      concept: "46164a17-5f3c-4568-accc-420bd1adbb37",
      type: "radio",
      dependsOn: '84fd6dd2-4537-4f9a-8601-87938c67b2c0',
      options: [
        { "value": "8653edd9-acc4-49f3-9b00-2115b5184a98", label: "Vision impairement" },
        { "value": "42054469-301a-45fa-948e-a32c30e89e8f", label: "Speech impairment" },
        { "value": "a91a7570-c598-46be-b2e3-3f41daff9b79", label: "Physical impairment" },
        { "value": "6e85eec0-44ea-45e9-80aa-a39bf0e3c83c", label: "Mental impairment" },
        { "value": "2c5e193a-4227-4f7e-9312-ece67be6c1ff", label: "Hearing impairment" }
      ]
    },
    {
      label: "Is AGYW a minor mother (<21 Yrs)",
      concept: "8b1fa581-b750-48bc-a774-023e46688d23",
      type: "radio",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "HHs has gone without food (full day) in the past one month",
      concept: "261aee19-10d6-4e08-bd6f-13a4269bd37f",
      type: "radio",
      options: [
        { "value": "1090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Never" },
        { "value": "19b7cf5d-6e84-4e52-bb2d-3464a607061e", label: "More than 10 days" },
        { "value": "608e1f5e-99ff-4fc7-881b-904608ec2a75", label: "3-10 days" },
        { "value": "deb30896-451c-4b1c-9cf7-fb1f68e86636", label: "1-2 days" }
      ]
    },
    {
      label: "Family situation/vulnerability (type your observations here)",
      concept: "d7bcecce-ce45-4c5c-a65e-417e22eda381",
      type: "text"
    }
  ];

  forthSection = [
    {
      label: "Education Subsidy Application Status",
      concept: "fbf6b09b-d48c-410e-a4b5-5673b89e4749",
      type: "radio",
      options: [
        { "value": "3e1fff2e-0deb-4954-8c43-d5a2b6e13a5d", label: "Not Approved" },
        { "value": "162478AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Approved" }
      ]
    },
    {
      label: "Reasons for non approval",
      concept: "982d9f3c-9053-40ce-97de-5799661ff217",
      type: "text",
      dependsOn: 'fbf6b09b-d48c-410e-a4b5-5673b89e4749',
      showIf: ["3e1fff2e-0deb-4954-8c43-d5a2b6e13a5d"],

    },
    {
      label: "Education support approved",
      concept: "bb09b6fb-61ca-43f6-9f29-c341e13a6f76",
      type: "checkbox",
      dependsOn: 'fbf6b09b-d48c-410e-a4b5-5673b89e4749',
      showIf: ["162478AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
      options: [
        { "value": "160107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "School fees" },
        { "value": "4111439e-a8ca-4071-ae93-f8139c0576b8", label: "Other learning materials" },
        { "value": "aec956a6-a721-4ddd-b706-9b1777b17424", label: "Education Support - Uniform" },
        { "value": "6b99e5fa-463b-4c2f-98fb-6ea06121c401", label: "Education Support - Stationery" },
        { "value": "6c40f205-f3f8-4d28-9f4e-982677841e6f", label: "Education Support - Dignity pack" }
      ]
    },
    {
      label: "Amount/Quantity of support",
      concept: "f51ed841-34c0-4349-ba09-af745441710f",
      type: "number",
      dependsOn: 'fbf6b09b-d48c-410e-a4b5-5673b89e4749',
      showIf: ["162478AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],

    },
    {
      label: "Date of Approval",
      concept: "358ca772-b6ac-48bd-a53d-94bc3ce1e1e3",
      type: "date",
      dependsOn: 'fbf6b09b-d48c-410e-a4b5-5673b89e4749',
      showIf: ["162478AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],

    },
    {
      label: "Date of Disbursement",
      concept: "7f850b59-83a4-45d2-9fdb-ecae9db8994f",
      type: "date",
      dependsOn: 'fbf6b09b-d48c-410e-a4b5-5673b89e4749',
      showIf: ["162478AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],


    }
  ]

  totalSteps!: number;
  sections!: { questions: ({ label: string; concept: string; type: string; options?: undefined; } | { label: string; concept: string; type: string; options: { value: string; label: string; }[]; })[]; formGroup: FormGroup<any>; }[];
  visibleFields: { [key: string]: boolean } = {};

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
    return this.eduForm.get('responses') as FormArray;
  }

  ngOnInit() {
    this.eduForm = this.fb.group({});
    this.secondFormGroup = this.fb.group({});
    this.thirdFormGroup = this.fb.group({});
    this.forthFormGroup = this.fb.group({});

    this.visibleFields = {};

    const processQuestions = (questions: any[], formGroup: FormGroup<any>) => {

      questions.forEach((question) => {

        formGroup.addControl(question.concept, this.fb.control(''));
        if (question.dependsOn) {
          this.visibleFields[question.concept] = false;
          const updateVisibility = (dependencyValue: any) => {
            let shouldShow = false;
            if (question.showIf && question.showIf.includes(dependencyValue)) {

              shouldShow = true;

            }
            this.visibleFields[question.concept] = shouldShow;

            if (shouldShow) {

              formGroup.get(question.concept)?.setValidators([Validators.required]);

            } else {

              formGroup.get(question.concept)?.clearValidators();

              formGroup.get(question.concept)?.setValue(null);

            }

            formGroup.get(question.concept)?.updateValueAndValidity();

          };

          const initialDependencyValue = formGroup.get(question.dependsOn)?.value;

          if (initialDependencyValue !== undefined && initialDependencyValue !== null) {

            updateVisibility(initialDependencyValue);

          }
          formGroup.get(question.dependsOn)?.valueChanges.subscribe(updateVisibility);

        }

      });

    };
    processQuestions(this.questions, this.eduForm);
    processQuestions(this.secondSection, this.secondFormGroup);
    processQuestions(this.thirdSection, this.thirdFormGroup);
    processQuestions(this.forthSection, this.forthFormGroup);
    this.forthSection.forEach((question) => {

      if (question.dependsOn) {

        const initialDependencyValue = this.forthFormGroup.get(question.dependsOn)?.value;

        if (initialDependencyValue !== undefined && initialDependencyValue !== null) {


          const dependencyQuestion = this.forthSection.find(q => q.concept === question.dependsOn);

          if (dependencyQuestion) {

            this.handleVisibility({ concept: question.concept, showIf: question.showIf }, { detail: { value: initialDependencyValue } }, this.forthFormGroup);

          }

        }

      }

    });


    this.sections = [

      { questions: this.questions, formGroup: this.eduForm },

      { questions: this.secondSection, formGroup: this.secondFormGroup },

      { questions: this.thirdSection, formGroup: this.thirdFormGroup },

      { questions: this.forthSection, formGroup: this.forthFormGroup },

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
              const option = question.options.find((opt) =>
                opt.label.toLowerCase().trim() === value.toLowerCase().trim()
              );
              if (option) {
                control.setValue(option.value);
              }
            } else if (question.type === 'date' || question.type === 'text') {
              control.setValue(value);
            } else if (question.type === 'checkbox' && Array.isArray(question.options)) {
              const selectedValues = value.split(',').map(v => v.toLowerCase().trim());
              const formArray = control as FormArray;
  
              question.options.forEach(option => {
                if (selectedValues.includes(option.label.toLowerCase().trim())) {
                  if (!formArray.value.includes(option.value)) {
                    formArray.push(this.fb.control(option.value));
                  }
                }
              });
            } else {
              control.setValue(value);
            }
  
            if ('dependsOn' in question && question.dependsOn) {
              const dependencyControl = section.formGroup.get(question.dependsOn as string);
              if (dependencyControl) {
                if ('showIf' in question && question.showIf !== null && question.showIf !== undefined && Array.isArray(question.showIf)) {
                  try {
                    if (question.showIf.map(item => item.toLowerCase().trim()).includes(dependencyControl.value.toString().toLowerCase().trim())) {
                      this.visibleFields[question.concept] = true;
                      control.setValidators([Validators.required]);
                    } else {
                      this.visibleFields[question.concept] = false;
                      control.clearValidators();
                      control.setValue(null);
                    }
                  } catch (e) {
                    console.error("Error checking showIf:", e);
                    this.visibleFields[question.concept] = false;
                    control.clearValidators();
                    control.setValue(null);
                  }
                  control.updateValueAndValidity();
                } else {
                  this.visibleFields[question.concept] = false;
                  control.clearValidators();
                  control.setValue(null);
                  control.updateValueAndValidity();
                }
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

  handleVisibility(question: any, event: any, formGroup: FormGroup) {
    const selectedValue = event.detail.value;
    let shouldShow = false;
    if (question.showIf && question.showIf.includes(selectedValue)) {
      shouldShow = true;
    }
    this.visibleFields[question.concept] = shouldShow;
    if (shouldShow) {

      formGroup.get(question.concept)?.setValidators([Validators.required]);

    } else {

      if (!formGroup.get(question.concept)?.value) {
        this.visibleFields[question.concept] = false;
      }
      formGroup.get(question.concept)?.clearValidators();

    }
    formGroup.get(question.concept)?.updateValueAndValidity();

  }
  onSelectionChange(value: any, concept: string) {
    this.selectedOptions[concept] = value;

    const index = this.questions.findIndex(q => q.concept === concept);
    if (index !== -1) {
      const responsesArray = this.eduForm.get('responses') as FormArray;
      responsesArray.at(index).setValue(value);
    }
  }

  onCheckboxChange(event: any, concept: string, value: string): void {
    const isChecked = event.detail.checked;

    let targetFormGroup: FormGroup | undefined = this.eduForm.contains(concept)
      ? this.eduForm
      : this.forthFormGroup.contains(concept)
        ? this.forthFormGroup
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

  submitForm() {
    if (!this.patientData) {
      console.error('Patient data is missing');
      return;
    }
  
    if (!this.questions || !this.secondSection || !this.thirdSection || !this.forthSection) {
      console.warn('One or more question sections are missing, skipping form submission.');
      return;
    }
  
    if (!this.eduForm || !this.secondFormGroup || !this.thirdFormGroup || !this.forthFormGroup) {
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
      ...extractObs(this.questions, this.eduForm),
      ...extractObs(this.secondSection, this.secondFormGroup),
      ...extractObs(this.thirdSection, this.thirdFormGroup),
      ...extractObs(this.forthSection, this.forthFormGroup)
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
      form: this.form || '68f03464-e4cf-4336-b264-e3d43f1f123c',
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