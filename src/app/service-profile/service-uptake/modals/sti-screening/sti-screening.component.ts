import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sti-screening',
  templateUrl: './sti-screening.component.html',
  styleUrls: ['./sti-screening.component.scss'],
})
export class StiScreeningComponent  implements OnInit {

  stiForm!: FormGroup;
  secondFormGroup!: FormGroup;
  
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
      type: "checkbox",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Do you have sore(s) or a rash on penis, vagina, bottom, or body?",
      concept: "88032e0e-be08-4b70-8593-dbea17c6c605",
      type: "checkbox",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Do you have pain/discomfort in lower tummy, bottom, or genital area?",
      concept: "b21d8ed9-d37d-4017-a8c8-c91ff81295af",
      type: "checkbox",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Do you have pain/discomfort when passing urine (peeing)?",
      concept: "b523a145-97f8-43fb-b3ca-312eb2cdd26a",
      type: "checkbox",
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
      type: "checkbox",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Has a sexual contact told you they’ve been treated for an STI (Sexually Transmitted infection)?",
      concept: "3ca4897e-739a-4dac-9837-771277561d4d",
      type: "checkbox",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Have you had a new sexual contact within the last year?",
      concept: "310dfc81-617e-427e-b928-d9e0ad5afff9",
      type: "checkbox",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Do you have sexual contact with:",
      concept: "8d772ffd-e23d-449f-99b8-c4e1b04606f0",
      type: "checkbox",
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
      type: "checkbox",
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

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private router: Router) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.stiForm.get('responses') as FormArray;
  }

  ngOnInit() {
    this.stiForm = this.fb.group({});
    this.secondFormGroup = this.fb.group({});
    
  
    this.sections = [
      { questions: this.questions, formGroup: this.stiForm },
      { questions: this.secondSection, formGroup: this.secondFormGroup },
     

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
    let checkboxedValues = this.stiForm.get(controlName)?.value || [];
    if (event.target.checked) {
      checkboxedValues.push(event.target.value);
    } else {
      checkboxedValues = checkboxedValues.filter((v: any) => v !== event.target.value);
    }
    this.stiForm.get(controlName)?.setValue(checkboxedValues);
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
    console.log("First Form Data:", this.stiForm.value);
    console.log("Second Form Data:", this.secondFormGroup.value);
  }
}