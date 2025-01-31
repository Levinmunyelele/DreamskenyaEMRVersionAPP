import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  attributes: any[] = [];
  personForm: FormGroup;


  constructor(private personService: PersonService, private fb: FormBuilder) {
    this.personForm = this.fb.group({});

  }

  ngOnInit() {
    this.loadPersonAttributes();
  }

  loadPersonAttributes() {
    this.personService.getPersonAttributeTypes().subscribe(
      (response) => {
        if (response && response.results) {
          this.attributes = response.results;
  
          const formControls: { [key: string]: any } = {};
          this.attributes.forEach(attr => {
            formControls[attr.display] = ['']; 
          });
  
          this.personForm = this.fb.group(formControls);
        }
      },
      (error) => console.error('Failed to load attributes', error)
    );
  }
  

  savePersonData() {
    const personData = this.personForm.value;
    console.log('Form Data:', personData);

    this.personService.sendPersonData(personData).subscribe(
      (response) => console.log('Data saved successfully', response),
      (error) => console.error('Error saving person data', error)
    );
  }
}