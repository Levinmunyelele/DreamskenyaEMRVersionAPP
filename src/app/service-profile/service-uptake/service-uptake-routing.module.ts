import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceUptakePage } from './service-uptake.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceUptakePage
  },
  {
    path: 'behavioural',
    loadChildren: () => import('./pages/behavioural/behavioural.module').then( m => m.BehaviouralPageModule)
  },
  {
    path: 'bio-medical',
    loadChildren: () => import('./pages/bio-medical/bio-medical.module').then( m => m.BioMedicalPageModule)
  },
  {
    path: 'social-protection',
    loadChildren: () => import('./pages/social-protection/social-protection.module').then( m => m.SocialProtectionPageModule)
  },
  {
    path: 'other',
    loadChildren: () => import('./pages/other/other.module').then( m => m.OtherPageModule)
  },
  {
    path: 'post-violence',
    loadChildren: () => import('./pages/post-violence/post-violence.module').then( m => m.PostViolencePageModule)
  },
  {
    path: 'social-protection-modal',
    loadChildren: () => import('./pages/social-protection-modal/social-protection-modal.module').then( m => m.SocialProtectionModalPageModule)
  },
  {
    path: 'other-modal',
    loadChildren: () => import('./pages/other-modal/other-modal.module').then( m => m.OtherModalPageModule)
  },
  {
    path: 'enrollment-form',
    loadChildren: () => import('./pages/enrollment-form/enrollment-form.module').then( m => m.EnrollmentFormPageModule)
  },
  {
    path: 'hts-eligibility',
    loadChildren: () => import('./pages/hts-eligibility/hts-eligibility.module').then( m => m.HtsEligibilityPageModule)
  },
  {
    path: 'home-visit',
    loadChildren: () => import('./pages/home-visit/home-visit.module').then( m => m.HomeVisitPageModule)
  },
  {
    path: 'prep-rast',
    loadChildren: () => import('./pages/prep-rast/prep-rast.module').then( m => m.PrepRastPageModule)
  },
  {
    path: 'violence-screening',
    loadChildren: () => import('./pages/violence-screening/violence-screening.module').then( m => m.ViolenceScreeningPageModule)
  },
  {
    path: 'business-follow-up',
    loadChildren: () => import('./pages/business-follow-up/business-follow-up.module').then( m => m.BusinessFollowUpPageModule)
  },
  {
    path: 'agyw-graduation',
    loadChildren: () => import('./pages/agyw-graduation/agyw-graduation.module').then( m => m.AgywGraduationPageModule)
  },
  {
    path: 'sti-screening',
    loadChildren: () => import('./pages/sti-screening/sti-screening.module').then( m => m.StiScreeningPageModule)
  },
  {
    path: 'business-assessment',
    loadChildren: () => import('./pages/business-assessment/business-assessment.module').then( m => m.BusinessAssessmentPageModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceUptakePageRoutingModule {}
