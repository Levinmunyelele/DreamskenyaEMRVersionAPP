import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgywGraduationPage } from './agyw-graduation.page';

const routes: Routes = [
  {
    path: '',
    component: AgywGraduationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgywGraduationPageRoutingModule {}
