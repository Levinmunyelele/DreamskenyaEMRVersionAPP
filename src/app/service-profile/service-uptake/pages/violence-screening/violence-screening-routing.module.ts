import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViolenceScreeningPage } from './violence-screening.page';

const routes: Routes = [
  {
    path: '',
    component: ViolenceScreeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViolenceScreeningPageRoutingModule {}
