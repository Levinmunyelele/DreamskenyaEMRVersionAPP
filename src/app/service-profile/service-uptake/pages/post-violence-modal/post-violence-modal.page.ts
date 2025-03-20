
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-violence-modal',
  templateUrl: './post-violence-modal.page.html',
  styleUrls: ['./post-violence-modal.page.scss'],
})
export class PostViolenceModalPage implements OnInit {
 postviolenceForm!: FormGroup;

  questions = [

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
  ]
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.postviolenceForm.get('responses') as FormArray;
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
      this.router.navigate(['/post-violence']);
    });
  }
  
 
  ngOnInit() {

    this.postviolenceForm = this.fb.group({
      responses: this.fb.array(this.questions.map(() => this.fb.control('')))
    });
  }

}





