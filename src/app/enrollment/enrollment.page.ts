import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.page.html',
  styleUrls: ['./enrollment.page.scss'],
})
export class EnrollmentPage implements OnInit {
  enrollmentForm!: FormGroup;


  questions = [
    {
      label: "Implimenting Partner",
      concept: "f122e57d-975d-4613-9a38-aa5761b37894",
      type: 'dropdown',
      options: [
        { value: 'e9360316-df59-4266-a023-0fab7b5110cc', label: 'USAID 4 The Child' },
        { value: '9f201269-4bab-450a-9bff-d5cbc313e963', label: 'Afya Jijini' },

      ]
    },
    {
      label: 'First Name',
      concept: '166102AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text'
    },
    {
      label: 'Last Name',
      concept: '166103AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text'
    },
    {
      label: 'Date of Enrollment',
      concept: '8166091AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'date'
    },
    {
      label: 'Date of Birth',
      concept: '166575AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'date'
    },
    {
      label: "Verification Document",
      concept: "20155670-962e-4b62-81b8-a838ea6a2515",
      type: 'dropdown',
      options: [
        { value: '1469e16f-b103-41ce-af99-cb17cb140342', label: 'Birth Certificate' },
        { value: '5f7739ad-7fbd-4f56-80f5-61ead209ec53', label: 'National ID' },
        { value: 'ec0dd1dd-a0a8-4415-9429-c5d66e883cdc', label: 'National ID(Waiting Card)' }

      ]
    },
    {
      label: 'Verification Document No',
      concept: '2cd4ff70-ff4c-4b3b-ba26-641a9e1ca2f6',
      type: 'text'
    },
    {
      label: 'Marital Status',
      concept: 'b71619d4-6f61-41f7-a04e-aa0bb6db09be',
      type: 'dropdown',
      options: [
        { value: '1057AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Never Married' },
        { value: '5555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Married' },
        { value: '1058AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Divorced' },
        { value: '1059AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Widowed' }
      ]
    },
    {
      label: 'Phone Number',
      concept: '159635AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text'
    },
    {
      label: 'DSS ID Number',
      concept: '73c06bab-f77a-4c15-accd-c15ef5dd0545',
      type: 'text'
    },
    {
      label: 'County of Residence',
      concept: '167131AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'dropdown',
      options: [
        { value: '589b6de3-b25a-4d42-a7a1-7e31afb1397c', label: 'Homabay' },
        { value: '6ff6baeb-d660-474e-a77e-4f11adf7bf02', label: 'Kiambu' },
        { value: '1fefe819-aa34-4991-9eab-9b9c4965b19c', label: 'Kisumu' },
        { value: '4ca55dd2-0651-4bdb-ab5b-7a2bcf5636dd', label: 'Migori' },
        { value: '12e67c21-f7c3-4f58-bfe8-784e1d2b57ae', label: 'Mombasa' },
        { value: 'd79cdabe-e95a-41ec-9b33-f0fe402b6a39', label: 'Nairobi' },
        { value: '0a59176a-3aa7-4d8a-8e49-63f50a04ff99', label: 'Siaya' },

      ]
    },
    {
      label: 'Sub County of Residence',
      concept: '167131AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text'
    },
    {
      label: 'Informal Settlement',
      concept: '167131AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text'
    },
    {
      label: 'Ward of Residence',
      concept: '64fb6ce0-fac6-48e3-8e8e-0110b2a8724f',
      type: 'text'
    },
    {
      label: 'Village',
      concept: '1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: 'text'
    },
    {
      label: 'Landmark Near Residence',
      concept: '3e68392c-416e-4f9d-953f-5179903634d3',
      type: 'text'
    },
    {
      label: 'DREAMS ID',
      concept: '24e940ef-d363-4730-ae2b-156663333bb7',
      type: 'text'
    },
    {
      label: 'Primary Care Giver / Guardian Name',
      concept: '0c41e29f-cc27-4c83-aeb6-48d882a20976',
      type: 'text'
    },
    {
      label: 'Relationship with Guardian',
      concept: '91b90f76-8942-4ba7-aecd-97baff0ecef6',
      type: 'dropdown',
      options: [
        { value: '975AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Aunt' },
        { value: '163356AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Cousin' },
        { value: '971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Father' },
        { value: '160273AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Grandfather' },
        { value: '159772AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Grandmother' },
        { value: '970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Mother' },
        { value: '974AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Uncle' }
      ]
    },
    {
      label: 'Phone Number (Care Giver / Guardian)',
      concept: '1ba799fa-e45e-4338-8038-f63cb887a701',
      type: 'number'
    },

    {
      label: 'National ID (Care Giver / Guardian)',
      concept: '6c9f0707-3f72-43c7-98a5-2a5361087486',
      type: 'number',
    },

    {
      label: 'External Organization',
      concept: '4d663c31-b819-45fc-90eb-4936f23f09c4',
      type: 'text'
    },

    {
      label: 'CPIMS ID',
      concept: '09179727-a70c-469d-a557-ec93750fd23c',
      type: 'text'
    },

    {
      label: 'NEMIS Number',
      concept: '1115806e-e4cd-4360-8090-1b7368cde86c',
      type: 'text'
    },

    {
      label: 'NUPI Number',
      concept: '895baa3d-39b1-405f-a2fd-de7bc572c9c3',
      type: 'text'
    },
    {
      label: 'Head of Household',
      concept: 'd2b04d79-7922-4cc8-abcd-58bead1bf6fb',
      type: 'radio',
      options: [
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' },
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' }
      ]
    },

    {
      label: 'Age of Household Head',
      concept: '7ba5276f-e9bf-468f-b31b-82664378b7b7',
      type: 'number',
    },

    {
      label: 'Father Alive?',
      concept: '6bde6963-80f2-4342-bfce-fcd6bdd52907',
      type: 'radio',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },

    {
      label: 'Mother Alive?',
      concept: 'e8b44943-a8b5-4d2a-9d8d-1012b4c9a7ed',
      type: 'radio',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },

    {
      label: 'Is any of your parent/guardian chronically ill?',
      concept: '0d0562ad-bc89-45c3-abaa-71476ef23883',
      type: 'radio',
      options: [
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' },
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '0315bf67-87e9-4687-9b9d-eb0d85ac00b4', label: "Don't Know" }
      ]
    },

