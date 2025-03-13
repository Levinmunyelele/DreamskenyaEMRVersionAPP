import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-social-protection-modal',
  templateUrl: './social-protection-modal.page.html',
  styleUrls: ['./social-protection-modal.page.scss'],
})
export class SocialProtectionModalPage implements OnInit {
  socialForm!: FormGroup;

  questions = [

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
  ]
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.socialForm.get('responses') as FormArray;
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
  
    this.modalCtrl.dismiss().then(() => {
      this.router.navigate(['/other']);
    });
  }
  
 
  ngOnInit() {

    this.socialForm= this.fb.group({
      responses: this.fb.array(this.questions.map(() => this.fb.control('')))
    });
  }

}
