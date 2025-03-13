import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-behavioural-modal',
  templateUrl: './behavioural-modal.page.html',
  styleUrls: ['./behavioural-modal.page.scss'],
})
export class BehaviouralModalPage implements OnInit {
  behaviouralForm!: FormGroup;

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
  ]
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.behaviouralForm.get('responses') as FormArray;
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
  
    const payload = { obs };
  
    console.log('Payload to Save:', payload);
  
    const existingData = localStorage.getItem('screeningData');
    const dataArray = existingData ? JSON.parse(existingData) : [];
    dataArray.push(payload);
    localStorage.setItem('screeningData', JSON.stringify(dataArray));
  
    // ✅ Close the modal first, then navigate
    this.modalCtrl.dismiss().then(() => {
      this.router.navigate(['/behavioural']);
    });
  }
  

 
  ngOnInit() {

    this.behaviouralForm = this.fb.group({
      responses: this.fb.array(this.questions.map(() => this.fb.control('')))
    });
  }

}
