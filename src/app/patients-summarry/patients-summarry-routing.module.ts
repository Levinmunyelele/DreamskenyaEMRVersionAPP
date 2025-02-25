import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsSummarryPage } from './patients-summarry.page';

const routes: Routes = [
  {
    path: '',
    component: PatientsSummarryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsSummarryPageRoutingModule {}
