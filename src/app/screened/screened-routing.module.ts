import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenedPage } from './screened.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenedPageRoutingModule {}
