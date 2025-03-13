import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BioMedicalPage } from './bio-medical.page';

const routes: Routes = [
  {
    path: '',
    component: BioMedicalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BioMedicalPageRoutingModule {}
