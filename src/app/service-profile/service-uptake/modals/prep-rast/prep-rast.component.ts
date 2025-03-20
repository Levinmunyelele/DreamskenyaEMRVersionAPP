import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prep-rast',
  templateUrl: './prep-rast.component.html',
  styleUrls: ['./prep-rast.component.scss'],
})
export class PrepRastComponent  implements OnInit {

  prepForm!: FormGroup;


  questions = [
    {
      label: "Intervention Date",
      concept: "bc454585-c0b4-4255-9f2f-0fba4e3b3eb3",
      type: "date",
  },
  {
      label: "What is your HIV status?",
      concept: "179bb083-6f5d-4610-bee0-afe2de78f10f",
      type: "checkbox",
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
      type: "checkbox",
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
      type: "checkbox",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "In the past 6 months have you engaged in sex in exchange of money or other favors?",
      concept: "c6a3d529-12fa-4024-9e65-9a5eccad3861",
      type: "checkbox",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "In the past 6 months have you been diagnosed with or treated for an STI?",
      concept: "f41ffdc9-dca4-4460-97af-b09152e3085d",
      type: "checkbox",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "In the past 6 months have you shared needles while engaging in intravenous drug use?",
      concept: "a0277e58-2fa9-4eb4-ac75-516f6d6f1095",
      type: "checkbox",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "In the past 6 months have you been forced to have sex against your will or physically assaulted including assault by your sexual partner(s)?",
      concept: "d045491a-cd09-4f10-9659-c4dc63141e20",
      type: "checkbox",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "Have you used post exposure prophylaxis (PEP) two times or more?",
      concept: "91cd943f-4246-4df9-af89-181f173df1c0",
      type: "checkbox",
      options: [
          { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
          { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
  },
  {
      label: "Refer the client for further PrEP assessment at the health facility (Remarks):",
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

constructor(private modalCtrl: ModalController, private fb: FormBuilder, private router: Router) { }

closeModal() {
  this.modalCtrl.dismiss();
}

get responses(): FormArray {
  return this.prepForm.get('responses') as FormArray;
}

ngOnInit() {
  this.prepForm= this.fb.group({});


  
}



onCheckboxChange(event: any, controlName: string) {
  let selectedValues = this.prepForm.get(controlName)?.value || [];
  if (event.target.checked) {
    selectedValues.push(event.target.value);
  } else {
    selectedValues = selectedValues.filter((v: any) => v !== event.target.value);
  }
  this.prepForm.get(controlName)?.setValue(selectedValues);
}



submitForm() {
  console.log("First Form Data:", this.prepForm.value);
}
}