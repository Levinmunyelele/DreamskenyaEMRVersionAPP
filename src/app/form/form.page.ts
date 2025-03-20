import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  formData: any;
  errorMessage = '';
  formGroup: FormGroup;
  formUuid: any;

  constructor(private formService: FormService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      encounterDate: ['', Validators.required],
      provider: ['', Validators.required],
      location: ['', Validators.required],
      everEnrolledInDreams: ['', Validators.required],
      enterDreamsId: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      whoDoYouLiveWith: ['', Validators.required],
      disability: ['', Validators.required],
      stateDisabilityType: ['', Validators.required],
      caregiverFirstName: ['', Validators.required],
      caregiverMiddleName: ['', Validators.required],
      caregiverSurname: ['', Validators.required],
      caregiverOccupation: ['', Validators.required],
      outOfSchool: ['', Validators.required],
      everHadSex: ['', Validators.required],
      sexualPartners: ['', Validators.required],
      receivedGiftsForSex: ['', Validators.required],
      diagnosedSTI: ['', Validators.required],
      hasChild: ['', Validators.required],
      sexualPartnersLast12Months: ['', Validators.required],
      everHadAnSTI: ['', Validators.required],
      undergoneGBV: ['', Validators.required],
      headOfHousehold: ['', Validators.required],
      usedDrugs: ['', Validators.required],
      isOrphan: ['', Validators.required],
      comment: ['', Validators.required],
      isEligible: ['', Validators.required]
    });
    
  }    

  ngOnInit() {
    
    this.loadForm();
  }

  loadForm() {
    this.formService.getForm().subscribe(
      (data) => {
        this.formData = data;
        this.populateForm(data);
        console.log('Form loaded:', data);
      },
      (error) => {
        this.errorMessage = 'Failed to load the form';
        console.error('Error loading form:', error);
      }
    );
  }

  populateForm(data: any) {
    this.formGroup.patchValue({
      encounterDate: data.encounterDate || '',
      provider: data.provider || '',
      location: data.location || '',
      everEnrolledInDreams: data.everEnrolledInDreams || '',
      enterDreamsId: data.enterDreamsId || '',
      maritalStatus: data.maritalStatus || '',
      whoDoYouLiveWith: data.whoDoYouLiveWith || '',
      disability: data.disability || '',
      stateDisabilityType: data.stateDisabilityType || '',
      caregiverFirstName: data.caregiverFirstName || '',
      caregiverMiddleName: data.caregiverMiddleName || '',
      caregiverSurname: data.caregiverSurname || '',
      caregiverOccupation: data.caregiverOccupation || '',
      outOfSchool: data.outOfSchool || '',
      everHadSex: data.everHadSex || '',
      sexualPartners: data.sexualPartners || '',
      receivedGiftsForSex: data.receivedGiftsForSex || '',
      diagnosedSTI: data.diagnosedSTI || '',
      hasChild: data.hasChild || '',
      sexualPartnersLast12Months: data.sexualPartnersLast12Months || '',
      everHadAnSTI: data.everHadAnSTI || '',
      undergoneGBV: data.undergoneGBV || '',
      headOfHousehold: data.headOfHousehold || '',
      usedDrugs: data.usedDrugs || '',
      isOrphan: data.isOrphan || '',
      comment: data.comment || '',
      isEligible: data.isEligible || ''
    });
    
  }

  submitForm() {
    if (this.formGroup.valid) {
      const formData = {
        ...this.formGroup.value,  // Include all form controls
        formUuid: this.formUuid     // Ensure the UUID is attached
      };
  
      this.formService.submitForm(formData).subscribe(
        response => console.log('Form successfully submitted!', response),
        error => console.error('Form submission error!', error)
      );
    }
  }
  
  
}