    {
      label: 'Disabled?',
      concept: '91a87033-8f75-4f08-9f15-0d8ae66bd9d9',
      type: 'dropdown',
      options: [
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' },
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' }
      ]
    },
    {
      label: 'Main Floor Material',
      concept: '984b7435-7607-4ec2-a9eb-b5095ae059fa',
      type: 'dropdown',
      options: [
        { value: '1943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Cement' },
        { value: '159679AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Ceramic tile' },
        { value: '2fbda376-ee33-4e61-b665-19d71eacd534', label: 'Earth/Mud/Dung/Sand' },
        { value: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Other' },
        { value: '159687AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Wood plank' }
      ]
    },
    {
      label: 'Main Roof Material',
      concept: 'e243bc39-29ba-45f3-b5ce-bc04437b4fd0',
      type: 'dropdown',
      options: [
        { value: '159689AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Asbestos sheet' },
        { value: '310409b0-e8e0-4e34-a612-54f54e2b8b54', label: 'Concrete' },
        { value: '52c39dd2-bc61-4cf8-846d-b079d0943c22', label: 'Corrugated iron sheet (Mabati)' },
        { value: 'a1d3985d-d8a6-4a9c-ba2b-31a021d338b3', label: 'Grass/thatch/makuti' },
        { value: '48298b76-295d-4175-af87-63eed3f69e7c', label: 'Tin cans' },
        { value: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Other' }
      ]
    },
    {
      label: 'Main Wall Material',
      concept: 'eccac6ec-36be-4966-899f-ab89d25f992c',
      type: 'dropdown',
      options: [
        { value: '629532e3-3f60-4d47-ad29-76b4bf08635c', label: 'Carton' },
        { value: '1943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Cement' },
        { value: '2fbda376-ee33-4e61-b665-19d71eacd534', label: 'Earth/Mud/Dung/Sand' },
        { value: 'f1a3035b-514a-4067-9c57-856f15b22a45', label: 'No wall' },
        { value: '347999b7-9c96-405c-8a7a-908df582d792', label: 'Plywood/Cardboard' },
        { value: '0939c564-fda0-465c-9072-3dfb4b195ff0', label: 'Stone with mud' },
        { value: '159687AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Wood plank' },
        { value: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Other' }
      ]
    },
    {
      label: 'Main Source of Drinking Water',
      concept: '065bbd7d-7fd1-47c9-b0cb-5c1a01ab4de9',
      type: 'dropdown',
      options: [
        { value: '4e2cd8d4-b790-4cf0-94cc-037d825988a4', label: 'Covered well/borehole' },
        { value: '6de3da08-b2ec-450a-9b29-b1d6e6feced7', label: 'Open well' },
        { value: '2eb3d052-6630-453a-a110-5cd85e1650f7', label: 'Piped Water' },
        { value: 'c3ee533d-1e37-48ad-b920-1f4f9c785e07', label: 'Rain water' },
        { value: '3e64257d-1c36-42f9-b90b-688493a6bedf', label: 'Surface water (river, spring, lake)' },
        { value: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Other' }
      ]
    },
    {
      label: 'Ever Missed a full day food in 4 wks',
      concept: '59ae31b7-f8a1-4de3-9f38-3c4f06b07ef8',
      type: 'dropdown',
      options: [
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' },
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' }
      ]
    },
    {
      label: 'No of People living in your house',
      concept: '5d85ff3f-277d-48ed-842e-c6fad2bd1414',
      type: 'number',
    },
    {
      label: 'No of Females',
      concept: '259e4d84-6c18-4a28-bc1a-4ff5378e94d9',
      type: 'number',
    },
    {
      label: 'No of Males',
      concept: 'ff8b0267-fbe4-4ba3-8803-0a1c3b69770c',
      type: 'number',
    },
    {
      label: 'No of Children',
      concept: '4b13f069-584c-443a-bd8c-695536942f88',
      type: 'number',
    },
    {
      label: 'Ever Enrolled in cash Transfer',
      concept: '23e6ec37-510f-4087-a7c9-39a5e208f4cc',
      type: 'dropdown',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' },
        { value: '0315bf67-87e9-4687-9b9d-eb0d85ac00b4', label: 'Don’t Know' }
      ]
    },
    {
      label: 'Currently Schooling',
      concept: 'c1b883da-9dde-4c3e-9653-3512908ccf6d',
      type: 'dropdown',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Name of School',
      concept: 'fd6e0403-8db5-42f1-aac6-e936d9a1b392',
      type: 'text', hide: true,
      followUpFor: 'c1b883da-9dde-4c3e-9653-3512908ccf6d'

    },
    {
      label: 'Type of School',
      concept: '5627ee45-2e60-47c7-b04b-faf7904aed7f',
      type: 'dropdown',
      hide: true,
      followUpFor: 'c1b883da-9dde-4c3e-9653-3512908ccf6d',
      options: [
        { value: 'f36699ea-614b-4a54-9eca-de8cc8cb9583', label: 'Formal' },
        { value: '55df3b33-1933-45ed-9ea1-e18ccfa524b6', label: 'Informal' }
      ]
    },
    {
      label: 'Current School Level',
      concept: '19417682-da67-442c-a18c-4ed2e2653e1d',
      type: 'dropdown',
      hide: true,
      followUpFor: 'c1b883da-9dde-4c3e-9653-3512908ccf6d',
      options: [
        { value: '91c21bda-6d5d-4047-8514-0a0e39a9c712', label: 'Primary Level' },
        { value: '1e1e8b25-53c7-4c10-95e8-fcc114fe8417', label: 'Secondary Level' },
        { value: '68637df8-5069-4d59-ba5c-de020aae27f4', label: 'Tertiary Level (college/university)' },
        { value: '978ac0b2-5216-425f-9328-8b5f93d3f9be', label: 'Vocational Level' }
      ]
    },
    {
      label: 'Supporter Towards Current Education',
      concept: '624bbac1-f06a-485e-afd3-616d6ee101f7',
      type: 'dropdown',
      hide: true,
      followUpFor: 'c1b883da-9dde-4c3e-9653-3512908ccf6d',
      options: [
        { value: '74ad984a-df40-4503-8eb2-703c8834a3c8', label: 'Faith-based institutions (Church, Mosque etc.)' },
        { value: 'd66de5eb-7d4a-4abf-80cc-6c58743571d9', label: 'Government Bursary' },
        { value: '5217316b-3c4a-4716-8137-466c08bb4c23', label: 'Non-governmental organisation' },
        { value: 'f816b6f3-68a5-40ab-ae63-d632a0590148', label: 'None (no additional support)' },
        { value: '3b0068e7-b6b0-4113-96b9-19d238ff847a', label: 'Relatives (no parent/guardian support)' },
        { value: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Other' }
      ]
    },
    {
      label: 'Current Source of Income',
      concept: '31f6d2c3-ee39-4cb6-9682-bd5afa77688f',
      type: 'dropdown',
      options: [
        { value: '44aedde1-cf13-4b5d-a05a-48b8da7f8060', label: 'Business person' },
        { value: '159613AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Casual labor' },
        { value: '1538AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Farmer' },
        { value: '590256ba-4285-4f2a-82b5-4c1ee8310e62', label: 'Formally employed' },
        { value: 'e02cbd27-c205-4725-ba0d-8f9885327b75', label: 'Petty trade (hawker etc.)' },
        { value: 'c50ac44c-eb32-4d6f-862e-b8525cdf404b', label: 'None (I have no source of income)' }
      ]
    },
    {
      label: 'Ever Tested for HIV',
      concept: 'ad5c97a8-7430-47df-8610-036e40f3248f',
      type: 'dropdown',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Period Last Tested',
      concept: '63d61f07-23df-4be5-b8d5-5fab5812fb0d',
      type: 'dropdown',
      hide: true,
      followUpFor: 'ad5c97a8-7430-47df-8610-036e40f3248f',
      options: [
        { value: 'dff206a7-87ad-4bb1-b22f-a8f754615d8f', label: 'Less than 3 months ago' },
        { value: '6d752618-8594-4898-8bcc-89614bb9de39', label: '3-5 months ago' },
        { value: '7bca6bfe-a948-4b13-98c3-86a2a7b2ae71', label: '6 - 12 months ago' },
        { value: 'f7cb2afe-a9bb-4f2c-85ec-4e86bf6a0e8f', label: 'More than a year ago/more than 12 months ago' }
      ]
    },
    {
      label: 'Last test result',
      concept: '5e8bca5e-33f3-4060-95c5-88638f48185c',
      type: 'dropdown',
      hide: true,
      followUpFor: 'ad5c97a8-7430-47df-8610-036e40f3248f',
      options: [
        { value: '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'POSITIVE' },
        { value: '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'NEGATIVE' },
        { value: '0315bf67-87e9-4687-9b9d-eb0d85ac00b4', label: "Don't Know" },
        { value: '380543ce-5d6e-4917-866b-df755aa698cc', label: 'Declined to disclose' }
      ]
    },
    {
      label: 'Ever had Sex',
      concept: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
      type: 'dropdown',
      options: [
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' },
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' }
      ]
    },
    {
      label: "Is this Partner same age, younger, or older than you?",
      concept: "partnerAgeConcept",
      type: "dropdown",
      hide: true,
      followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
      options: [
        {
          value: "953fb32a-32db-4cf6-a63b-2f163debd7c5",
          label: "Younger"
        },
        {
          value: "2d35331a-e111-49f1-a777-8adce6011eb1",
          label: "Same Age"
        },
        {
          value: "358af8b3-2914-459b-87bf-85689bca35fc",
          label: "Older"
        }
      ],
      subOptions: [
        {
          label: "Last Sexual Partner",
          concept: "e2f01d67-485c-47d9-a5ff-04eb61a927cb",
          type: "dropdown",
          hide: true,
          followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
          options: [
            { value: "953fb32a-32db-4cf6-a63b-2f163debd7c5", label: "Younger" },
            { value: "2d35331a-e111-49f1-a777-8adce6011eb1", label: "Same Age" },
            { value: "358af8b3-2914-459b-87bf-85689bca35fc", label: "Older" }
          ]
        },
        {
          label: "Second to Last Partner",
          concept: "efa7506d-7e92-4361-b765-f1d790bbd37a",
          type: "dropdown",
          hide: true,
          followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
          options: [
            { value: "953fb32a-32db-4cf6-a63b-2f163debd7c5", label: "Younger" },
            { value: "2d35331a-e111-49f1-a777-8adce6011eb1", label: "Same Age" },
            { value: "358af8b3-2914-459b-87bf-85689bca35fc", label: "Older" }
          ]
        },
        {
          label: "Third to Last Partner",
          concept: "2bd3375a-b752-4e16-8648-12c59f7913fb",
          type: "dropdown",
          hide: true,
          followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
          options: [
            { value: "953fb32a-32db-4cf6-a63b-2f163debd7c5", label: "Younger" },
            { value: "2d35331a-e111-49f1-a777-8adce6011eb1", label: "Same Age" },
            { value: "358af8b3-2914-459b-87bf-85689bca35fc", label: "Older" }
          ]
        }
      ]
    },
    {
      label: 'Is this Partner Circumcised?',
      concept: 'fd0a0453-db6a-4382-aa36-96fb1a3a0705',
      type: 'dropdown',
      hide: true,
      followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Second to Last Partner Circumcised',
      concept: 'fff12d17-17c1-49d8-83b7-50966cc6e220',
      type: 'dropdown',
      hide: true,
      followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Third to Last Partner Circumcised',
      concept: '2a0e7cf7-6e95-41ba-bc1b-93ca4e8d4669',
      type: 'dropdown',
      hide: true,
      followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Do you know this partner\'s HIV status',
      concept: '652bfdd8-040c-41e1-8c18-9187f0a58c27',
      type: 'dropdown',
      hide: true,
      followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Second to Last Sexual Partner HIV Status',
      concept: '69450796-edc3-4ecd-b91d-75584cf45273',
      type: 'dropdown',
      hide: true,
      followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Third to Last Partner HIV Status',
      concept: 'f4400eaa-046f-4143-aec2-746dab58f2b4',
      type: 'dropdown',
      hide: true,
      followUpFor: '9231c367-cb08-4634-8fbd-98f6cfc322d6',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Received money, gifts or favours in exchange for sex',
      concept: '11494f81-144c-4ae7-8590-516710c4cd6a',
      type: 'dropdown',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Are you aware of any family planning methods?',
      concept: 'a396eecc-1850-431d-8579-f606ece573a8',
      type: 'dropdown',
      options: [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' }
      ]
    },
    {
      label: 'Which family planning methods do you know of?',
      concept: 'dcf01ae0-5a0f-4dd5-b8fd-c9eef0cf5b7d',
      type: 'checkbox',
      hide: true,
      followUpFor: 'a396eecc-1850-431d-8579-f606ece573a8',
      options: [
        { value: '3791f3ca-7da5-43be-a3a0-7ca5ca8a2bee', label: 'Condom' },
        { value: '192f5af9-6f15-4045-8163-24ce9aad9c06', label: 'Implants' },
        { value: '7e6cb228-53aa-421f-923d-859de1e42e6a', label: 'Injectable' },
        { value: '3b7daa1e-eb84-4c42-928f-00a333b101ad', label: 'IUCD (Coil)' },
        { value: 'ebb64095-3218-4aca-8bf8-ffc486f0cb92', label: 'Permanent (Tubal Ligation)' },
        { value: '4f209d55-941c-4c34-8ac0-935b23dbeb61', label: 'Pills' }
      ]
    },
    {
      label: 'Are you currently using any modern family planning method?',
      concept: 'e066406f-20e4-47bc-b4b6-0ad98162435c',
      type: 'dropdown',
      options: [
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' },
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' }
      ]
    },

    {
      label: "He ever said or did something to humiliate you infront of others",
      concept: "ddad3e80-9f93-4675-baba-c287624cd0d6",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: " He said or did something to humiliate you infront of others in the last 3 months",
      concept: "0e835d3f-0377-4d00-9bbc-1c01d01ce493",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },

    {
      label: "Ever threatened to hurt or harm you or someone you care about",
      concept: "bed311cd-235b-401f-aa6c-e77ac59aafb1",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Threatened to hurt or harm you or someone you care about in the last 3 months",
      concept: "01c21121-6bd8-40ef-9950-fe324b01077f",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },

    {
      label: "Ever insulted or made you feel bad about yourself",
      concept: "962e4b1a-0575-4d01-b7f8-6dc2d271b88d",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Insulted or made you feel bad about yourself in the last 3 months",
      concept: "3f482989-53d8-40d7-96ad-85869c2b3bad",
      type: "dropdown",
      options: [
        { value: "6f8b997f-16c1-444a-842e-cc2277e144cf", label: "Everyday" },
        { value: "83c4061c-3793-406f-9f76-c749865ffa6b", label: "Not in the last 3 months" },
        { value: "b3108573-229c-418d-9158-3a998c485801", label: "Often" },
        { value: "1385AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Sometimes" }
      ]
    },

    {
      label: "Ever threatened to take away your economic livelihood",
      concept: "3f9f1b3e-9412-478e-a6fb-80f133048e20",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Threatened to take away your economic livelihood in the last 3 months ",
      concept: "792efa63-77d3-453a-9b79-975d039a4827",
      type: "dropdown",
      options: [
        { value: "6f8b997f-16c1-444a-842e-cc2277e144cf", label: "Everyday" },
        { value: "83c4061c-3793-406f-9f76-c749865ffa6b", label: "Not in the last 3 months" },
        { value: "b3108573-229c-418d-9158-3a998c485801", label: "Often" },
        { value: "1385AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Sometimes" }
      ]
    },
    {
      label: "Ever push you, shake you, slap/beat you, hit you with something, try to choke you or throw something at you that could hurt you",
      concept: "7dab6d7b-a9b9-44b9-b649-ac1d2c6f3fa8",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Push you, shake you, slap/beat you, hit you with something, try to choke you or throw something at you that could hurt you in the last 3 months",
      concept: "5da5c5c1-e415-4edf-ad9e-c0cdb43089d7",
      type: "dropdown",
      options: [
        { value: "6f8b997f-16c1-444a-842e-cc2277e144cf", label: "Everyday" },
        { value: "83c4061c-3793-406f-9f76-c749865ffa6b", label: "Not in the last 3 months" },
        { value: "b3108573-229c-418d-9158-3a998c485801", label: "Often" },
        { value: "1385AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Sometimes" }
      ]
    },

    {
      label: "Ever physically forced you to have sexual intercourse with him when you did not want",
      concept: "64e9f13f-f459-4ca7-936c-041f72ac8ea0",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Physically forced you to have sexual intercourse with him when you did not want in the last 3 months",
      concept: "2cbd9885-3516-4a8e-b27f-2b9e4641326c",
      type: "dropdown",
      options: [
        { value: "6f8b997f-16c1-444a-842e-cc2277e144cf", label: "Everyday" },
        { value: "83c4061c-3793-406f-9f76-c749865ffa6b", label: "Not in the last 3 months" },
        { value: "b3108573-229c-418d-9158-3a998c485801", label: "Often" },
        { value: "1385AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Sometimes" }
      ]
    },
    {
      label: "Ever physically forced you to perform any other sexual acts you did not want to do",
      concept: "41d929e4-0246-472d-ae35-77f3af68a1c9",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Physically forced you to perform any other sexual acts you did not want to do in the last 3 months",
      concept: "6abe08ce-d73c-4bf8-af62-dfb18a62fb36",
      type: "dropdown",
      options: [
        { value: "6f8b997f-16c1-444a-842e-cc2277e144cf", label: "Everyday" },
        { value: "83c4061c-3793-406f-9f76-c749865ffa6b", label: "Not in the last 3 months" },
        { value: "b3108573-229c-418d-9158-3a998c485801", label: "Often" },
        { value: "1385AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Sometimes" }
      ]
    },
    {
      label: "Ever forced you with threats or in any other way to perform sexual acts you did not want to",
      concept: "41d929e4-0246-472d-ae35-77f3af68a1c9",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Forced you with threats or in any other way to perform sexual acts you did not want to in the last 3 months",
      concept: "6abe08ce-d73c-4bf8-af62-dfb18a62fb36",
      type: "dropdown",
      options: [
        { value: "6f8b997f-16c1-444a-842e-cc2277e144cf", label: "Everyday" },
        { value: "83c4061c-3793-406f-9f76-c749865ffa6b", label: "Not in the last 3 months" },
        { value: "b3108573-229c-418d-9158-3a998c485801", label: "Often" },
        { value: "1385AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Sometimes" }
      ]
    },

    {
      label: "Have you used alcohol in the last 12 months",
      concept: "3b83a747-7f2e-4572-afb9-0b95cad99e20",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Have you used drugs of abuse or addiction in the last 12 months",
      concept: "34abe68d-2579-42a5-8e0a-16ac106b99ed",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "In the last 12 months, have you engaged in brewing or selling alcohol and/or drugs of abuse or addiction",
      concept: "24049b3b-96c4-4201-9a20-8de9ef8113d8",
      type: "dropdown",
      options: [
        { value: "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "No" },
        { value: "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "Yes" }
      ]
    },
    {
      label: "Which HIV prevention programmes have you participated in",
      concept: "ece71bd2-cfea-4021-b0f4-ae44f73e564d",
      type: "checkbox",
      options: [
        { value: "e62dbd31-d3b9-4348-b017-a7850617679f", label: "Families Matter Programme (FMP)" },
        { value: "586ce4a3-3c60-4cea-ae75-017a938e4450", label: "Health Choices for a Better Future (HCBF or Healthy Choices1)" },
        { value: "ff5a63ff-d1f7-457f-9f4c-e688d8ba69f5", label: "Making Life’s Responsible Choices (MLRC)" },
        { value: "9623ae42-5342-4ff7-8686-bf7fc9b41c7d", label: "My Health My Choice (MHMC or Healthy Choices2)" },
        { value: "1107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", label: "None" },
        { value: "36a0ecdc-9eee-4eb0-8aaa-59aaa8a136cc", label: "Respect-K" },
        { value: "cd4e48ee-e3c8-4ad4-b4d0-452539a85ea1", label: "SHUGA" },
        { value: "6852ae12-72b3-47d2-a394-e1af7939a596", label: "Sister to Sister-K" }
      ]
    },
    {
      label: "Others",
      concept: "4ca5b075-d54b-4a1a-bad0-373b76759939",
      type: "text"
    }

  ];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const groupConfig: { [key: string]: any } = {
      responses: this.fb.array([]),
    };
  
    this.questions.forEach((question) => {
      if (question.type === 'checkbox') {
        groupConfig[question.concept] = this.fb.array([]);
      } else {
        groupConfig[question.concept] = this.fb.control('');
      }
  
      (groupConfig['responses'] as FormArray).push(this.fb.control(''));
    });
  
    this.enrollmentForm = this.fb.group(groupConfig);
  
    this.setupFollowUpQuestionSubscriptions();
  }
  
  
  private setupFollowUpQuestionSubscriptions() {
    const followUpQuestions = [
      { index: 41, uuid: 'c1b883da-9dde-4c3e-9653-3512908ccf6d' },
      { index: 47, uuid: 'ad5c97a8-7430-47df-8610-036e40f3248f' },
      { index: 50, uuid: '9231c367-cb08-4634-8fbd-98f6cfc322d6' },
      { index: 59, uuid: 'a396eecc-1850-431d-8579-f606ece573a8' },
    ];
  
    followUpQuestions.forEach(({ index, uuid }) => {
      const control = (this.enrollmentForm.get('responses') as FormArray)?.at(index);
      if (control) {
        control.valueChanges.subscribe((value: string) => {
          console.log(`Value Changed for index ${index}:`, value);
          this.toggleFollowUpQuestions(value, uuid);
        });
      }
    });
  }
  
  
  get responses(): FormArray {
    return this.enrollmentForm.get('responses') as FormArray;
  }
  onSelectChange(event: any, concept: string) {
    console.log('Dropdown value changed:', event.target.value);
    const followUpFor = this.getFollowUpConcept(event.target.value, concept); 
    this.toggleFollowUpQuestions(event.target.value, followUpFor);
  }
  
  getFollowUpConcept(value: string, concept: string): string {
    const question = this.questions.find(q => q.concept === concept && q.options && q.options.some(option => option.value === value));
    return question ? question.concept : '';
  }
  
  toggleFollowUpQuestions(value: string, followUpFor: string) {
    console.log('Toggling Follow-Up Questions for value:', value, 'and followUpFor:', followUpFor);
  
    const question = this.questions.find(q => q.concept === followUpFor);
    if (!question) {
      console.error(`No question found for concept '${followUpFor}'`);
      return;
    }
  
    console.log('Found question:', question);
  
    const dependentQuestions = this.questions.filter(q => q.followUpFor === followUpFor);
  
    if (!dependentQuestions) {
      console.error(`No dependent questions found for concept '${followUpFor}'`);
      return;
    }
  
    console.log('Dependent Questions:', dependentQuestions);
  
    dependentQuestions.forEach(dependentQuestion => {
      console.log(`Setting hide for question ${dependentQuestion.label}:`, value !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      dependentQuestion.hide = value !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  
    });
  
    this.questions = [...this.questions];
  }

  onCheckboxChange(event: Event, concept: string, value: string): void {
    const checkbox = event.target as HTMLInputElement;
    const control = this.enrollmentForm.get(concept) as FormArray;
  
    if (control) {
      if (checkbox.checked) {
        // Add value if checked and not already present
        if (!control.value.includes(value)) {
          control.push(this.fb.control(value));
        }
      } else {
        // Remove value if unchecked
        const index = control.controls.findIndex((x) => x.value === value);
        if (index > -1) {
          control.removeAt(index);
        }
      }
    } else {
      console.error(`Control for concept '${concept}' not found.`);
    }
    
    // Debug: Log current FormArray state
    console.log('Updated FormArray for concept:', concept, control.value);
  }  
  
  submitForm() {
    const formValue = this.enrollmentForm.value; // Get the entire form value
  
    // Map each question to its submission format
    const obs = this.questions.map((question, index) => {
      let value;
  
      if (question.type === 'checkbox') {
        // Get the value directly from the FormArray for this concept
        const control = this.enrollmentForm.get(question.concept) as FormArray;
        value = control?.value || [];
        console.log(`Checkbox value for ${question.concept}:`, value);
      } else {
        // Get the value from the responses array
        value = formValue.responses[index] || null;
      }
  
      // Return the formatted object for submission
      return {
        concept: { uuid: question.concept },
        value: Array.isArray(value)
          ? value.map((v: string) => ({ uuid: v }))
          : value,
      };
    });
  
    // Debug: Log the submitted data
    console.log('Submitted data:', obs);
  }
  
  
  
}

