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
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceUptakePageRoutingModule {}
