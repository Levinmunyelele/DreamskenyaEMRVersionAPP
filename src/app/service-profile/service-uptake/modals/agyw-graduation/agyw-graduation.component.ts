import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';


@Component({
  selector: 'app-agyw-graduation',
  templateUrl: './agyw-graduation.component.html',
  styleUrls: ['./agyw-graduation.component.scss'],
})
export class AgywGraduationComponent implements OnInit {
  gradForm!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  currentStep = 1;
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  selectedOptions: { [key: string]: any } = {};
  @Input() encounter: any;


  questions = [
    {
      label: "AGYW Ageband",
      concept: "e4191d15-7641-4e20-ab7a-727844dcf9f7",
      type: "radio",
      options: [
        { value: "9b94ba22-dfc9-44e9-a7e7-d3f43fb4cf2c", label: "20-24" },
        { value: "903151cb-14a9-4399-8afc-e6c4f70402eb", label: "18-19" },
        { value: "3e476d29-4133-4dc9-abe5-7221b21a7812", label: "15-17" },
        { value: "1d45b719-f5fa-4189-94e3-495d95ed9acb", label: "10-14" }
      ]
    },
    {
      label: "Primary Individual Interventions AGYW received",
      concept: "01aad1dd-c557-4b20-951b-a48af0e66ef5",
      type: "checkbox",
      options: [
        { value: "3f680472-7923-49fa-9392-66a9694a02d1", label: "Social Asset Building" },
        { value: "669e777e-292b-4753-8ef8-747eff38a483", label: "SHUGA II" },
        { value: "8f7f4fb7-bc07-4a25-ac0c-0c54ccff15b6", label: "Sexual Violence - STI Screening" },
        { value: "02bfe351-f17b-4685-aa21-12a0a42ab998", label: "PrEP - PrEP gradcation" },
        { value: "9ae2f8d3-6a30-4b1d-b42c-4099464d798d", label: "HTS Screening" },
        { value: "882116be-158d-470d-81e4-4afecd0c8e14", label: "HTS - Screening and Eligibility (Client)" },
        { value: "c5237306-936e-4825-ab71-d32f4dfc7e47", label: "HTS - HTS (Client)" },
        { value: "daba45c8-8b3e-476a-9115-e443a34fed96", label: "HTS - Client Linked to HTS" },
        { value: "586ce4a3-3c60-4cea-ae75-017a938e4450", label: "Health Choices for a Better Future (HCBF or Healthy Choices1)" },
        { value: "245b2643-7a2b-4906-9aec-f047a038f4e9", label: "FP - Contraception Method Mix - gradcation/Info" },
        { value: "9366a010-6aea-48e7-8a87-1c50403db1b7", label: "Economic Strengthening - Financial Capabilities Training" },
        { value: "6195e7e6-448f-46bc-9a65-90ccd63e1941", label: "Economic Strengthening - Entrepreneurship training" },
        { value: "35151086-738f-4c15-afd1-7b085987efdb", label: "EBI-Respect K" },
        { value: "c6d18fd8-e96c-4b55-8ca5-626a5252f9da", label: "EBI - SISTER TO SISTER-K" },
        { value: "c91622c8-9dbe-46ac-89dd-133945463c2c", label: "Condom gradcation/demonstration" },
        { value: "fda6d351-f810-4a5b-9d45-6ad162542944", label: "Attended" }
      ]
    },
    {
      label: "Secondary Individual Interventions AGYW received",
      concept: "a02d5213-9422-477d-8abf-551ea9006c34",
      type: "checkbox",
      options: [
        { value: "8f3ed226-7735-4091-b686-b73aaecd4d49", label: "TB - TB Screening" },
        { value: "c52d433e-c7f5-43be-810b-e1bd99f06c81", label: "TB - Linked for TB Treatment" },
        { value: "90426860-20a3-4809-8ad3-2384c8a6e07e", label: "STI Screening" },
        { value: "a1052d4c-eea9-4b8d-81f1-bfc947477f44", label: "STI - STI Treatment" },
        { value: "da3b7d18-f86f-48b2-933d-17d50e3df8e9", label: "STI - STI Screening Results" },
        { value: "6335f52a-0f54-45b5-86fa-19182132a099", label: "STI - STI Screening" },
        { value: "b46866e1-429d-4ac0-a7cc-65848ee21ade", label: "STI - STI Linkage" },
        { value: "f4e903b6-a129-411c-8c09-87aeefb02c97", label: "Sexual Violence- Trauma Counselling" },
        { value: "cbf49ad0-83c2-4fde-be5c-5f73137a33fe", label: "Sexual Violence- STI Treatment" },
        { value: "1a4b9498-36b0-46e3-89e6-a354d9203f6e", label: "Sexual Violence- PEP" },
        { value: "4567065d-d8ee-4453-b561-3bad43421aab", label: "Sexual Violence - Treatment of Minor Injuries" },
        { value: "c386b8fc-e7ce-44f9-92da-719786a624e6", label: "Sexual Violence - Trauma Counseling" },
        { value: "974cdad2-f38e-44f4-a487-085d49c67876", label: "Sexual Violence - Support group" },
        { value: "8f7f4fb7-bc07-4a25-ac0c-0c54ccff15b6", label: "Sexual Violence - STI Screening" },
        { value: "767a4519-1e98-435d-a1ae-d4f97d192030", label: "Sexual Violence - Safe Space Shelter" },
        { value: "422e588a-1986-4c66-92ee-7f16dea791ab", label: "Sexual Violence - Rescue/Shelter" },
        { value: "ee99ff93-f010-4e16-93bb-7f459e53b776", label: "Sexual Violence - PSS" },
        { value: "ad7436be-e203-45cb-ab42-d2f4e8475b19", label: "Sexual Violence - Police" },
        { value: "1e332dd1-ca85-406f-b9e9-d6731a168ca0", label: "Sexual Violence - Other (Specify)" },
        { value: "c7d16ca7-087c-401e-93b7-ef380efb60d6", label: "Sexual Violence - Legal support" },
        { value: "912bb7ec-c4a1-471b-8d86-e0b7c8adf5eb", label: "Sexual Violence - Legal Aid" },
        { value: "fd915d37-86c3-4f90-aef8-886cd8f0a58b", label: "Sexual Violence - HTS" },
        { value: "6a8f7792-3794-42c4-a981-f4f7cf46dde9", label: "Sexual Violence - Examination/Treatment of Injuries" },
        { value: "1f5ddbbc-3d73-463f-97e2-4abd1813c4ac", label: "Sexual Violence - Enrolled into Support group" },
        { value: "3a8a165a-767c-41eb-8595-9d5417d6ca19", label: "Sexual Violence - Emergency Contraception" },
        { value: "2c7b7a8c-f38d-4687-a540-3de4d1db4599", label: "Sexual Violence - ECP" },
        { value: "9ea152c4-ce15-4cf5-aad4-17ffbd4c93ca", label: "Referrals" },
        { value: "0e20277b-c64f-4231-a6ab-6857fae5c4a1", label: "Post violence services offered" },
        { value: "86cc2db1-033e-46ed-b146-525c51dd23e6", label: "Physical Violence -PSS" },
        { value: "b606f53d-f88d-4c4b-9047-729465e5b958", label: "Physical Violence - Treatment of Minor Injuries" },
        { value: "b016accd-6c61-4ccd-bb33-04599a4d0d2f", label: "Physical Violence - Trauma Counselling" },
        { value: "b557ab4d-e4a4-4dbe-93d4-4b2537dc5088", label: "Physical Violence - Support group" },
        { value: "50d2afdd-e9df-470f-bce8-001c1b636dad", label: "Physical Violence - Safe Space Shelter" },
        { value: "546ef338-a3c4-4202-8fcb-b766ed8f31f0", label: "Physical Violence - Rescue/Shelter" },
        { value: "9bf66e85-d497-40d3-946a-a0e74bc10df7", label: "Physical Violence - Police" },
        { value: "762b02cf-06ff-4cae-af68-198db31d8eff", label: "Physical Violence - Legal support" },
        { value: "01b37057-0681-4790-88c8-052386c084d5", label: "Physical Violence - Legal Aid" },
        { value: "116ebd04-a86e-40c3-8f67-3e7548bd6683", label: "Physical Violence - Examination/Treatment of injuries" },
        { value: "af426b90-1618-4c05-8ffe-49694e64bc97", label: "Physical Violence - Advocacy Network" },
        { value: "d7c0303c-4bbe-4782-b544-a3bd7f4b94a4", label: "Parent/Caregiver Program - Sinovuyo" },
        { value: "9afd6350-87d4-416d-acce-e8b44fad1348", label: "Parent/Caregiver Program - FMP II" },
        { value: "d3a3eebe-8619-46bb-8b43-e5f849310e99", label: "Parent/Caregiver Program - FMP I" },
        { value: "a2f0f9c6-d26d-4d42-bd97-1a511f085b46", label: "OVC for Children/Siblings/Other" },
        { value: "6cbba0bd-bd7f-40d7-8b83-2df07a0565aa", label: "Other PVC Services(Specify)" },
        { value: "5484AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "NUTRITIONAL SUPPORT" },
        { value: "71888103-1354-4bac-b4ec-3a6bd272f4e4", label: "lFP - Received Contraception-Pills/Oral (1001091)" },
        { value: "0247ed79-42ee-4228-8c2e-c83cb4f0b70c", label: "FP - Received Contraception-IUD/Coil" },
        { value: "4e5ef776-9401-4b29-a0c0-1c1425c467c6", label: "FP - Received Contraception-Injectabl" },
        { value: "152204c0-3419-4eae-a32b-421de679de60", label: "Emotional Violence - Trauma Counselling" },
        { value: "a6f1a3a3-4239-40e3-a356-df10959984d8", label: "Emotional Violence - Support group" },
        { value: "aafd211c-c39c-4f08-9ac6-52de5897676a", label: "Emotional Violence - PVC Referral (Other Specify)" },
        { value: "d3ba9bb7-1da9-4589-9279-8d5a5356fe35", label: "Emotional Violence - Safe Space Shelter" },
        { value: "58bbd023-1cca-46a5-b753-55be6f76e0de", label: "Emotional Violence - Rescue/Shelter" },
        { value: "545e2780-14b4-40ae-9fec-f8341c18bf64", label: "Emotional Violence - PSS - Individual / Group" },
        { value: "950a9e04-17d9-4ad7-8295-26e570644e5a", label: "Emotional Violence - PSS" },
        { value: "52793d0e-cb9b-4fcc-8ad9-8d7788b85f98", label: "Emotional Violence - Police)" },
        { value: "0c1e5f55-8bc2-4950-82c8-d3fdcb9839d5", label: "Emotional Violence - Legal support" },
        { value: "458c0121-27cc-4e82-8286-0855faa39171", label: "Emotional Violence - Legal Aid" },
        { value: "ebc105b8-0f7b-4c02-8f08-4a41517d361e", label: "Emotional Violence - Examination/Treatment of injuries" },
        { value: "80096e09-67ac-4bd5-a202-3cb3533225d5", label: "Emotional Violence - Enrolled into Support group" },
        { value: "c67a523f-754d-461f-bbfc-37fdc391a538", label: "gradcation Support - Uniform" },
        { value: "c5ea9819-7404-45b8-9640-dc7e8fad89d7", label: "gradcation Support - School Fees" },
        { value: "af4a5381-cb07-47c6-9253-93f479d2a30c", label: "gradcation Support - Other" },
        { value: "45265804-2000-40ab-ad21-6aeec5a2fbac", label: "Economic Strengthening - Vocational Training" },
        { value: "b8bcd37d-0596-4279-a34a-3679021af45d", label: "Economic Strengthening - Paid Internship" },
        { value: "f7034c1d-cce3-4a2c-80b5-213d4baeb8f1", label: "Economic Strengthening - Microfinance" },
        { value: "072bd475-d2fc-44be-85a2-7fb877cb8032", label: "Economic Strengthening - Employment" },
        { value: "6f9b2d10-197a-4dc4-8a4a-6f5516bcb1be", label: "Economic Strengthening - Business Startup Kit" },
        { value: "b9ca2e49-43fd-41b7-8df0-e33e6e7fc9f8", label: "Condom Use with cal contactasus" },
        { value: "923c74aa-f3ee-4a72-badb-1a85a7fcf331", label: "Condom Provided" }
      ]
    }
  ];

  secondSection = [
    {
      label: "Has AGYW received Violence Prevention gradcation?",
      concept: "6a7ff9a6-d03f-42e5-9002-3be5414f6bfc",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Screened for GBV during assessment for graduation?",
      concept: "32f20608-8765-467a-8635-bcb8c2e4f3ed",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Experiencing GBV",
      concept: "238dc729-7ce8-4bd9-afad-4b88f6326687",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Does AGYW have (or identified) a source of income?",
      concept: "d93d8cb5-f0d0-4655-a3c0-0728db6b8764",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Does AGYW belong to a savings group or ’Chama’?",
      concept: "535dd724-ea52-42f0-8628-b85dd0a4440a",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Does AGYW have the National Identification Card?",
      concept: "8c94bde9-f746-4e89-b0b9-17e0479ab25b",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Has AGYW completed secondary gradcation?",
      concept: "24854944-edbf-4370-870f-613af523b0db",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Can she discuss HIV prevention with sexual partner(s)?",
      concept: "fbdc0fb3-3d13-488e-98f2-e31bd9f4149e",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Knows where to get PrEP, condoms, FP, STI treatment?",
      concept: "81845c9e-899a-49ce-be2a-4c31beb700ec",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Able to identify and avoid violence in her relationships?",
      concept: "e6d04a6c-0650-42bd-82ac-b075bc1ff411",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Has at least 5 friends in her age group?",
      concept: "7d7b5ed3-63ed-4345-a63d-ecdfaf28cae0",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Has an older mentor she can always refer to for help?",
      concept: "b2b2938c-6fa9-4c1b-a3cf-4822990e9ff3",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "If AGYW answered ‘No’ to any of the above and YES to GBV question, what plans do they have and what support do they need to remedy the situation?",
      concept: "c294e982-a458-4d73-ad7a-89dc3d743a8a",
      type: "text"
    }
  ];

  thirdSection = [
    {
      label: "Does AGYW wish to continue coming to the safe space",
      concept: "bf746545-8d66-4f1c-bfa0-3a7219f9d1f9",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Does the AGYW feel she can serve any roles below, ‘tick’ where necessary",
      concept: "a182c72f-b5dd-4607-8c4d-b62c41ba89fb",
      type: "checkbox",
      options: [
        { value: "bf94ac50-7649-4ab5-8172-de50f2a32dbf", label: "Safe Space Volunteer/Ambassador" },
        { value: "5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Other" },
        { value: "792ebc4d-5d61-44eb-94c0-90ef47d4feb5", label: "Mentor" },
        { value: "3872a0b0-7a1f-44f7-b4c1-5a09cc3bb191", label: "EBIs Facilitator" },
        { value: "a06ba716-7647-484f-a873-9980b5913b01", label: "Data Clerk" }
      ]
    },
    {
      label: "Specify other roles",
      concept: "74938467-b76e-4c0d-8fed-8bcc40da741e",
      type: "text"
    },
    {
      label: "Is the AGYW Ready to be graduated?",
      concept: "733ec56f-cdd6-4043-805a-86d8d2e5c6a1",
      type: "radio",
      options: [
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" },
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" }
      ]
    },
    {
      label: "Date Graduated",
      concept: "6b491a16-44ba-41d5-b6cf-37fc2acf2ed8",
      type: "date"
    },
    {
      label: "Any Recommendation:",
      concept: "7ec2e70c-61f9-487f-a332-74c21a83d7fc",
      type: "text"
    },
    {
      label: "Name of person filling the Card",
      concept: "aaa1c18f-adee-4f49-a9b2-a5518c6c9abb",
      type: "text"
    },
    {
      label: "Ward In-charge/FO Name & Signature",
      concept: "5a8a2050-aa6a-4c2b-91dc-5543bf16a641",
      type: "text"
    }
  ]

  totalSteps!: number;
  sections!: { questions: ({ label: string; concept: string; type: string; options?: undefined; } | { label: string; concept: string; type: string; options: { value: string; label: string; }[]; })[]; formGroup: FormGroup<any>; }[];

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private encounterService: EncounterService,
    private navParams: NavParams,
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get responses(): FormArray {
    return this.gradForm.get('responses') as FormArray;
  }

  ngOnInit() {
    this.gradForm = this.fb.group({});
    this.secondFormGroup = this.fb.group({});
    this.thirdFormGroup = this.fb.group({});

    this.sections = [
      { questions: this.questions, formGroup: this.gradForm },
      { questions: this.secondSection, formGroup: this.secondFormGroup },
      { questions: this.thirdSection, formGroup: this.thirdFormGroup },

    ];
    this.totalSteps = this.sections.length;

    this.sections.forEach((section) => {
      section.questions?.forEach((question) => {
        if (question.concept) {
          if (question.type === 'checkbox') {
            if (!section.formGroup.contains(question.concept)) {
              section.formGroup.addControl(question.concept, this.fb.array([]));
            }

          } else {
            section.formGroup.addControl(question.concept, this.fb.control(''));
          }

        }

      });

    });
    this.patientData = this.navParams.get('patientData');
    this.enrollmentData = this.navParams.get('enrollmentData');
    this.encounterData = this.navParams.get('encounterData');
    this.visitType = this.navParams.get('visitType');
    this.encounterType = this.navParams.get('encounterType');
    this.form = this.navParams.get('form');
    console.log('Modal Data Received:', {
      patientData: this.patientData,
      enrollmentData: this.enrollmentData,
      encounterData: this.encounterData,
      visitType: this.visitType,
      encounterType: this.encounterType,
      form: this.form,

    });

    if (this.encounter) {
      this.populateForm();
    }

  }

  onSelectionChange(value: any, concept: string) {
    this.selectedOptions[concept] = value;

    const index = this.questions.findIndex(q => q.concept === concept);
    if (index !== -1) {
      const responsesArray = this.gradForm.get('responses') as FormArray;
      responsesArray.at(index).setValue(value);
    }
  }

  onCheckboxChange(event: any, concept: string, value: string): void {
    const isChecked = event.detail.checked;

    let targetFormGroup: FormGroup | undefined = this.gradForm.contains(concept)
      ? this.gradForm
      : this.thirdFormGroup.contains(concept)
        ? this.thirdFormGroup
        : undefined;

    if (!targetFormGroup) {
      console.error(`Control '${concept}' not found in any form group.`);
      return;
    }

    let control = targetFormGroup.get(concept);

    if (!control) {
      console.warn(`Control '${concept}' not found in ${targetFormGroup}.`);
      return;
    }

    if (!(control instanceof FormArray)) {
      console.warn(`Control '${concept}' is not a FormArray. Initializing as FormArray.`);
      targetFormGroup.setControl(concept, this.fb.array([]));
      control = targetFormGroup.get(concept) as FormArray;
    }

    if (isChecked) {
      if (!control.value.includes(value)) {
        (control as FormArray).push(this.fb.control(value));
      }
    } else {
      const index = (control as FormArray).controls.findIndex((x) => x.value === value);
      if (index > -1) {
        (control as FormArray).removeAt(index);
      }
    }

    console.log(`Updated FormArray for concept '${concept}':`, control.value);
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
  populateForm() {
    if (!this.encounter || !this.encounter.obs) {
      console.warn('Encounter or observations are missing, skipping form population.');
      return;
    }
  
    const obs = this.encounter.obs;
  
    obs.forEach((ob: any) => {
      const conceptUuid = ob.concept.uuid;
      const value = this.extractValue(ob.display);
  
      let question: any = this.questions.find((q) => q.concept === conceptUuid);
      let formGroup = this.gradForm;
  
      if (!question) {
        question = this.secondSection.find((q) => q.concept === conceptUuid);
        formGroup = this.secondFormGroup;
      }
  
      if (!question) {
        question = this.thirdSection.find((q) => q.concept === conceptUuid);
        formGroup = this.thirdFormGroup;
      }
  
      if (question && formGroup) {
        const control = formGroup.get(question.concept);
        if (control) {
          if (question.type === 'radio' && question.options) {
            const option = question.options.find((opt: any) => opt.label === value);
            if (option) {
              control.setValue(option.value);
            }
          } else if (question.type === 'checkbox' && question.options) {
            try {
              const savedValues = JSON.parse(value);
              if (Array.isArray(savedValues)) {
                control.setValue(savedValues);
              } else {
                console.warn(`Saved value for ${question.concept} is not an array: ${value}`);
              }
            } catch (e) {
              console.warn(`Saved value for ${question.concept} is not valid JSON: ${value}`);
              control.setValue([]);
            }
          } else if (question.type === 'date' || question.type === 'text') {
            control.setValue(value);
          }
        }
      }
    });
  }
  
  extractValue(display: string): string {
    const parts = display.split('::');
    if (parts.length > 1) {
      return parts[1].trim();
    } else {
      const singleColonParts = display.split(':');
      return singleColonParts.length > 1 ? singleColonParts[1].trim() : display;
    }
  }

  submitForm() {
    if (!this.patientData) {
      console.error('Patient data is missing');
      return;
    }

    if (!this.questions || !this.secondSection || !this.thirdSection) {
      console.warn('One or more question sections are missing, skipping form submission.');
      return;
    }

    if (!this.gradForm || !this.secondFormGroup || !this.thirdFormGroup) {
      console.error('One or more form groups are missing.');
      return;
    }


    const extractObs = (questions: any[], formGroup: any) => {
      return questions
        .map((question) => {
          let value = formGroup.value[question.concept];

          if (value !== null && value !== undefined && value !== '') {
            if (['dropdown', 'radio'].includes(question.type)) {
              return { concept: question.concept, value: value };
            }
            if (['text', 'textarea'].includes(question.type)) {
              return { concept: question.concept, value: value };
            }


            if (question.type === 'number') {
              return { concept: question.concept, value: value };
            }

            if (question.type === 'date') {
              return { concept: question.concept, value: value };
            }

            if (question.type === 'checkbox') {
              const control = formGroup.get(question.concept) as FormArray;
              value = control?.value || [];

              return value.map((v: string) => ({
                concept: question.concept,
                value: v
              }));
            }

            return { concept: question.concept, value };
          }

          return null;
        })
        .filter(Boolean)
        .reduce((acc, curr) => acc.concat(curr), []);
    };



    const obs = [
      ...extractObs(this.questions, this.gradForm),
      ...extractObs(this.secondSection, this.secondFormGroup),
      ...extractObs(this.thirdSection, this.thirdFormGroup),
    ];

    const payload = {
      patient: this.patientData.uuid,
      visit: this.visitType || null,
      encounterType: this.encounterType,
      form: this.form,
      obs: obs,
      orders: [],
      diagnoses: [],
      location: this.patientData.identifiers?.[0]?.location?.uuid || null
    };

    console.log('Payload to be sent:', payload);

    this.encounterService.submitEncounter(payload).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.modalCtrl.dismiss({ refresh: true, data: response });
      },
      (error) => {
        console.error('API Error:', error);
        this.modalCtrl.dismiss({ refresh: false, error: error });
      }
    );
  }
}  