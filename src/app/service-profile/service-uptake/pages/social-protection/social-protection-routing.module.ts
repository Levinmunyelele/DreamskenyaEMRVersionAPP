import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialProtectionPage } from './social-protection.page';

const routes: Routes = [
  {
    path: '',
    component: SocialProtectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialProtectionPageRoutingModule {}
