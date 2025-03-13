import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherModalPage } from './other-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OtherModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherModalPageRoutingModule {}
