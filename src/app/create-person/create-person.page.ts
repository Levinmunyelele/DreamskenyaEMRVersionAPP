import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
})
export class CreatePersonPage implements OnInit {

  personForm: FormGroup = this.fb.group({
    givenName: ['', Validators.required],
    familyName: ['', Validators.required],
    gender: ['', Validators.required],
    birthdate: ['', Validators.required],
    address1: ['', Validators.required],
    cityVillage: ['', Validators.required],
    postalCode: ['', Validators.required],
    countyDistrict: ['', Validators.required],
    stateProvince: ['', Validators.required],
    address4: ['', Validators.required]  

  });

  createdPeople: any[] = [];
  responseData: any;  
  selectedPersonId: any;

  constructor(private fb: FormBuilder, private personService: PersonService) {}

  ngOnInit() {
    const storedPeople = localStorage.getItem('createdPeople');
    if (storedPeople) {
      this.createdPeople = JSON.parse(storedPeople);
    }
  }
  
  editPerson(uuid: string) {
    const personToEdit = this.createdPeople.find(person => person.uuid === uuid);
  
    if (personToEdit) {
      console.log('Editing Person:', personToEdit);
  
      this.personForm.patchValue({
        givenName: personToEdit.givenName,
        familyName: personToEdit.familyName,
        gender: personToEdit.gender,
        birthdate: personToEdit.birthdate,
        address1: personToEdit.address1,
        cityVillage: personToEdit.cityVillage,
        postalCode: personToEdit.postalCode,
        countyDistrict: personToEdit.countyDistrict,
        stateProvince: personToEdit.stateProvince,
        address4: personToEdit.address4
      });
  
      this.selectedPersonId = uuid;
  
    } else {
      console.error('Person not found for editing');
    }
  }  

  submitData() {
    if (this.personForm.valid) {
      const payload = {
        names: [
          {
            givenName: this.personForm.value.givenName,
            familyName: this.personForm.value.familyName,
          },
        ],
        gender: this.personForm.value.gender,
        birthdate: this.personForm.value.birthdate,
        addresses: [
          {
            address1: this.personForm.value.address1,
            cityVillage: this.personForm.value.cityVillage,
            postalCode: this.personForm.value.postalCode,
            countyDistrict: this.personForm.value.countyDistrict,
            stateProvince: this.personForm.value.stateProvince,
            address4: this.personForm.value.address4,
          },
        ],
      };
  
      if (this.selectedPersonId) {
        this.personService.updatePerson(this.selectedPersonId, payload).subscribe(
          (response) => {
            console.log('Updated person:', response);
  
            const fullName = response.preferredName?.display || '';
            const [givenName, ...rest] = fullName.split(' ');
            const familyName = rest.join(' ');
  
            const personData = {
              givenName,
              familyName,
              gender: response.gender,
            };
  
            const index = this.createdPeople.findIndex(person => person.uuid === this.selectedPersonId);
            if (index > -1) {
              this.createdPeople[index] = personData;
            }
  
            localStorage.setItem('createdPeople', JSON.stringify(this.createdPeople));
            this.selectedPersonId = null;
          },
          (error) => console.error('API Error while updating:', error)
        );
      } else {
        this.personService.sendPersonData(payload).subscribe(
          (response) => {
            console.log('Created person:', response);
  
            const fullName = response.preferredName?.display || '';
            const [givenName, ...rest] = fullName.split(' ');
            const familyName = rest.join(' ');
  
            const personData = {
              uuid: response.uuid,
              givenName,
              familyName,
              gender: response.gender,
            };
  
            this.createdPeople.push(personData);
  
            localStorage.setItem('createdPeople', JSON.stringify(this.createdPeople));
          },
          (error) => console.error('API Error while creating:', error)
        );
      }
    }
  }

  deletePerson(uuid: string) {
    this.personService.deletePerson(uuid).subscribe(
      response => {
        console.log('Person deleted:', response);

        this.createdPeople = this.createdPeople.filter(person => person.uuid !== uuid);
        localStorage.setItem('createdPeople', JSON.stringify(this.createdPeople));
      },
      error => console.error('API Error while deleting person:', error)
    );
  }
  
}
