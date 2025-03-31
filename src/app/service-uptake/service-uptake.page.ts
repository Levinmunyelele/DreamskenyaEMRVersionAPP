import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-service-uptake',
  templateUrl: './service-uptake.page.html',
  styleUrls: ['./service-uptake.page.scss'],
})
export class ServiceUptakePage implements OnInit {

  uptakeForm!: FormGroup;


  questions = [

    {
      label: "Behavioural Intervention Type",
      concept: "6bc46b65-decf-42a4-8180-2ca75e01e99e",
      type: 'dropdown',
      options: [
        { value: '586ce4a3-3c60-4cea-ae75-017a938e4450', label: 'Health Choices for a Better Future (HCBF or Healthy Choices1)' },
        { value: '9623ae42-5342-4ff7-8686-bf7fc9b41c7d', label: 'My Health My Choice (MHMC or Healthy Choices2)' }
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
    {
      label: 'Intervention Type',
      concept: '7f2224c5-3585-4c4a-9484-8d519898bc69',
      type: 'dropdown',
      options: [
        { value: '1078840c-f428-40bb-ba8c-8d641ebaf3e1', label: 'Social Asset Building - Number of Sessions Attended' },
        { value: '9366a010-6aea-48e7-8a87-1c50403db1b7', label: 'Economic Strengthening - Financial Capabilities Training' }
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
    {
      label: 'Intervention Type',
      concept: 'df43457b-ef07-4dbd-83cf-1014b3241cb5',
      type: 'dropdown',
      options: [
        { value: '4ff0158e-c168-4cfc-8803-54b28b186bdb', label: 'Cash Transfer' },
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
  ];

  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {

    this.uptakeForm = this.fb.group({
      responses: this.fb.array(this.questions.map(() => this.fb.control('')))
    });


  }



  get responses(): FormArray {
    return this.uptakeForm.get('responses') as FormArray;
  }

  submitForm() {
    const obs = this.questions.map((question, index) => {
      const value = this.responses.at(index).value;
      if (question.type === 'dropdown') {
        return {
          concept: { uuid: question.concept },
          value: { uuid: value }
        };
      } else {
        return {
          concept: { uuid: question.concept },
          value: value
        };
      }
    });

    const payload = {
      obs
    };

    console.log('Payload to Save:', payload);

    const existingData = localStorage.getItem('screeningData');
    const dataArray = existingData ? JSON.parse(existingData) : [];
    dataArray.push(payload);
    localStorage.setItem('screeningData', JSON.stringify(dataArray));

    this.router.navigate(['/screened-agwy']);


  }

}
