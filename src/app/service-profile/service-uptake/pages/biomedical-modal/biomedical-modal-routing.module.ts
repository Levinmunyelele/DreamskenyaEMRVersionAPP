import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiomedicalModalPage } from './biomedical-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BiomedicalModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiomedicalModalPageRoutingModule {}
