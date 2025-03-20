import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StiScreeningPage } from './sti-screening.page';

const routes: Routes = [
  {
    path: '',
    component: StiScreeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StiScreeningPageRoutingModule {}
