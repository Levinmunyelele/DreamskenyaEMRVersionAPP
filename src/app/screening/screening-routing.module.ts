import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreeningPage } from './screening.page';

const routes: Routes = [
  {
    path: '',
    component: ScreeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningPageRoutingModule {}
