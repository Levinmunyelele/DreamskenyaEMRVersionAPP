import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAssessmentPage } from './business-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessAssessmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessAssessmentPageRoutingModule {}
