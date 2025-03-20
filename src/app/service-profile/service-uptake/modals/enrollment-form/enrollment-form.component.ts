import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss'],
})
export class EnrollmentFormComponent implements OnInit {
  eduForm!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup! : FormGroup;
  forthFormGroup! : FormGroup
  currentStep = 1; 

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
    },
  ];
   secondSection = [
    {
      label: "Are you currently in school?",
      concept: "a5ca7874-f4c8-41fe-9b78-d3eb9b15d452",
      type: "checkbox",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "School name",
      concept: "fd6e0403-8db5-42f1-aac6-e936d9a1b392",
      type: "text"
    },
    {
      label: "Current school level (tick & indicate level)",
      concept: "391d62bd-3dbd-4eb1-ab04-5be4f8bb4528",
      type: "checkbox",
      options: [
        { value: "20da17a7-e343-4586-881f-37b01313e514", label: "Special needs school" },
        { value: "1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Secondary school education" },
        { value: "1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Primary school education" },
        { value: "bb43057a-ebb0-49ac-bf4f-7c4c4675c1a2", label: "Joining secondary school" }
      ]
    },
    { label: "Class/Grade", concept: "870b5b91-d74d-4631-81be-559321001c30", type: "text" },
    { label: "Form", concept: "217eabdd-a4e9-461c-9e37-01c4c4c1939b", type: "text" },
    {
      label: "Schooling Module",
      concept: "bf9561e0-605c-4b57-9ea2-b948ba1b1524",
      type: "checkbox",
      options: [
        { value: "e13262c8-b320-4e69-981f-39dda388526a", label: "Day school" },
        { value: "0f0cfda9-b609-48a5-aed7-70c5851c25a0", label: "Boarding school" }
      ]
    },
    {
      label: "School Fees",
      concept: "160107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      type: "checkbox",
      options: [
        { value: "57ee42ae-3dd7-4f09-815f-18511218dd1e", label: "Parent/Guardian Contribution" },
        { value: "197767f4-3e92-40c0-b786-0b2d1b1ecc7a", label: "Current fee balance" },
        { value: "a9bf4711-6e60-4014-84f3-3d42c7415172", label: "Annual Fees" }
      ]
    },
    { label: "Annual Fees", concept: "a9bf4711-6e60-4014-84f3-3d42c7415172", type: "text" },
    { label: "Current Fee Balance", concept: "197767f4-3e92-40c0-b786-0b2d1b1ecc7a", type: "text" },
  { label: "Parent/Guardian Contribution", concept: "57ee42ae-3dd7-4f09-815f-18511218dd1e", type: "text" },
  {
    label: "Are you currently benefitting from another bursary/scholarship",
    concept: "0216de68-81dd-4fc1-ad17-2cb5d5bf9d21",
    type: "checkbox",
    options: [
      { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
      { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
    ]
  },
  { label: "Name of the Program/Fund", concept: "3c559b03-2ae6-446f-a43e-2ceb172bc113", type: "text" },
  { label: "Value of Support", concept: "7ba4beb6-8555-41cf-8c07-167d7e513fb4", type: "text" },
  {
    label: "Main Reason for Not Attending School",
    concept: "d80497d8-9441-4792-9f31-abbe9dda07ca",
    type: "checkbox",
    options: [
      { value: "3403769e-1196-4bb4-abe9-e2d0d97f8ba1", label: "Pregnancy" },
      { value: "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Other" },
      { value: "90cca218-5de0-4a6e-99cf-4b47455c7006", label: "Lack of School Fees" },
      { value: "2d73a7da-2cbb-4d32-9441-e31e5a5a4547", label: "Awaiting to Join Secondary" }
    ]
  },
  { label: "Specify Other Reasons for Not Attending School", concept: "d59aa3e3-c16e-4bdd-acb7-183b57bf18a3", type: "text" },
  {
    label: "How Long Have You Been Out of School?",
    concept: "9a16c3bf-a92a-466c-967c-4ccb5660518d",
    type: "checkbox",
    options: [
      { value: "7cb30772-7170-411c-81b7-3b6538002eb0", label: "One Term" },
      { value: "104549b1-f3e6-458d-a314-e3ba3f8876dd", label: "One Academic Year" },
      { value: "4978edd0-75ab-40a9-9c07-d4bbeb43fed5", label: "One Month" }
    ]
  }

  ];
  thirdSection= [
    {
      label: "Is the household child headed (<18 Yrs)",
      concept: "583f0193-cc8d-4f58-b07c-e9306e3e9c96",
      type: "checkbox",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Orphan Status",
      concept: "3698f6fa-9ddd-40ee-8273-5ceb03368d22",
      type: "checkbox",
      options: [
        { "value": "ba5185ad-1f63-4dca-a8dc-c008b9043dbe", label: "Total orphan" },
        { "value": "a18a83e3-3db7-43d1-b390-cdb1035e7cfe", label: "Partial orphan" },
        { "value": "b01c0f51-694b-4cad-be4d-7452c4cc77e4", label: "N/A" }
      ]
    },
    {
      label: "Caregiver Chronically ill",
      concept: "11a6008f-4a8b-46b8-8ef4-de29815cf6ed",
      type: "checkbox",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Caregiver is elderly (>65 Yrs)",
      concept: "1c1bea3a-5e23-4268-a71c-7f71f4b4d4a4",
      type: "checkbox",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Is AGYW disabled?",
      concept: "5b8b41b5-b125-4ad0-8565-b19cca8ce38c",
      type: "checkbox",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "AGYW disability Type (Specify)",
      concept: "7839ac04-1cb3-4651-9036-6285947aba8b",
      type: "checkbox",
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
      type: "checkbox",
      options: [
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Caregiver disability type(Specify)",
      concept: "46164a17-5f3c-4568-accc-420bd1adbb37",
      type: "checkbox",
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
      type: "checkbox",
      options: [
        { "value": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { "value": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "HHs has gone without food (full day) in the past one month",
      concept: "261aee19-10d6-4e08-bd6f-13a4269bd37f",
      type: "checkbox",
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
      type: "checkbox",
      options: [
        { "value": "3e1fff2e-0deb-4954-8c43-d5a2b6e13a5d", label: "Not Approved" },
        { "value": "162478AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Approved" }
      ]
    },
    {
      label: "Reasons for non approval",
      concept: "982d9f3c-9053-40ce-97de-5799661ff217",
      type: "text"
    },
    {
      label: "Education support approved",
      concept: "bb09b6fb-61ca-43f6-9f29-c341e13a6f76",
      type: "checkbox",
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
      type: "text"
    },
    {
      label: "Date of Approval",
      concept: "358ca772-b6ac-48bd-a53d-94bc3ce1e1e3",
      type: "date"
    },
    {
      label: "Date of Disbursement",
      concept: "7f850b59-83a4-45d2-9fdb-ecae9db8994f",
      type: "date"
    }
  ]

  totalSteps!: number;
  sections!: { questions: ({ label: string; concept: string; type: string; options?: undefined; } | { label: string; concept: string; type: string; options: { value: string; label: string; }[]; })[]; formGroup: FormGroup<any>; }[];

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private router: Router) { }

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
  
    this.sections = [
      { questions: this.questions, formGroup: this.eduForm },
      { questions: this.secondSection, formGroup: this.secondFormGroup },
      { questions: this.thirdSection, formGroup: this.thirdFormGroup },
      { questions: this.forthSection, formGroup: this.forthFormGroup },

    ];
    this.totalSteps = this.sections.length;
  
    this.sections.forEach(({ questions, formGroup }) => {
      questions.forEach((question) => {
        if (question.type === "checkbox") {
          formGroup.addControl(question.concept, this.fb.control([]));
        } else {
          formGroup.addControl(question.concept, this.fb.control(""));
        }
      });
    });
  }
  
  

  onCheckboxChange(event: any, controlName: string) {
    let selectedValues = this.eduForm.get(controlName)?.value || [];
    if (event.target.checked) {
      selectedValues.push(event.target.value);
    } else {
      selectedValues = selectedValues.filter((v: any) => v !== event.target.value);
    }
    this.eduForm.get(controlName)?.setValue(selectedValues);
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
    console.log("First Form Data:", this.eduForm.value);
    console.log("Second Form Data:", this.secondFormGroup.value);
  }
}