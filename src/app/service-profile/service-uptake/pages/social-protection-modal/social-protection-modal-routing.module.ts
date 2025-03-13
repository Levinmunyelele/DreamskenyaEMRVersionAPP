import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialProtectionModalPage } from './social-protection-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SocialProtectionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialProtectionModalPageRoutingModule {}
