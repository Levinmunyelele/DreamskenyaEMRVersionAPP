import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenedAGWYPage } from './screened-agwy.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenedAGWYPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenedAGWYPageRoutingModule {}
