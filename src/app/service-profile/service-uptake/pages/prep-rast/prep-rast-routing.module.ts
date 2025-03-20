import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepRastPage } from './prep-rast.page';

const routes: Routes = [
  {
    path: '',
    component: PrepRastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrepRastPageRoutingModule {}
